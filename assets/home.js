document.documentElement.className=document.documentElement.className.replace('no-js','js');
document.addEventListener('DOMContentLoaded',function(){
  var btn=document.querySelector('.nav-toggle'),nav=document.getElementById('site-nav');
  function setOpen(o){if(!nav)return;nav.classList.toggle('is-open',o);if(btn)btn.setAttribute('aria-expanded',o?'true':'false');}
  if(btn&&nav){
    btn.addEventListener('click',function(){setOpen(btn.getAttribute('aria-expanded')!=='true');});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){setOpen(false);btn.focus();}});
    nav.addEventListener('click',function(e){if(e.target.closest('a'))setOpen(false);});
  }
  /* 등장 애니메이션 */
  var rv=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window&&rv.length){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
    rv.forEach(function(el){io.observe(el);});
  }else{rv.forEach(function(el){el.classList.add('in');});}
  /* 현재 섹션을 메뉴에 표시 */
  var ids=['customers','process','data','cases','resources'].filter(function(i){return document.getElementById(i);});
  if(!nav||!ids.length||!('IntersectionObserver' in window))return;
  var vis={},cur='',links=nav.querySelectorAll('a:not(.cta)');
  function mark(id){if(id===cur)return;cur=id;links.forEach(function(a){if(id&&a.getAttribute('href')==='#'+id)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});}
  var so=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting;});mark(ids.filter(function(i){return vis[i];}).pop()||'');},{rootMargin:'-20% 0px -60% 0px'});
  ids.forEach(function(i){so.observe(document.getElementById(i));});
});
