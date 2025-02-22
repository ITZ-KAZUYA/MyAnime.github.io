<template>
  <q-card
    v-if="display"
    v-ripple
    class="anime-episode"
    :class="{ small: isSmallElement, 'on-hover': $q.platform.is.desktop }"
  >
    <q-resize-observer debounce="200" @resize="handleResize" />
    <dynamic-button :href="episodeUrl" :open="open" :aria-label="aria" class="column justify-between full-height">
      <q-img
        :src="anime.cover"
        basic
        spinner-color="primary"
        class="full-height"
        @load="$emit('loaded', anime.id)"
        @error="$emit('loaded', anime.id)"
      />
      <div class="absolute-full hoverable overlay column justify-center">
        <q-btn
          ref="fabSettings"
          fab-mini
          icon="settings"
          color="white"
          text-color="primary"
          class="absolute-top-left q-ma-sm"
          tabindex="0"
          :aria-label="$t('settings')"
          @click.prevent.stop="preventFocus('fabSettings')"
        >
          <q-tooltip
            transition-show="jump-right"
            transition-hide="jump-left"
            anchor="center right"
            self="center left"
            :offset="[10, 10]"
            :content-class="['text-primary', 'bg-white']"
          >
            {{ $t('settings') }}
          </q-tooltip>
          <q-menu :offset="[0, 5]" class="z-max">
            <anime-settings :anime="anime" />
          </q-menu>
        </q-btn>
        <q-btn
          ref="fabNext"
          :fab="!isSmallElement"
          :fab-mini="isSmallElement"
          :text-color="anime.isLastEpisode ? 'positive' : 'accent'"
          :icon="anime.isLastEpisode ? 'library_add_check' : 'queue_play_next'"
          :loading="updating"
          color="white"
          class="absolute-top-right q-ma-sm"
          tabindex="0"
          :aria-label="nextLabel"
          @click.prevent.stop="nextEpisode"
        >
          <q-badge v-if="!anime.isLastEpisode" color="secondary" floating>{{ anime.nextEpisode }}</q-badge>
          <q-tooltip
            transition-show="jump-down"
            transition-hide="jump-up"
            anchor="bottom left"
            self="top middle"
            :offset="[10, 8]"
            :content-class="[anime.isLastEpisode ? 'text-positive' : 'text-secondary', 'bg-white']"
            >{{ nextLabel }}
          </q-tooltip>
        </q-btn>
        <h1 class="col-auto full-width q-px-xs q-mt-auto q-pt-xl">{{ title }}</h1>
        <div :class="`column full-width q-pa-${isSmallElement ? 'xs' : 'sm'} q-mt-auto`">
          <div
            v-if="formattedAiringDate"
            class="row justify-center full-width"
            :class="`q-mb-${isSmallElement ? 'sm' : 'md'}`"
          >
            <h2 class="full-width fit-text"><q-icon name="schedule" class="q-mr-xs" /> {{ formattedAiringDate }}</h2>
          </div>
          <q-chip
            :size="isSmallElement ? 'sm' : 'md'"
            :text-color="anime.isLastEpisode ? 'positive' : 'secondary'"
            class="col-auto bg-white overflow-hidden"
            :class="{ 'q-pb-xs': anime.totalEpisodes, 'q-pa-none': isSmallElement, 'q-pa-xs': !isSmallElement }"
          >
            <div class="row justify-center full-width">
              {{ $t('episode') }} {{ anime.nextEpisode }}
              <span v-if="anime.totalEpisodes && !isSmallElement" class="q-pl-xs">/ {{ anime.totalEpisodes }}</span>
            </div>
            <q-linear-progress
              v-if="anime.totalEpisodes"
              :value="anime.progress"
              :color="anime.isLastEpisode ? 'positive' : 'secondary'"
              class="absolute-bottom"
            />
          </q-chip>
        </div>
      </div>
    </dynamic-button>
  </q-card>
</template>

<script>
import { DateTime } from 'luxon';
import { mapGetters, mapState, mapActions } from 'vuex';
import { notifyError } from 'src/utils/errors';

