function toggleTheme(){var h=document.documentElement,d=h.getAttribute('data-theme')==='dark';h.setAttribute('data-theme',d?'light':'dark');document.getElementById('tlbl').textContent=d?'Dark':'Light';}
var cur=document.getElementById('cur'),ring=document.getElementById('ring'),mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.ci,.mc,.toggle').forEach(function(el){el.addEventListener('mouseenter',function(){cur.style.transform='translate(-50%,-50%) scale(2)';ring.style.opacity='0';});el.addEventListener('mouseleave',function(){cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.opacity='1';});});
function filterMenu(cat,btn){document.querySelectorAll('.mc').forEach(function(c){c.classList.toggle('hidden',cat!=='all'&&c.dataset.cat!==cat);});if(btn){document.querySelectorAll('.fb').forEach(function(b){b.classList.remove('active');});btn.classList.add('active');}document.getElementById('menuSection').scrollIntoView({behavior:'smooth',block:'start'});}
var obs=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target);}});},{threshold:.08});
document.querySelectorAll('.rv').forEach(function(el){obs.observe(el);});
setTimeout(function(){document.querySelectorAll('.hero .rv').forEach(function(el){el.classList.add('vis');});},80);
