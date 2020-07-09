(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{7023:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.display?i("q-card",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"anime-episode",class:{small:e.isSmallElement,"on-hover":e.$q.platform.is.desktop}},[i("q-resize-observer",{attrs:{debounce:"200"},on:{resize:e.handleResize}}),i("a",{staticClass:"column justify-between full-height",attrs:{href:e.episodeUrl,target:"_blank"},on:{mousedown:function(e){e.preventDefault()}}},[i("q-img",{staticClass:"full-height",attrs:{src:e.anime.cover,basic:"","spinner-color":"primary"},on:{load:function(t){return e.$emit("loaded",e.anime.title)},error:function(t){return e.$emit("loaded",e.anime.title)}}}),i("div",{staticClass:"absolute-full hoverable overlay column justify-center"},[i("q-btn",{ref:"fabNext",staticClass:"absolute-top-right q-ma-sm",attrs:{fab:!e.isSmallElement,"fab-mini":e.isSmallElement,"text-color":e.anime.isLastEpisode?"positive":"accent",icon:e.anime.isLastEpisode?"library_add_check":"queue_play_next",loading:e.isLoading,color:"white",tabindex:"0"},on:{click:function(t){return t.preventDefault(),e.nextEpisode(t)}}},[e.anime.isLastEpisode?e._e():i("q-badge",{attrs:{color:"secondary",floating:""}},[e._v(e._s(e.anime.nextEpisode))]),i("q-tooltip",{attrs:{"transition-show":"jump-left","transition-hide":"jump-right",anchor:"center left",self:"center right",offset:[10,10],"content-class":[e.anime.isLastEpisode?"text-positive":"text-secondary","bg-white"]}},[e._v(e._s(e.anime.isLastEpisode?"Complete":"Next episode")+"\n        ")])],1),i("h1",{staticClass:"col-auto full-width q-px-xs q-mt-auto q-pt-xl"},[e._v(e._s(e.anime.title))]),i("div",{class:"column full-width q-pa-"+(e.isSmallElement?"xs":"sm")+" q-mt-auto"},[e.formattedAiringDate?i("div",{staticClass:"row justify-center full-width",class:"q-mb-"+(e.isSmallElement?"sm":"md")},[i("h2",{staticClass:"full-width fit-text"},[i("q-icon",{staticClass:"q-mr-xs",attrs:{name:"schedule"}}),e._v(" "+e._s(e.formattedAiringDate))],1)]):e._e(),i("q-chip",{staticClass:"col-auto bg-white overflow-hidden",class:{"q-pb-xs":e.anime.totalEpisodes,"q-pa-none":e.isSmallElement,"q-pa-xs":!e.isSmallElement},attrs:{size:e.isSmallElement?"sm":"md","text-color":e.anime.isLastEpisode?"positive":"secondary"}},[i("div",{staticClass:"row justify-center full-width"},[e._v("\n            Episode "+e._s(e.anime.nextEpisode)+"\n            "),e.anime.totalEpisodes&&!e.isSmallElement?i("span",{staticClass:"q-pl-xs"},[e._v("/ "+e._s(e.anime.totalEpisodes))]):e._e()]),e.anime.totalEpisodes?i("q-linear-progress",{staticClass:"absolute-bottom",attrs:{value:e.anime.progress,color:e.anime.isLastEpisode?"positive":"secondary"}}):e._e()],1)],1)],1)],1)],1):e._e()},a=[],n=i("1315"),o=i("2f62"),r={props:{anime:{type:Object,required:!0}},data(){return{width:0,loading:!0}},computed:{...Object(o["e"])("store",{provider:e=>e.provider.value,typeFilter:e=>e.typeFilter.map(e=>e.toLowerCase())}),...Object(o["e"])("store",["airingStatusFilter","status"]),...Object(o["c"])("store",["isLoading"]),display(){return!this.anime.isCompleted&&(this.nextEpisodeIsAired&&this.airingStatusFilter.includes("Already aired")||!this.nextEpisodeIsAired&&this.airingStatusFilter.includes("Not yet aired"))&&this.typeFilter.includes(this.anime.type)},broadcast(){if(this.anime.broadcast&&this.anime.broadcast.weekday){let e=n["DateTime"].fromFormat(`${this.anime.broadcast.weekday} ${this.anime.broadcast.time||"23:59"}`,"EEEE HH:mm",{zone:"Asia/Tokyo"}).toLocal();return this.anime.airingDate&&(e=this.anime.airingDate.plus({weeks:this.anime.nextEpisode-1,hours:e.hour+this.provider.offset,minutes:e.minute})),e}return null},nextEpisodeAiringDate(){return"currently airing"===this.anime.airingStatus&&this.broadcast?{date:this.broadcast,precision:"day"}:this.anime.airingDate?{date:this.anime.airingDate.plus(0),precision:this.anime.airingDatePrecision}:null},nextEpisodeIsAired(){return this.anime.isAired&&this.nextEpisodeAiringDate&&this.nextEpisodeAiringDate.date<=n["DateTime"].local()},formattedAiringDate(){if(this.nextEpisodeIsAired)return null;if(!this.nextEpisodeAiringDate)return"?";const{date:e,precision:t}=this.nextEpisodeAiringDate,i=n["DateTime"].local(),s=Math.ceil(Math.abs(e.diff(i,"hours").toObject().hours));if(s<=24)return e.day===i.day?e.toRelative():e.toRelativeCalendar();if("day"===t){const t=e.weekdayLong,i=e.toLocaleString(this.isSmallElement?n["DateTime"].DATE_FULL:n["DateTime"].DATE_MED);return this.isSmallElement?e:`${t} ${i}`}return"month"===t?e.toLocaleString({month:"long",year:"numeric"}):e.toLocaleString({year:"numeric"})},episodeUrl(){return this.provider.episodeUrl(this.anime,this.anime.nextEpisode)},isSmallElement(){return this.width<176}},mounted(){this.width=this.$el.offsetWidth,this.display||this.$emit("loaded",this.anime.title)},methods:{...Object(o["b"])("store",["updateEpisode"]),handleResize(e){e.width!==this.width&&(this.width=e.width)},nextEpisode(){const e=this.anime.isLastEpisode,t=this.anime.status;this.updateEpisode(this.anime).then(()=>{e?this.$q.notify({message:`Hooray! You've completed ${this.anime.title}!`,color:"positive"}):this.$q.notify({message:`Updated ${this.anime.title} to episode ${this.anime.lastWatchedEpisode}.`,color:"primary"}),"watching"!==t&&this.$q.notify({message:this.anime.title+" status changed to <strong>Watching</strong>'",type:"info",html:!0})}),this.$refs.fabNext.$el.focus(),this.$refs.fabNext.$el.blur()}}},l=r,d=i("2877"),m=i("f09f"),c=i("3980"),h=i("068f"),p=i("9c40"),u=i("58a8"),f=i("05c0"),g=i("0016"),E=i("b047"),b=i("6b1d"),y=i("714f"),v=i("eebe"),x=i.n(v),w=Object(d["a"])(l,s,a,!1,null,null,null);t["default"]=w.exports;x()(w,"components",{QCard:m["a"],QResizeObserver:c["a"],QImg:h["a"],QBtn:p["a"],QBadge:u["a"],QTooltip:f["a"],QIcon:g["a"],QChip:E["a"],QLinearProgress:b["a"]}),x()(w,"directives",{Ripple:y["a"]})}}]);