export default {
  props: {
    anime: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      width: 0,
      updating: false,
    };
  },
  computed: {
    ...mapGetters('store', ['providerByAnimeTitle', 'titleByAnimeId']),
    ...mapState('store', ['typeFilter', 'airingStatusFilter', 'genreFilter']),
    ...mapState('store', {
      calendarEntry(state) {
        return state.calendar[this.anime.title];
      },
    }),
    provider() {
      return this.providerByAnimeTitle(this.title).value;
    },
    title() {
      return this.titleByAnimeId(this.anime.id) || this.anime.title;
    },
    nextLabel() {
      return this.$t(this.anime.isLastEpisode ? 'complete' : 'nextEpisode');
    },
    aria() {
      return `${this.title} ${this.$t('episode')} ${this.anime.nextEpisode}`;
    },
    display() {
      return (
        !this.anime.isCompleted &&
        (this.typeFilter.includes(this.anime.type) || this.anime.type === 'unknown') &&
        ((this.nextEpisodeIsAired && this.airingStatusFilter.includes('already-aired')) ||
          (!this.nextEpisodeIsAired && this.airingStatusFilter.includes('not-yet-aired'))) &&
        (this.genreFilter.length === 0 || this.genreFilter.every((genre) => this.anime.genres.includes(genre)))
      );
    },
    broadcast() {
      if (this.anime.broadcast && this.anime.broadcast.weekday) {
        const broadcast = DateTime.fromFormat(
          `${this.anime.broadcast.weekday} ${this.anime.broadcast.time || '23:59'}`,
          'EEEE HH:mm',
          { zone: 'Asia/Tokyo' }
        ).toLocal();
        if (this.anime.airingDate) {
          const estimation = this.anime.airingDate.startOf('week').plus({
            weeks: this.anime.nextEpisode - 1,
            days: broadcast.weekday - 1,
            hours: broadcast.hour + this.provider.offset,
            minutes: broadcast.minute,
          });
          return {
            date: estimation,
            precision: this.anime.airingDatePrecision,
          };
        }
        return {
          date: broadcast,
          precision: 'day',
        };
      }
      return null;
    },
    nextCalendarAiringEpisode() {
      if (this.calendarEntry) {
        const nextAiringEpisode = Math.min(...Object.keys(this.calendarEntry).map((episode) => parseInt(episode, 10)));
        if (!this.anime.totalEpisodes || nextAiringEpisode <= this.anime.totalEpisodes) {
          return nextAiringEpisode;
        }
        // nextAiringEpisode > totalEpisodes means that calendar episode is not relative (probably this anime is a sequel)
      }
      return null;
    },
    nextEpisodeCalendarAiringDate() {
      if (this.calendarEntry) {
        let calendarDate = this.calendarEntry[this.anime.nextEpisode];
        const offset = { hours: this.provider.offset };
        if (
          !calendarDate &&
          this.nextCalendarAiringEpisode &&
          this.anime.nextEpisode > this.nextCalendarAiringEpisode
        ) {
          // next episode is after the next in calendar (calendar may include past dates, e.g. in the same day some hours ago)
          calendarDate = this.calendarEntry[this.nextCalendarAiringEpisode];
          offset.weeks = this.anime.nextEpisode - this.nextCalendarAiringEpisode; // better estimation than broadcast
        }
        if (calendarDate) {
          return {
            date: DateTime.fromISO(calendarDate).toLocal().plus(offset),
            precision: 'day',
          };
        }
      }
      return null;
    },
    nextEpisodeAiringDate() {
      if (this.anime.airingStatus !== 'finished airing') {
        if (this.nextEpisodeCalendarAiringDate) {
          return this.nextEpisodeCalendarAiringDate;
        }
        if (this.broadcast) {
          return this.broadcast;
        }
        if (this.anime.airingStatus === 'not yet aired' && this.anime.airingDate && this.anime.nextEpisode === 1) {
          return {
            date: this.anime.airingDate.plus(0), // make a copy to avoid mutations outside vuex (https://github.com/moment/luxon/issues/323)
            precision: this.anime.airingDatePrecision,
          };
        }
      }
      return null;
    },
    nextEpisodeIsAired() {
      return (
        this.anime.airingStatus === 'finished airing' ||
        (this.nextCalendarAiringEpisode && this.anime.nextEpisode < this.nextCalendarAiringEpisode) ||
        (this.anime.isAired && this.nextEpisodeAiringDate && this.nextEpisodeAiringDate.date <= DateTime.local())
      );
    },
    formattedAiringDate() {
      if (this.nextEpisodeIsAired) {
        return null;
      }
      if (!this.nextEpisodeAiringDate) {
        return '?';
      }
      const { date, precision } = this.nextEpisodeAiringDate;
      const now = DateTime.local();
      const hours = Math.ceil(Math.abs(date.diff(now, 'hours').toObject().hours));
      if (hours <= 24) {
        // less than a day
        return date.day === now.day ? date.toRelative() : date.toRelativeCalendar();
      }
      if (precision === 'day') {
        const weekday = date.weekdayLong;
        const formattedDate = date.toLocaleString(this.isSmallElement ? DateTime.DATE_FULL : DateTime.DATE_MED);
        return this.isSmallElement ? formattedDate : `${weekday} ${formattedDate}`;
      }
      if (precision === 'month') {
        return date.toLocaleString({ month: 'long', year: 'numeric' });
      }
      return date.toLocaleString({ year: 'numeric' });
    },
    params() {
      return {
        anime: this.anime,
        title: this.title,
        episode: this.anime.nextEpisode,
      };
    },
    episodeUrl() {
      return this.provider.episodeUrl(this.params);
    },
    open() {
      if (this.provider.open) {
        return async () => {
          try {
            await this.provider.open(this.params);
          } catch (e) {
            notifyError(e);
          }
        };
      }
      return null;
    },
    isSmallElement() {
      return this.width < 185;
    },
  },
  mounted() {
    this.width = this.$el.offsetWidth;

    if (!this.display) {
      this.$emit('loaded', this.anime.id);
    }
  },
  methods: {
    ...mapActions('store', ['updateEpisode']),
    handleResize(size) {
      // avoid unnecessary updates
      if (size.width !== this.width) {
        this.width = size.width;
      }
    },
    nextEpisode() {
      this.updating = true;

      const completed = this.anime.isLastEpisode;
      const status = this.anime.status;

      const t = this.$t.bind(this.$root); // https://github.com/kazupon/vue-i18n/issues/184

      this.updateEpisode(this.anime)
        .then(({ ok }) => {
          if (ok) {
            if (completed) {
              this.$q.notify({
                message: t('completed', { title: this.title }),
                color: 'positive',
              });
            } else {
              this.$q.notify({
                message: t('updated', { title: this.title, episode: this.anime.lastWatchedEpisode }),
                color: 'primary',
              });
              if (status !== 'watching') {
                this.$q.notify({
                  message: t('statusChanged', { title: this.title, status: t('status.watching') }),
                  type: 'info',
                  html: true,
                });
              }
            }
          }
        })
        .finally(() => {
          this.updating = false;
        });

      this.preventFocus('fabNext');
    },
    preventFocus(ref) {
      // prevent focus state
      this.$refs[ref].$el.focus();
      this.$refs[ref].$el.blur();
    },
  },
};
</script>
