document.documentElement.className=document.documentElement.className.replace('no-js','js');
document.addEventListener('DOMContentLoaded',function(){
  /* S2 띠: 이미지 파일이 있으면 대체 라벨을 숨김(없으면 라벨 유지) */
  var band=document.querySelector('.slot--band');
  if(band){var im=new Image();im.onload=function(){band.classList.add('is-loaded');};im.src='assets/img/customers-band.png';}
  var btn=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
  if(!nav)return;
  function setOpen(o){nav.classList.toggle('is-open',o);if(btn)btn.setAttribute('aria-expanded',o?'true':'false');}
  if(btn){
    btn.addEventListener('click',function(){setOpen(btn.getAttribute('aria-expanded')!=='true');});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){setOpen(false);btn.focus();}
    });
  }
  nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
  /* 메인 페이지에서만: 현재 보는 섹션을 메뉴에 표시 */
  var ids=['customers','data','cases','resources','contact'].filter(function(i){return document.getElementById(i);});
  if(!ids.length||!('IntersectionObserver' in window))return;
  var vis={},cur='',links=nav.querySelectorAll('a:not(.btn)');
  function mark(id){
    if(id===cur)return;cur=id;
    links.forEach(function(a){
      if(id&&a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','true');
      else if(a.getAttribute('aria-current')==='true')a.removeAttribute('aria-current');
    });
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){vis[e.target.id]=e.isIntersecting;});
    mark(ids.filter(function(i){return vis[i];}).pop()||'');
  },{rootMargin:'-10% 0px -60% 0px'});
  ids.forEach(function(i){io.observe(document.getElementById(i));});
});
