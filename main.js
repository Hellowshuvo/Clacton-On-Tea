function toggleTheme(){var h=document.documentElement,d=h.getAttribute('data-theme')==='dark';h.setAttribute('data-theme',d?'light':'dark');document.getElementById('tlbl').textContent=d?'Dark':'Light';}
var cur=document.getElementById('cur'),ring=document.getElementById('ring'),mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.ci,.mc,.toggle').forEach(function(el){el.addEventListener('mouseenter',function(){cur.style.transform='translate(-50%,-50%) scale(2)';ring.style.opacity='0';});el.addEventListener('mouseleave',function(){cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='1';});});

var showingAll=false;
var MOBILE_LIMIT=10;
function isMobile(){return window.innerWidth<=880;}

function applyMobileLimit(cat){
  var cards=document.querySelectorAll('.mgrid .mc:not(.hidden)');
  var wrap=document.getElementById('showMoreWrap');
  var txt=document.getElementById('showMoreTxt');
  var arrow=document.getElementById('showMoreArrow');
  if(isMobile()&&cat==='all'){
    var count=0;
    cards.forEach(function(c){
      if(count<MOBILE_LIMIT){c.classList.remove('mob-hidden');count++;}
      else{c.classList.add('mob-hidden');}
    });
    if(cards.length>MOBILE_LIMIT){
      wrap.style.display='flex';
      txt.textContent='Show all '+(cards.length)+' items';
      arrow.classList.remove('up');
      showingAll=false;
    }else{wrap.style.display='none';}
  }else{
    cards.forEach(function(c){c.classList.remove('mob-hidden');});
    wrap.style.display='none';
    showingAll=false;
  }
}

function filterMenu(cat,btn){
  document.querySelectorAll('.mc').forEach(function(c){
    c.classList.remove('mob-hidden');
    c.classList.toggle('hidden',cat!=='all'&&c.dataset.cat!==cat);
  });
  if(btn){
    document.querySelectorAll('.chip').forEach(function(b){b.classList.remove('active');});
    btn.classList.add('active');
  }
  applyMobileLimit(cat);
  document.getElementById('menu').scrollIntoView({behavior:'smooth',block:'start'});
}

function toggleShowMore(){
  var cards=document.querySelectorAll('.mgrid .mc:not(.hidden)');
  var txt=document.getElementById('showMoreTxt');
  var arrow=document.getElementById('showMoreArrow');
  if(!showingAll){
    cards.forEach(function(c){c.classList.remove('mob-hidden');});
    txt.textContent='Show less';
    arrow.classList.add('up');
    showingAll=true;
  }else{
    var count=0;
    cards.forEach(function(c){
      if(count<MOBILE_LIMIT){c.classList.remove('mob-hidden');count++;}
      else{c.classList.add('mob-hidden');}
    });
    txt.textContent='Show all '+(cards.length)+' items';
    arrow.classList.remove('up');
    showingAll=false;
    document.getElementById('menu').scrollIntoView({behavior:'smooth',block:'start'});
  }
}

// Init: apply mobile limit on page load
applyMobileLimit('all');
window.addEventListener('resize',function(){applyMobileLimit(document.querySelector('.chip.active')?document.querySelector('.chip.active').dataset.cat:'all');});

var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target);}});},{threshold:.08});
document.querySelectorAll('.rv').forEach(function(el){obs.observe(el);});
setTimeout(function(){document.querySelectorAll('.hero .rv').forEach(function(el){el.classList.add('vis');});},80);

var toastTimeout;
function showToast(msg) {
  var t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(function(){t.classList.remove('show');}, 2500);
}

document.addEventListener('click', function(e) {
  var addBtn = e.target.closest('.btn-add-order');
  if(addBtn) {
    e.preventDefault();
    var name = addBtn.getAttribute('data-name');
    showToast(name + ' added to tray!');
  }
});
