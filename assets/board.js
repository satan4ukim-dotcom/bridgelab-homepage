/* 동향 자료실 목록: 분야 선택 + 검색. 자바스크립트가 없으면 전체 목록이 그대로 보입니다. */
(function(){
  var list=document.getElementById('bl'); if(!list) return;
  var items=[].slice.call(list.querySelectorAll('.bl__item'));
  var chips=[].slice.call(document.querySelectorAll('.fchip'));
  var q=document.getElementById('bl-q'), cnt=document.getElementById('bl-count'), empty=document.getElementById('bl-empty');
  var cat='all';
  function apply(){
    var term=(q.value||'').trim().toLowerCase(), n=0;
    items.forEach(function(li){
      var ok=(cat==='all'||li.getAttribute('data-cat')===cat)&&(!term||li.getAttribute('data-q').indexOf(term)>-1);
      li.hidden=!ok; if(ok) n++;
    });
    cnt.textContent='총 '+n+'건'; empty.hidden=n>0;
  }
  function setCat(c){
    var found=chips.some(function(b){return b.getAttribute('data-cat')===c;});
    cat=found?c:'all';
    chips.forEach(function(b){var on=b.getAttribute('data-cat')===cat; b.classList.toggle('is-on',on); b.setAttribute('aria-pressed',on?'true':'false');});
    try{history.replaceState(null,'',cat==='all'?location.pathname+location.search:'#cat='+cat);}catch(e){}
    apply();
  }
  chips.forEach(function(b){b.addEventListener('click',function(){setCat(b.getAttribute('data-cat'));});});
  q.addEventListener('input',apply);
  function fromHash(){var m=/#cat=([a-z]+)/.exec(location.hash); if(m) setCat(m[1]); else if(!location.hash) setCat('all');}
  window.addEventListener('hashchange',fromHash);
  if(/#cat=/.test(location.hash)) fromHash(); else apply();
})();
