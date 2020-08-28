(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{0:function(e,t,s){e.exports=s("2f39")},"002d":function(e,t,s){"use strict";function a(e){return void 0===e||null===e?"":e.replace(/^\s+|\s+$/g,"")}function i(e){return 0===a(e).length}function r(e){return e.trim().replace(/\r?\n/g,"<br /><br />")}function n(e,t=2,s="0"){e=String(e);while(e.length<t)e=s+e;return e}s.d(t,"d",(function(){return a})),s.d(t,"a",(function(){return i})),s.d(t,"b",(function(){return r})),s.d(t,"c",(function(){return n}))},"2f39":function(e,t,s){"use strict";s.r(t);s("7d6e"),s("e54f"),s("573e"),s("985d"),s("31cd");var a=s("2b0e"),i=s("1f91"),r=s("42d2"),n=s("b05d"),o=s("18d6"),l=s("2a19"),c=s("9c64");a["a"].use(n["a"],{config:{},lang:i["a"],iconSet:r["a"],plugins:{LocalStorage:o["a"],Notify:l["a"],Meta:c["a"]}});var u=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{attrs:{id:"q-app"}},[s("router-view")],1)},d=[],p={name:"App"},h=p,m=s("2877"),g=Object(m["a"])(h,u,d,!1,null,null,null),f=g.exports,v=s("2f62"),y=s("bc3a"),b=s.n(y),w=s("4328"),A=s.n(w),S=s("1315");class U{constructor(){this.subscribers=[]}subscribe(e){this.subscribers.push(e)}consume(...e){this.subscribers.forEach(t=>t(...e)),this.subscribers=[]}}var $=s("8847");function k(e){e instanceof Error&&(console.error(e.message),e=void 0),l["a"].create({type:"negative",timeout:5e3,message:e||$["c"].t("error")})}class T extends Error{constructor(e){super(e||"Unauthenticated")}}const x="https://cors.carleslc.me/";function E(e){return A.a.stringify(e)}function _(e,t){return t?x+e:e}function C(e,t){return e&&e.baseURL&&(e.baseURL=_(e.baseURL,t)),e}function I({baseUrl:e,headers:t,cors:s=!1,...a}){const i={baseURL:_(e,s),headers:{common:{Accept:"application/json"},...t},...a},r=b.a.create(i);return r}class P{constructor({name:e,image:t,homeUrl:s,profileUrl:a,registerUrl:i,setPasswordUrl:r,baseUrl:n,headers:o,cors:l,version:c,tokenLifespanDays:u=31}){this.name=e,this.image=t,this.homeUrl=s,this.profileUrl=a,this.registerUrl=i,this.setPasswordUrl=r,this.tokenLifespanDays=u,this.version=c,this.resetOffsets(),this.cors=l,this.axios=I({baseUrl:n,headers:o,cors:l}),this.loadAuthInfo()}get authKey(){return"auth."+this.name}get hasError(){return!!this.error}setAuthInfo({accessToken:e,refreshToken:t,expiration:s}){this.accessToken=e,this.refreshToken=t,this.expiration=s,this.updateAuthorization()}updateAuthorization(){this.accessToken&&(this.axios.defaults.headers.common.Authorization="Bearer "+this.accessToken),this.error instanceof T&&(this.error=null)}saveAuthInfo(){o["a"].set(this.authKey,{accessToken:this.accessToken,refreshToken:this.refreshToken,expiration:this.expiration.toISO()})}loadAuthInfo(){const e=o["a"].getItem(this.authKey);e&&this.setAuthInfo({accessToken:e.accessToken,refreshToken:e.refreshToken,expiration:S["DateTime"].fromISO(e.expiration)})}needsAuth(e){return this.error=new T(e),this.error}onRefreshToken(e){this.refreshing||(this.refreshing=new U,this.refreshAccessToken().then(()=>this.refreshing.consume()).catch(e=>this.refreshing.consume(e)).finally(()=>{delete this.refreshing})),this.refreshing.subscribe(e)}authenticated(){return new Promise((e,t)=>{if(this.accessToken&&this.expiration){const s=S["DateTime"].utc(),a=this.expiration.diff(s,"days").toObject().days;a<=0?(delete this.axios.defaults.headers.common.Authorization,o["a"].remove(this.authKey),t(this.needsAuth("Session expired"))):this.refreshToken&&this.refreshAccessToken&&a<this.tokenLifespanDays-7?this.onRefreshToken(s=>s?t(s):e()):e()}else t(this.needsAuth())})}wrapResponse(e){return this.error=null,e.catch(e=>{this.error=e,this.onError(e)}).then(e=>({...e,ok:!this.error}))}url(e,t){return t&&t.baseURL?e:this.version?`/${this.version}${e}`:e}get(e,t){return t=C(t,this.cors),this.wrapResponse(this.axios.get(this.url(e,t),t))}formEncoded(e,t,s,a){return a=C(a,this.cors),this.wrapResponse(e.call(this.axios,this.url(t,a),E(s),a))}postFormEncoded(e,t,s){return this.formEncoded(this.axios.post,e,t,s)}putFormEncoded(e,t,s){return this.formEncoded(this.axios.put,e,t,s)}onError(e){e.response&&(console.error(`${e.response.status} ${e.response.statusText}`),e.response.data&&console.error(e.response.data)),k(e)}resetOffsets(){this.offsets={}}getCurrentOffset(e,t,s){let a=this.offsets[e];return a||(a={},this.offsets[e]=a),s&&a[t]||(a[t]={hasNext:!0,offset:0}),a[t]}isFetched(e,t=null){const s=this.offsets[e];return!!s&&!!s[t]}hasNext(e,t=null){const s=this.offsets[e];return!s||!s[t]||s[t].hasNext}animeUrl(e){return this.homeUrl}async auth(e,t){}async getUserPicture(e){return null}getUserProfileUrl(e){return"#"}async getAnimes(e,t=null,s=!1){const a=this.getCurrentOffset(e,t,s);return a.hasNext=!1,[]}async updateEpisode(e){}}const F="https://anime.carleslc.me";class D{constructor(){this.axios=I({baseUrl:F})}get(e,t){return this.axios.get(e,t)}async getCalendar(){const e=await this.get("/calendar");if(200!==e.status||!e.data.airingAnimes)return{};const t=e.data.airingAnimes,s={};return t.forEach(e=>{let t=s[e.title];t||(t={},s[e.title]=t),t[e.episode]=e.date}),s}}class j{constructor({id:e,title:t,alternativeTitles:s,cover:a,status:i,type:r,genres:n,totalEpisodes:o,startDate:l,broadcast:c,airingStatus:u,updatedAt:d,lastWatchedEpisode:p=0}){this.id=e,this.title=t,this.alternativeTitles=s,this.cover=a,this.status=i,this.type=r,this.genres=n,this.totalEpisodes=o,this.broadcast=c,this.airingStatus=u,this.updatedAt=S["DateTime"].fromISO(d),this.lastWatchedEpisode=p;const h=this.title.replace("-","");h===t||this.alternativeTitles.synonyms.includes(h)||this.alternativeTitles.synonyms.push(h),this.setAiringDate(l)}get titles(){const e=[this.title];return this.alternativeTitles.en&&this.alternativeTitles.en!==this.title&&e.push(this.alternativeTitles.en),e.push(...this.alternativeTitles.synonyms),e}get nextEpisode(){return this.lastWatchedEpisode+1}get isLastEpisode(){return this.totalEpisodes===this.nextEpisode}get isCompleted(){return this.nextEpisode>this.totalEpisodes}get progress(){return this.totalEpisodes?this.nextEpisode/this.totalEpisodes:0}get isAired(){return this.airingStatus&&"not yet aired"!==this.airingStatus||this.airingDate&&this.airingDate<=S["DateTime"].local()}setAiringDate(e){function t(t){return S["DateTime"].fromFormat(e,t,{zone:"Asia/Tokyo"})}if(e){const s=e.split("-").length;3===s?(this.airingDatePrecision="day",this.airingDate=t("yyyy-MM-dd").toLocal()):2===s?(this.airingDatePrecision="month",this.airingDate=t("yyyy-MM").endOf("month").toLocal()):1===s&&(this.airingDatePrecision="year",this.airingDate=t("yyyy").endOf("year").toLocal())}}}function L(e){return e.map(e=>{const t=e.node,s={id:t.id,title:t.title,alternativeTitles:t.alternative_titles,cover:t.main_picture.medium,status:t.my_list_status.status.replace(/_/g,"-"),type:t.media_type.toLowerCase(),genres:t.genres.map(e=>e.name.toLowerCase()),lastWatchedEpisode:t.my_list_status.num_episodes_watched,startDate:t.start_date,updatedAt:t.my_list_status.updated_at};return t.num_episodes>0&&(s.totalEpisodes=t.num_episodes),t.status&&(s.airingStatus=t.status.replace(/_/g," ")),t.broadcast&&(s.broadcast={weekday:t.broadcast.day_of_the_week,time:t.broadcast.start_time}),new j(s)})}const O="6114d00ca681b7701d1e15fe11a4987e";class R extends P{constructor(){super({name:"MyAnimeList",image:"statics/mal.png",homeUrl:"https://myanimelist.net/",profileUrl:"https://myanimelist.net/profile/",registerUrl:"https://myanimelist.net/register.php",setPasswordUrl:"https://myanimelist.net/editprofile.php?go=myoptions",baseUrl:"https://api.myanimelist.net",version:"v2",headers:{"X-MAL-Client-ID":O},cors:!0})}animeUrl(e){return`${this.homeUrl}anime/${e.id}/`}async auth(e,t){const s=await this.postFormEncoded("/auth/token",{client_id:O,grant_type:"password",username:e,password:t});s.ok&&s.data&&this.updateAuthInfo(s.data)}onError(e){if(e.response&&e.response.data&&e.response.data.error){const t=e.response.data.error;let s=e.response.data.message;"invalid_grant"===t?s=$["c"].t("invalidGrant"):"too_many_failed_login_attempts"===t&&(s=$["c"].t("tooManyFailedLoginAttempts")),k(s)}else super.onError(e)}async refreshAccessToken(){if(!this.refreshToken)throw this.needsAuth("Missing refresh token");const e=await this.postFormEncoded("/oauth2/token",{client_id:O,grant_type:"refresh_token",refresh_token:this.refreshToken},{baseURL:"https://myanimelist.net/v1"});if(!e.ok||!e.data)throw this.needsAuth(this.error);this.updateAuthInfo(e.data)}updateAuthInfo(e){this.commit("setAuthInfo",{accessToken:e.access_token,refreshToken:e.refresh_token,expiration:S["DateTime"].utc().plus({seconds:e.expires_in})})}async getUserPicture(){await this.authenticated();const e=await this.get("/users/@me");return e.ok&&e.data?e.data.picture:null}getUserProfileUrl(e){const t=e?"profile/"+e:"";return"https://myanimelist.net/"+t}async getAnimes(e,t=null,s=!1){if(s&&!this.hasNext(e,t))return[];await this.authenticated();const a=this.getCurrentOffset(e,t,s),i={sort:"list_updated_at",offset:a.offset,limit:50,fields:["id","title","alternative_titles{en,synonyms}","main_picture","media_type","genres","status","start_date","end_date","broadcast","num_episodes","my_list_status{num_episodes_watched,status,updated_at}"].join(",")};t&&(i.status=t.replace(/-/g,"_"));const r=await this.get(`/users/${e}/animelist?${E(i)}`);return r.ok?(r.data.paging.next?a.offset+=i.limit:a.hasNext=!1,L(r.data.data)):[]}updateEpisode(e){return this.putFormEncoded(this.url(`/anime/${e.id}/my_list_status`),{num_watched_episodes:e.nextEpisode,status:e.isLastEpisode?"completed":"watching"})}}var M=s("a861");function B(){const e=new D,t=new R;return{backend:e,authNeeded:!1,api:t,picture:t.image,language:M["b"].language,username:M["b"].username,status:M["b"].status,provider:M["b"].provider,titlesByAnimeId:M["b"].titlesByAnimeId,providersByAnimeTitle:M["b"].providersByAnimeTitle,airingStatusFilter:M["b"].airingStatusFilter,typeFilter:M["b"].typeFilter,genreFilter:M["b"].genreFilter,loading:0,fetched:!1,userFetched:!1,animes:{watching:[],"on-hold":[],"plan-to-watch":[]},calendar:{}}}var q=B,N=s("5935");function H({status:e,animes:t}){return"plan-to-watch"===e&&t.sort((e,t)=>"currently airing"===e.airingStatus&&"currently airing"!==t.airingStatus?-1:"currently airing"===t.airingStatus&&"currently airing"!==e.airingStatus?1:"not yet aired"===e.airingStatus&&"not yet aired"===t.airingStatus&&e.airingDate&&t.airingDate?e.airingDate.diff(t.airingDate,"minutes").toObject().minutes:t.updatedAt.diff(e.updatedAt,"minutes").toObject().minutes),t}var z={updateField:N["c"],setAnimes(e,t){e.animes[t.status]=H(t)},addAnimes(e,t){e.animes[t.status].push(...H(t))},resetAnimes(e){e.api.resetOffsets(),e.fetched=!1,e.animes={watching:[],"on-hold":[],"plan-to-watch":[]}},updateFetched(e){e.fetched=e.api.isFetched(e.username,e.status)},setAPI(e,t){e.api=t},setUsername(e,t){e.username=t},setPicture(e,t){e.picture=t},setUserFetched(e,t){e.userFetched=t},nextEpisode(e,t){t.lastWatchedEpisode=t.nextEpisode},setAnimeWatching(e,t){if("watching"!==t.status){const s=e.animes[t.status];s.splice(s.indexOf(t),1),e.animes.watching.unshift(t),t.status="watching"}},setProvider(e,{title:t,provider:s}){s===e.provider?a["a"].delete(e.providersByAnimeTitle,t):a["a"].set(e.providersByAnimeTitle,t,s)},setAlternativeTitle(e,{anime:t,title:s}){s===t.title?a["a"].delete(e.titlesByAnimeId[e.api.name],t.id):a["a"].set(e.titlesByAnimeId[e.api.name],t.id,s)},setCalendar(e,t){e.calendar=t},loading(e){e.loading+=1},loaded(e){e.loading>0&&(e.loading-=1)},setAuthNeeded(e,t){e.authNeeded=t},clear(e){Object.assign(e,B())},setAuthInfo({api:e},{accessToken:t,refreshToken:s,expiration:a}){e.accessToken=t,e.refreshToken=s,e.expiration=a,e.updateAuthorization(),e.saveAuthInfo()}},G=s("002d"),V={getField:N["a"],animesFilterByStatus({animes:e,status:t}){return e[t]},isFetched({fetched:e}){return e},isLoading({loading:e}){return e>0},hasUsername({username:e}){return!Object(G["a"])(e)},providerByAnimeTitle({provider:e,providersByAnimeTitle:t}){return s=>t[s]||e},providers({language:e}){return Object.freeze(M["c"].filter(t=>!t.value.languages||t.value.languages.includes(e)))},titleByAnimeId({api:e,titlesByAnimeId:t}){return s=>t[e.name][s]}};function W(e,t){return e("loading"),t.catch(t=>{t instanceof T?e("setAuthNeeded",!0):k(t)}).finally(()=>{e("loaded")})}var Y={async login({commit:e,state:t},{username:s,password:a}){await W(e,t.api.auth(s,a))},fetchAnimes({commit:e,state:{api:t,username:s,status:a}},i=!1){return W(e,t.getAnimes(s,a,i).then(t=>(e(i?"addAnimes":"setAnimes",{status:a,animes:t}),e("updateFetched"),t)))},async fetchMoreAnimes({dispatch:e,state:{api:t,username:s,status:a}}){return t.hasNext(s,a)&&await e("fetchAnimes",!0),t.hasNext(s,a)},fetchCalendar({commit:e,state:{backend:t}}){return W(e,t.getCalendar().then(t=>(e("setCalendar",t),t)))},searchUser({commit:e,dispatch:t,state:{api:s}},a){return s.commit=e,W(e,new Promise(i=>{e("setUserFetched",!1),e("setUsername",a),e("resetAnimes"),t("updatePicture"),t("fetchAnimes").finally(()=>{s.hasError||e("setUserFetched",!0),i()}),t("fetchCalendar")}))},updatePicture({commit:e,state:{api:t,username:s}}){return W(e,t.getUserPicture(s).then(s=>{e("setPicture",s||t.image)}))},updateEpisode({commit:e,state:{api:t}},s){return W(e,t.updateEpisode(s).then(t=>(t.ok&&(e("nextEpisode",s),e("setAnimeWatching",s)),t)))}},J={namespaced:!0,state:q,getters:V,mutations:z,actions:Y};a["a"].use(v["a"]);var K=function(){const e=new v["a"].Store({modules:{store:J},strict:!1});return e},Z=s("8c4f");const Q=[{path:"/",component:()=>Promise.all([s.e(0),s.e(20)]).then(s.bind(null,"713b")),children:[{name:"home",path:"",component:()=>Promise.all([s.e(0),s.e(21)]).then(s.bind(null,"8b24"))}]}];Q.push({path:"*",component:()=>Promise.all([s.e(0),s.e(7)]).then(s.bind(null,"e51e"))});var X=Q;a["a"].use(Z["a"]);var ee=function(){const e=new Z["a"]({scrollBehavior:()=>({x:0,y:0}),routes:X,mode:"history",base:"/MyAnime/"});return e},te=async function(){const e="function"===typeof K?await K({Vue:a["a"]}):K,t="function"===typeof ee?await ee({Vue:a["a"],store:e}):ee;e.$router=t;const s={router:t,store:e,render:e=>e(f),el:"#q-app"};return{app:s,store:e,router:t}},se=async({Vue:e})=>{function t(e){return e.replace(/([a-z])([A-Z])/g,"$1-$2").replace(/\s+/g,"-").toLowerCase()}const a=s("6216");a.keys().forEach(s=>{const i=t(s.split("/").pop().split(".")[0]);e.component(i,()=>a(s))})};async function ae(){const{app:e,store:t,router:s}=await te();let i=!0;const r=e=>{i=!1,window.location.href=e},n=window.location.href.replace(window.location.origin,""),o=[$["a"],se];for(let c=0;!0===i&&c<o.length;c++)if("function"===typeof o[c])try{await o[c]({app:e,router:s,store:t,Vue:a["a"],ssrContext:null,redirect:r,urlPath:n})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!1!==i&&new a["a"](e)}ae()},"31cd":function(e,t,s){},6216:function(e,t,s){var a={"./About.vue":["84ba",0,8],"./AnimeEpisode.vue":["7023",0,9],"./AnimeSettings.vue":["172f",0,10],"./Avatar.vue":["df3a",0,11],"./Back.vue":["66b7",0,12],"./CalendarButton.vue":["836a",13],"./DynamicButton.vue":["7a1a",14],"./ItemButton.vue":["ff1a",0,3],"./LanguageSelect.vue":["b8c0",0,15],"./PasswordDialog.vue":["40ad",0,16],"./ProviderSelect.vue":["1ce4",0,4],"./ResetButton.vue":["19a6",17],"./StatusSelect.vue":["8bcf",0,5],"./SupportMe.vue":["e02e",0,18],"./TitleSelect.vue":["5f93",0,6],"./UserSearch.vue":["6ec6",0,19]};function i(e){if(!s.o(a,e))return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=a[e],i=t[0];return Promise.all(t.slice(1).map(s.e)).then((function(){return s(i)}))}i.keys=function(){return Object.keys(a)},i.id="6216",e.exports=i},8847:function(e,t,s){"use strict";s.d(t,"c",(function(){return p})),s.d(t,"b",(function(){return h}));var a=s("2b0e"),i=s("a925"),r={all:"All",any:"Any",episode:"Episode",complete:"Complete",nextEpisode:"Next episode",settings:"Settings",animeCalendar:"Anime Calendar",animeCalendarDescription:"Calendar anime for this week",selectLanguage:"Select language",selectProvider:"Select provider",selectTitle:"Select alternative title",animeStatus:"Anime status",animeStatusFilter:"Filter anime status",alreadyAired:"Already aired",notYetAired:"Not yet aired",status:{watching:"Watching",onHold:"On Hold",planToWatch:"Plan to Watch"},genre:"Genre",genres:{action:"Action",adventure:"Adventure",cars:"Cars",comedy:"Comedy",dementia:"Dementia",demons:"Demons",drama:"Drama",ecchi:"Ecchi",fantasy:"Fantasy",game:"Game",harem:"Harem",hentai:"Hentai",historical:"Historical",horror:"Horror",josei:"Josei",kids:"Kids",magic:"Magic",martialArts:"Martial Arts",mecha:"Mecha",military:"Military",music:"Music",mystery:"Mystery",parody:"Parody",police:"Police",psychological:"Psychological",romance:"Romance",samurai:"Samurai",school:"School",scifi:"Sci-Fi",seinen:"Seinen",shoujo:"Shoujo",shoujoAi:"Shoujo Ai",shounen:"Shounen",shounenAi:"Shounen Ai",sliceOfLife:"Slice of Life",space:"Space",sports:"Sports",superPower:"Super Power",supernatural:"Supernatural",thriller:"Thriller",vampire:"Vampire",yaoi:"Yaoi",yuri:"Yuri"},animeType:"Anime type",animeTypeFilter:"Filter anime type",movie:"Movie",special:"Special",music:"Music",resetSettings:"Reset settings",resetSettingsDescription:"Clean user data and filters",aboutApp:"About this app",donate:"\n    This app is completely free.\n    If you like this app, you can support me for the price of a coffee.\n    Thank you!\n  ",providerSelect:"\n    Select which provider must be opened by default when clicking over an episode.\n    'Feeling Lucky' option is based on search engine, trying to get a proper streamer, but it doesn't mean it always work.\n    If selected provider cannot find an episode try to change the provider.\n    You can override the default provider in the settings of each anime.\n  ",login:"Log In",loginDescription:"Please, log in to your {api} account to view your anime list and update episodes directly within this app.",notRegisteredYet:"Not registered yet?",registerHere:"Register here",noPassword:"If your account has no password because it uses social media login like Facebook, Twitter or Google go to your {0} and set a password for your account first.",accountSettings:"Account Settings",updated:"Updated {title} to episode {episode}",completed:"Hooray! You've completed {title}!",statusChanged:"{title} status changed to <strong>{status}</strong>",invalidGrant:"Incorrect username or password",tooManyFailedLoginAttempts:"Too many failed login attempts. Please try to login again after several hours.",required:{username:"Username is required",password:"Password is required"},username:"Username",password:"Password",cancel:"Cancel",error:"Oops... an unexpected error has occurred 😣"},n={all:"Todo",any:"Cualquiera",episode:"Episodio",complete:"Completar",nextEpisode:"Siguiente episodio",settings:"Ajustes",animeCalendar:"Calendario Anime",animeCalendarDescription:"Animes de esta semana",selectLanguage:"Seleccionar idioma",selectProvider:"Seleccionar proveedor",selectTitle:"Seleccionar título alternativo",animeStatus:"Estado de anime",animeStatusFilter:"Filtrar por estado",alreadyAired:"Disponible",notYetAired:"No disponible",status:{watching:"Siguiendo",onHold:"En espera",planToWatch:"En un futuro"},genre:"Género",genres:{action:"Acción",adventure:"Aventuras",cars:"Coches",comedy:"Comedia",dementia:"Demencia",demons:"Demonios",drama:"Drama",ecchi:"Ecchi",fantasy:"Fantasía",game:"Juegos",harem:"Harem",hentai:"Hentai",historical:"Historia",horror:"Horror",josei:"Josei",kids:"Para niños",magic:"Magia",martialArts:"Artes marciales",mecha:"Mecha",military:"Militar",music:"Música",mystery:"Misterio",parody:"Parodia",police:"Policíaco",psychological:"Psicológico",romance:"Romance",samurai:"Samurai",school:"Escolar",scifi:"Ciencia ficción",seinen:"Seinen",shoujo:"Shoujo",shoujoAi:"Shoujo Ai",shounen:"Shounen",shounenAi:"Shounen Ai",sliceOfLife:"Recuentos de la vida",space:"Espacial",sports:"Deportes",superPower:"Superpoderes",supernatural:"Supernatural",thriller:"Thriller",vampire:"Vampiros",yaoi:"Yaoi",yuri:"Yuri"},animeType:"Tipo de anime",animeTypeFilter:"Filtrar tipo de anime",movie:"Película",special:"Especial",music:"Música",resetSettings:"Restablecer ajustes",resetSettingsDescription:"Borrar datos de usuario y filtros",aboutApp:"Sobre esta aplicación",donate:"\n  Esta aplicación es completamente gratuita.\n  Si te gusta la aplicación, puedes apoyarme por el precio de un café.\n  ¡Muchas gracias!\n  ",providerSelect:"\n    Selecciona qué proveedor debe abrirse por defecto cuando hagas click en un episodio.\n    La opción 'Voy a tener suerte' está basada en buscadores, intentando obtener un proveedor correcto, pero no siempre funciona.\n    Si el proveedor seleccionado no puede encontrar un episodio prueba seleccionando otro proveedor.\n    Puedes sobreescribir el proveedor por defecto en los ajustes de cada anime.\n  ",login:"Iniciar sesión",loginDescription:"Por favor, inicia sesión en tu cuenta de {api} para ver tu lista de animes y actualizar los episodios directamente desde esta app.",notRegisteredYet:"¿Todavía no estás registrado?",registerHere:"Regístrate aquí",noPassword:"Si tu cuenta no tiene contraseña porque utilizas una red social como Facebook, Twitter o Google para iniciar sesión ve a tus {0} y establece una contraseña primero.",accountSettings:"ajustes de cuenta",updated:"{title} actualizado al episodio {episode}",completed:"¡Genial! ¡Has completado {title}!",statusChanged:"El estado de {title} se ha cambiado a <strong>{status}</strong>",invalidGrant:"Nombre de usuario o contraseña incorrectos",tooManyFailedLoginAttempts:"Demasiados intentos fallidos. Prueba a iniciar sesión de nuevo en unas horas.",required:{username:"Introduce tu nombre de usuario",password:"Introduce tu contraseña"},username:"Nombre de usuario",password:"Contraseña",cancel:"Cancelar",error:"Vaya... ha ocurrido un error inesperado 😣"},o={en:r,es:n},l=s("18d6"),c=s("b05d");const u={en:"🇬🇧",es:"🇪🇸"};function d(){const e=l["a"].getItem("language");return e&&Object.keys(u).includes(e)?e:c["a"].lang.getLocale().split("-")[0]}a["a"].use(i["a"]);const p=new i["a"]({locale:d(),fallbackLocale:"en",messages:o});t["a"]=({app:e})=>{e.i18n=p};function h(e){return u[e]}},a861:function(e,t,s){"use strict";s.d(t,"c",(function(){return X})),s.d(t,"b",(function(){return se}));class a{constructor(e,t=0,s){this.url=e,this.offset=t,this.languages=s}get icon(){return this.url+"favicon.ico"}episodeUrl({anime:e,title:t,episode:s}){return this.url}static trimSpecials(e){return e.replace(/[^ -a-zA-Z0-9]+$/,"")}static encode(e,t="-"){let s=encodeURIComponent(a.trimSpecials(e).toLowerCase().replace(/\s+/g,t).replace(new RegExp(`(${t}){2,}`),t));return s[s.length-1]===t&&(s=s.substring(0,s.length-1)),s}}class i extends a{constructor(){super("https://myanimelist.net/")}episodeUrl({anime:{id:e},episode:t}){return`${this.url}anime/${e}/-/episode/${t}`}}var r=new i;class n extends a{constructor(){super("https://www.crunchyroll.com/",1)}get icon(){return this.url+"favicons/favicon-32x32.png"}episodeUrl({title:e,episode:t}){return`${this.url}search?q=${encodeURI(`${e} ${t}`)}&o=m&r=f`}}var o=new n;class l extends a{constructor(){super("https://www.netflix.com/")}episodeUrl({title:e}){return`${this.url}search?q=${encodeURI(e)}`}}var c=new l;class u extends a{constructor(){super("https://www.animeid.tv/",3,["es"])}episodeUrl({title:e,episode:t}){return`${this.url}v/${a.encode(e)}-${t}`}}var d=new u;class p extends a{constructor(){super("https://animeflv.net/",3,["es"])}get icon(){return"statics/icons/animeflv.ico"}episodeUrl({title:e,episode:t}){return`${this.url}ver/${a.encode(e)}-${t}`}}var h=new p;class m extends a{constructor(){super("https://jkanime.net/",5,["es"])}get icon(){return"https://cdn.jkanime.net/assets/images/favicon.ico"}episodeUrl({title:e,episode:t}){return`${this.url}${a.encode(e)}/${t}/`}}var g=new m;class f extends a{constructor(){super("https://monoschinos.com/",2,["es"])}get icon(){return this.url+"assets/img/favicon.ico"}episodeUrl({title:e,episode:t}){return`${this.url}ver/${a.encode(e)}-${t}`}}var v=new f;class y extends a{constructor(){super("https://animefenix.com/",2,["es"])}episodeUrl({title:e,episode:t}){return`${this.url}ver/${a.encode(e)}-${t}`}}var b=new y;class w extends a{constructor(){super("https://animemovil2.com/",3,["es"])}get icon(){return this.url+"assets/webApp/ico.png"}episodeUrl({title:e,episode:t}){return`${this.url}ver/${a.encode(e)}-${t}`}}var A=new w;class S extends a{constructor(e,t,s,a){super(e,0,a),this.prefix=t,this.search=s}episodeUrl(e){return this.url+this.prefix+this.search(e)}}function U({anime:e,title:t,episode:s}){const a="online español -english";return encodeURIComponent(`${t}${"movie"!==e.type?" inurl:"+s:""} ${a}`)}function $({anime:e,title:t,episode:s}){const a="online english anime -español";return encodeURIComponent(`${t}${"movie"!==e.type?" episode inurl:"+s:""} ${a}`)}function k(e,t){return new S("https://duckduckgo.com/","?q=!ducky+",e,t)}const T=k(U,["es"]),x=k($,["en"]),E=new S("https://www.google.es/","search?btnI&q=",U,["es"]),_=new S("https://www.google.com/","search?btnI&q=",$,["en"]);class C extends a{constructor(){super("https://animeheaven.ru/",2,["en"]),this.search=k(({title:e,episode:t})=>encodeURIComponent(`site:${this.url}watch intitle:"${e} Episode ${t}"`))}get icon(){return"https://static.animecdn.xyz/static/favicon.ico"}episodeUrl({anime:e,title:t,episode:s}){return"movie"===e.type?`${this.url}search?q=${encodeURIComponent(a.trimSpecials(t))}`:this.search.episodeUrl({anime:e,title:t,episode:s})}}var I=new C;class P extends a{constructor(){super("https://animeultima.to/",2,["en"])}get icon(){return"statics/icons/animeultima.png"}episodeUrl({title:e,episode:t}){return`${this.url}a/${a.encode(e)}/episode-${t}`}}var F=new P;class D extends a{constructor(){super("https://aniwatch.me/",2,["en"])}get icon(){return"https://anilivery.aniwatch.me/img/site_icon/icon_196.png"}episodeUrl({title:e}){return`${this.url}search?q=${encodeURIComponent(e)}`}}var j=new D;class L extends a{constructor(){super("https://twist.moe/",3,["en"])}episodeUrl({title:e,episode:t}){return`${this.url}a/${a.encode(e)}/${t}`}}var O=new L,R=s("002d");class M extends a{constructor(){super("https://4anime.to/",2,["en"])}get icon(){return"statics/icons/4anime.png"}episodeUrl({title:e,episode:t}){return`${this.url}${a.encode(e)}-episode-${Object(R["c"])(t)}`}}var B=new M;class q extends a{constructor(){super("https://masteranime.es/",2,["en"]),this.search=k(({anime:e,title:t,episode:s})=>{const a="movie"!==e.type?" Episode "+s:"";return encodeURIComponent(`site:${this.url}/watch intitle:"${t}${a}"`)})}get icon(){return"https://static.animecdn.xyz/static/img/masterani-icon.png"}episodeUrl(e){return this.search.episodeUrl(e)}}var N=new q;class H extends a{constructor(){super("https://myanime.co/",3,["en"]),this.search=k(({title:e,episode:t})=>(e=a.encode(e,"_"),encodeURIComponent(`site:${this.url}anime intitle:"${e}" intitle:"Episode ${t}" inurl:"/episode/${t}"`)))}episodeUrl(e){return this.search.episodeUrl(e)}}var z=new H;class G extends a{constructor(e){super("https://9anime.ru/",2,["en"]),e.url?this.episodeUrl=t=>e.episodeUrl(t):this.episodeUrl=t=>e.episodeUrl.call(this,t)}get icon(){return"https://staticf.akacdn.ru/assets/favicons/favicon-32x32.png"}}const V=new G(k(({anime:e,title:t})=>encodeURIComponent(`site:${(void 0).url}/watch/${a.encode(e.alternativeTitles.en||t)}`))),W=new G({episodeUrl({anime:e,title:t}){return`${this.url}search?keyword=${encodeURIComponent(e.alternativeTitles.en||t)}`}});class Y extends a{constructor(e,t){super(e,2,["en"]),this.episodeUrl=e=>t.episodeUrl.call(this,e)}get icon(){return"https://staticf.akacdn.ru/assets/gogo/favicon.png"}}const J=new Y("https://gogoanime.life/",{episodeUrl({title:e}){return`${this.url}search?keyword=${encodeURIComponent(e)}`}}),K=new Y("https://gogoanime.movie/",{episodeUrl({title:e,episode:t}){return`${this.url}${a.encode(e)}-episode-${t}`}});var Z=s("8847"),Q=s("5935");const X=Object.freeze([{label:"MyAnimeList",value:r},{label:"Crunchyroll",value:o},{label:"Netflix",value:c},{label:"Voy a tener suerte",value:T},{label:"Google (ES)",value:E},{label:"AnimeFLV",value:h},{label:"AnimeFenix",value:b},{label:"AnimeID",value:d},{label:"jkanime",value:g},{label:"MonosChinos",value:v},{label:"AnimeMovil",value:A},{label:"I'm feeling ducky",value:x},{label:"Google (EN)",value:_},{label:"Twist",value:O},{label:"4Anime",value:B},{label:"9Anime (Lucky)",value:V},{label:"9Anime (Search)",value:W},{label:"Gogoanime.movie",value:K},{label:"Gogoanime.life",value:J},{label:"Aniwatch",value:j},{label:"AnimeUltima",value:F},{label:"AnimeHeaven",value:I},{label:"MasterAnime",value:N},{label:"MyAnimeCo",value:z}]);function ee(){const e=[{label:Z["c"].t("genres.action"),value:"action"},{label:Z["c"].t("genres.adventure"),value:"adventure"},{label:Z["c"].t("genres.cars"),value:"cars"},{label:Z["c"].t("genres.comedy"),value:"comedy"},{label:Z["c"].t("genres.dementia"),value:"dementia"},{label:Z["c"].t("genres.demons"),value:"demons"},{label:Z["c"].t("genres.drama"),value:"drama"},{label:Z["c"].t("genres.ecchi"),value:"ecchi"},{label:Z["c"].t("genres.fantasy"),value:"fantasy"},{label:Z["c"].t("genres.game"),value:"game"},{label:Z["c"].t("genres.harem"),value:"harem"},{label:Z["c"].t("genres.hentai"),value:"hentai"},{label:Z["c"].t("genres.historical"),value:"historical"},{label:Z["c"].t("genres.horror"),value:"horror"},{label:Z["c"].t("genres.josei"),value:"josei"},{label:Z["c"].t("genres.kids"),value:"kids"},{label:Z["c"].t("genres.magic"),value:"magic"},{label:Z["c"].t("genres.martialArts"),value:"martial arts"},{label:Z["c"].t("genres.mecha"),value:"mecha"},{label:Z["c"].t("genres.military"),value:"military"},{label:Z["c"].t("genres.music"),value:"music"},{label:Z["c"].t("genres.mystery"),value:"mystery"},{label:Z["c"].t("genres.parody"),value:"parody"},{label:Z["c"].t("genres.police"),value:"police"},{label:Z["c"].t("genres.psychological"),value:"psychological"},{label:Z["c"].t("genres.romance"),value:"romance"},{label:Z["c"].t("genres.samurai"),value:"samurai"},{label:Z["c"].t("genres.school"),value:"school"},{label:Z["c"].t("genres.scifi"),value:"sci-fi"},{label:Z["c"].t("genres.seinen"),value:"seinen"},{label:Z["c"].t("genres.shoujo"),value:"shoujo"},{label:Z["c"].t("genres.shoujoAi"),value:"shoujo ai"},{label:Z["c"].t("genres.shounen"),value:"shounen"},{label:Z["c"].t("genres.shounenAi"),value:"shounen ai"},{label:Z["c"].t("genres.sliceOfLife"),value:"slice of life"},{label:Z["c"].t("genres.space"),value:"space"},{label:Z["c"].t("genres.sports"),value:"sports"},{label:Z["c"].t("genres.superPower"),value:"super power"},{label:Z["c"].t("genres.supernatural"),value:"supernatural"},{label:Z["c"].t("genres.thriller"),value:"thriller"},{label:Z["c"].t("genres.vampire"),value:"vampire"},{label:Z["c"].t("genres.yaoi"),value:"yaoi"},{label:Z["c"].t("genres.yuri"),value:"yuri"}];return e.sort((e,t)=>e.label.localeCompare(t.label)),Object.freeze({genres:e,airingStatuses:[{label:Z["c"].t("alreadyAired"),value:"already-aired"},{label:Z["c"].t("notYetAired"),value:"not-yet-aired"}],animeTypes:[{label:"TV",value:"tv"},{label:"OVA",value:"ova"},{label:Z["c"].t("movie"),value:"movie"},{label:Z["c"].t("special"),value:"special"},{label:"ONA",value:"ona"},{label:Z["c"].t("music"),value:"music"}],statuses:{watching:{label:Z["c"].t("status.watching"),icon:"visibility"},"on-hold":{label:Z["c"].t("status.onHold"),icon:"pause"},"plan-to-watch":{label:Z["c"].t("status.planToWatch"),icon:"watch_later"}}})}const te=ee(),se={language:Z["c"].locale,username:"",status:"watching",provider:X[0],providersByAnimeTitle:{},genreFilter:[],airingStatusFilter:te.airingStatuses.map(e=>e.value),typeFilter:te.animeTypes.map(e=>e.value),titlesByAnimeId:{MyAnimeList:{}}};t["a"]={data(){return{config:te,isRecurringUser:!this.$q.localStorage.isEmpty()}},computed:{...Object(Q["b"])("store",Object.keys(se))},created(){this.isRecurrentUser||Object.keys(se).forEach(e=>{if(this.$q.localStorage.has(e)){let t=this.$q.localStorage.getItem(e);const s=e=>X.find(t=>t.label===e)||X[0];if("provider"===e)t=s(t);else if("providersByAnimeTitle"===e){const e={};Object.entries(t).forEach(([t,a])=>{e[t]=s(a)}),t=e}void 0!==t&&null!==t&&(this[e]=t)}}),Object.keys(se).filter(e=>"provider"!==e&&"providersByAnimeTitle"!==e).forEach(e=>this.$watch(e,t=>this.$q.localStorage.set(e,t),{deep:!0}))},watch:{provider(e){this.$q.localStorage.set("provider",e.label)},providersByAnimeTitle:{handler(e){const t={};Object.entries(e).forEach(([e,s])=>{t[e]=s.label}),this.$q.localStorage.set("providersByAnimeTitle",t)},deep:!0},language(e){Z["c"].locale!==e&&(Z["c"].locale=e,this.$q.lang.set(e),this.config=ee())}}}}},[[0,2,0]]]);