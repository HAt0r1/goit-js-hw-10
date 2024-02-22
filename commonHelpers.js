import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as l,i as m}from"./assets/vendor-77e16229.js";const s=document.getElementById("datetime-picker"),o=document.querySelector(".start-button"),f=document.querySelector("[data-seconds]"),h=document.querySelector("[data-minutes]"),g=document.querySelector("[data-hours]"),p=document.querySelector("[data-days]");o.disabled=!0;const y={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(n){const t=Date.now();n[0]<t?m.show({title:"Error",titleColor:"#ffffff",iconUrl:"./img/javascript.svg#icon-error",message:"Please choose a date in the future",messageColor:"#ffffff",backgroundColor:"#EF4040",position:"topRight",pauseOnHover:!1}):o.disabled=!1}};l(s,y);class T{constructor({onTick:t}){this.onTick=t}startTimer(){const t=new Date(s.value).getTime();this.interval=setInterval(()=>{const r=Date.now(),e=t-r;if(e<=0)this.stopTimer();else{const a=this.convertMs(e);this.onTick(a)}},1e3),o.disabled=!0,s.disabled=!0}stopTimer(){clearInterval(this.interval),o.disabled=!1,s.disabled=!1}convertMs(t){const i=this.addLeadingZero(Math.floor(t/864e5)),c=this.addLeadingZero(Math.floor(t%864e5/36e5)),d=this.addLeadingZero(Math.floor(t%864e5%36e5/6e4)),u=this.addLeadingZero(Math.floor(t%864e5%36e5%6e4/1e3));return{days:i,hours:c,minutes:d,seconds:u}}addLeadingZero(t){return String(t).padStart(2,"0")}}function v({days:n,hours:t,minutes:r,seconds:e}){f.textContent=e,h.textContent=r,g.textContent=t,p.textContent=n}const b=new T({onTick:v});o.addEventListener("click",()=>b.startTimer());
//# sourceMappingURL=commonHelpers.js.map
