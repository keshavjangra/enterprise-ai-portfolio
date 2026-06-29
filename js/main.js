(function(){
  const c = document.getElementById('stars');
  const ctx = c.getContext('2d');
  let W, H, stars = [];
  function init(){
    W = c.width = window.innerWidth;
    H = c.height = window.innerHeight;
    stars = Array.from({length:120}, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*.8+.2,
      a: Math.random(), da: (Math.random()-.5)*.004
    }));
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    stars.forEach(s => {
      s.a = Math.max(.05, Math.min(1, s.a + s.da));
      if(s.a<=.05||s.a>=1) s.da*=-1;
      ctx.globalAlpha = s.a;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = '#E8EDF5';
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  window.addEventListener('resize', init);
  init(); draw();
})();

/* ── TERMINAL TYPEWRITER ── */
(function(){
  const body = document.getElementById('termBody');
  const lines = [
    { type:'cmd',  text:'whoami' },
    { type:'out',  text:'keshav.jangra — Senior .NET & AI Engineer', cls:''},
    { type:'cmd',  text:'cat skills.json | jq .top' },
    { type:'out',  text:'["ML.NET","RAG","AI-Agents","SQL","MVC"]', cls:''},
    { type:'cmd',  text:'git log --oneline -3' },
    { type:'out',  text:'a1f3b2c  feat: RAG chatbot with vector search', cls:'amber'},
    { type:'out',  text:'8d9e12f  feat: ML.NET intent classifier', cls:'amber'},
    { type:'out',  text:'c3f7a91  feat: ReAct AI agent loop', cls:'amber'},
    { type:'cmd',  text:'echo $STATUS' },
    { type:'out',  text:'Actively seeking AI-focused engineering roles 🚀', cls:''},
    { type:'cursor', text:'' },
  ];
  let i = 0;
  function addLine(){
    if(i >= lines.length) return;
    const l = lines[i++];
    const div = document.createElement('div');
    div.classList.add('term-line');
    div.style.animationDelay = '0s';
    if(l.type === 'cursor'){
      div.innerHTML = `<span class="term-prompt">❯</span><span class="cursor"></span>`;
    } else if(l.type === 'cmd'){
      div.innerHTML = `<span class="term-prompt">❯</span><span class="term-cmd">${l.text}</span>`;
    } else {
      div.innerHTML = `<span class="term-out ${l.cls||''}">${l.text}</span>`;
    }
    body.appendChild(div);
    setTimeout(addLine, l.type==='cmd' ? 600 : 300);
  }
  setTimeout(addLine, 800);
})();

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); }
  });
}, { threshold: .12 });
revealEls.forEach(el => observer.observe(el));

/* ── SKILL BAR ANIMATION ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const fill = e.target.querySelector('.skill-fill');
      if(fill){
        fill.style.transform = `scaleX(${parseFloat(fill.dataset.width)/100})`;
      }
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));