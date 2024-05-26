import{a as w,S as E,i as P}from"./assets/vendor-ee72e1a4.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function F(a,r,s,i,e){const t=v(a,r,s,i,e);try{const{data:o}=await w.get(t);return o}catch(o){throw console.error("Error fetching data:",o),o}}function v(a,r,s,i,e){const t=new URLSearchParams({key:r,q:s,image_type:"photo",orientation:"horizontal",safesearch:"true",page:i,per_page:e});return`${a}?${t}`}function $(a,r){a.insertAdjacentHTML("beforeend",q(r)),C.refresh()}function q(a){return a.map(({webformatURL:r,largeImageURL:s,tags:i,likes:e,views:t,comments:o,downloads:S})=>` <li class="gallery-item">
      <a class="gallery-link" href="${s}">
        <figure class="gallery-figure">
          <img class="gallery-image" src="${r}" alt="${i}" width="360" />
          <figcaption class="gallery-figcaption">
            <ul class="gallery-text">
              <li>
                <span>Likes</span>
                <p>${e}</p>
              </li>
              <li>
                <span>Views</span>
                <p>${t}</p>
              </li>
              <li>
                <span>Comments</span>
                <p>${o}</p>
              </li>
              <li>
                <span>Downloads</span>
                <p>${S}</p>
              </li>
            </ul>
          </figcaption>
        </figure>
      </a>
    </li>`).join(" ")}const C=new E(".gallery a",{captionsData:"alt",captionDelay:250}),g="44022963-dc7d5638f3e5caf2e9b20745b",p="https://pixabay.com/api/",M=document.querySelector(".search-form"),h=document.querySelector(".gallery"),d=document.querySelector(".loader-wrapper"),l=document.querySelector(".load-more-btn");let n=1,m=15,y=null,f=null,u=null;M.addEventListener("submit",D);l.addEventListener("click",H);async function D(a){a.preventDefault(),h.innerHTML="",l.classList.add("is-hidden"),n=1;const r=a.currentTarget.search.value.trim();if(!r){c("Please enter a value in the field!","Error"),a.currentTarget.reset();return}d.classList.remove("is-hidden"),await L(p,g,r,n,m)}async function L(a,r,s,i,e){try{const t=await F(a,r,s,i,e),o=t.hits;if(o.length===0){c("Sorry, there are no images matching your search query. Please try again!");return}y=s,f=t.totalHits,u=Math.ceil(f/e),$(h,o),n>=u?l.classList.add("is-hidden"):l.classList.remove("is-hidden"),b()}catch(t){c("Error fetching data. Please try again later","Error"),console.error("Error fetching data:",t)}finally{d.classList.add("is-hidden")}}async function H(){n++,d.classList.remove("is-hidden"),await L(p,g,y,n,m),b(),n===u&&(l.classList.add("is-hidden"),c("We're sorry, but you've reached the end of search results.","","#EF4040"))}function b(){const a=document.querySelector(".gallery-item"),r=a?a.getBoundingClientRect().height:0;window.scrollBy({top:r*2,behavior:"smooth"})}const I={position:"topRight",titleColor:"#FFF",titleSize:"16",titleLineHeight:"24",messageColor:"#FFF",messageSize:"16",messageLineHeight:"24"};function c(a,r,s="#EF4040"){P.error({...I,title:r||"",message:`${a}`,backgroundColor:s})}
//# sourceMappingURL=commonHelpers.js.map
