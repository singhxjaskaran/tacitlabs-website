/* CyberSOC pages: booking link, disclosures, tabs, scroll animations, motion toggle. */

(function(){
  // One booking link for every "Book a 30-minute call" button. Paste the
  // calendar URL here when it exists; until then the buttons open an email
  // that asks for the same details the call needs.
  var BOOKING_URL = '';
  if(BOOKING_URL){
    [].forEach.call(document.querySelectorAll('.js-book'), function(a){
      a.href = BOOKING_URL; a.target = '_blank'; a.rel = 'noopener';
    });
  }

  // Six-question cards and FAQ: open in the HTML (so the text is there
  // without JS and for search engines), collapsed once this runs.
  [].forEach.call(document.querySelectorAll('[data-disclosure]'), function(btn){
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if(!panel) return;
    function set(open){ btn.setAttribute('aria-expanded', open ? 'true' : 'false'); panel.hidden = !open; }
    set(false);
    btn.addEventListener('click', function(){ set(btn.getAttribute('aria-expanded') !== 'true'); });
  });

  // Six-question cards: when one opens, its row-mates keep their natural height
  // instead of stretching with a gap above "You get".
  var qcards = [].slice.call(document.querySelectorAll('.cs-q'));
  function markRows(){
    qcards.forEach(function(c){ c.classList.remove('row-open'); });
    var tops = qcards.map(function(c){ return c.offsetTop; });
    qcards.forEach(function(c, i){
      var rowOpen = qcards.some(function(o, j){
        return tops[j] === tops[i] && o.querySelector('.cs-more[aria-expanded="true"]');
      });
      if(rowOpen) c.classList.add('row-open');
    });
  }
  [].forEach.call(document.querySelectorAll('.cs-q .cs-more'), function(b){ b.addEventListener('click', markRows); });

  // The sample-report table scrolls sideways only on narrow screens; make it a
  // keyboard-scrollable region only then.
  var scrollers = [].slice.call(document.querySelectorAll('[data-scroll-region]'));
  function markScrollers(){
    scrollers.forEach(function(el){
      if(el.scrollWidth > el.clientWidth + 1){ el.tabIndex = 0; el.setAttribute('role', 'region'); }
      else { el.removeAttribute('tabindex'); el.removeAttribute('role'); }
    });
  }
  var resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){ markRows(); markScrollers(); }, 120);
  });
  markScrollers();

  // Moments: three columns on wide screens, tabs on phones.
  var tablist = document.querySelector('.cs-tabs');
  var wrap = document.querySelector('.cs-moments');
  if(tablist && wrap){
    var tabs = [].slice.call(tablist.querySelectorAll('[data-tab]'));
    var panels = tabs.map(function(t){ return document.getElementById(t.getAttribute('aria-controls')); });
    var mq = window.matchMedia('(max-width:780px)');
    var active = 0;
    function render(){
      var on = mq.matches;
      tablist.hidden = !on;
      wrap.classList.toggle('is-tabbed', on);
      if(on) tablist.setAttribute('role', 'tablist'); else tablist.removeAttribute('role');
      tabs.forEach(function(t, i){
        if(on){
          t.setAttribute('role', 'tab');
          t.setAttribute('aria-selected', i === active ? 'true' : 'false');
          t.tabIndex = i === active ? 0 : -1;
        } else {
          t.removeAttribute('role'); t.removeAttribute('aria-selected'); t.removeAttribute('tabindex');
        }
      });
      panels.forEach(function(p, i){
        if(on){
          p.setAttribute('role', 'tabpanel');
          p.setAttribute('aria-labelledby', tabs[i].id);
          p.tabIndex = 0;
          p.hidden = i !== active;
        } else {
          p.setAttribute('role', 'group');
          p.setAttribute('aria-labelledby', p.getAttribute('data-label-id'));
          p.removeAttribute('tabindex');
          p.hidden = false;
        }
      });
    }
    tabs.forEach(function(t, i){
      t.addEventListener('click', function(){ active = i; render(); });
      t.addEventListener('keydown', function(e){
        var n = null;
        if(e.key === 'ArrowRight') n = (active + 1) % tabs.length;
        else if(e.key === 'ArrowLeft') n = (active - 1 + tabs.length) % tabs.length;
        else if(e.key === 'Home') n = 0;
        else if(e.key === 'End') n = tabs.length - 1;
        if(n !== null){ e.preventDefault(); active = n; render(); tabs[n].focus(); }
      });
    });
    if(mq.addEventListener) mq.addEventListener('change', render); else mq.addListener(render);
    render();
  }
})();

/* Scroll animations, ported from the underwriting page: reveal on scroll,
   card stagger, micro-animations on the product cards, and video parallax. */
(function(){
  if(window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if(!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js-anim');

  var watched = [];
  function reg(el, mod, delay){
    if(!el || el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    if(mod) el.classList.add(mod);
    if(delay) el.style.transitionDelay = delay + 's';
    watched.push(el);
  }
  function stagger(nodes, mod, step, start, cap){
    [].forEach.call(nodes, function(el, i){ reg(el, mod, Math.min((start || 0) + i * step, cap || .4)); });
  }

  /* Hero (Tom): proof points like the underwriting page */
  document.querySelectorAll('.tom-sublabel').forEach(function(el, i){ reg(el, 'reveal--up-sm', i * .06); });

  /* CyberSOC intro block */
  stagger(document.querySelectorAll('.cs-hero > div:first-child > *'), 'reveal--up-sm', .07, 0, .4);
  stagger(document.querySelectorAll('.km-hero > *'), 'reveal--up-sm', .07, 0, .4);
  reg(document.querySelector('.cs-map'), 'reveal--scale', .15);

  /* Every section: kicker, heading, then its prose with a short stagger */
  document.querySelectorAll('main.cs .section').forEach(function(sec){
    reg(sec.querySelector(':scope > .section-num'), 'reveal--up-sm');
    reg(sec.querySelector(':scope > .section-title'), null, .06);
    stagger(sec.querySelectorAll(':scope > .t12, :scope > .t10, :scope > .cs-prose > *, :scope > .cs-sub, :scope > .cs-regfoot, :scope > .cs-lead, :scope > .cs-ctas'), null, .06, .12, .4);
  });

  /* Card groups */
  ['.cs-stats', '.cs-qgrid', '.cs-steps', '.cs-roles', '.cs-regions', '.cs-offers', '.cs-dodont', '.cs-lines', '.cs-chain', '.cs-faq', '.cs-duo'].forEach(function(sel){
    var box = document.querySelector(sel);
    if(box) stagger(box.children, 'reveal--up-sm', .06, 0, .36);
  });
  document.querySelectorAll('.cs-group').forEach(function(g){
    stagger(g.querySelectorAll('.cs-moment'), 'reveal--up-sm', .07, .05, .3);
  });
  reg(document.querySelector('.cs-sources ol'), 'reveal--fade', .04);
  ['.cs-clock', '.cs-weeks', '.cs-midcta'].forEach(function(sel){
    document.querySelectorAll(sel).forEach(function(el){ reg(el, 'reveal--up-sm', .08); });
  });
  reg(document.querySelector('.cs-score'), 'reveal--scale', .1);

  /* Final band: children in sequence */
  stagger(document.querySelectorAll('.cs-final > :not(video):not(.final-bg-tint)'), null, .08, 0, .48);

  // After an element has revealed, drop the reveal classes so its own hover and
  // transitions apply again (the phone-tab cards keep theirs for the re-stagger).
  function done(el){
    if(el.classList.contains('revealed')) return;
    el.classList.add('revealed');
    if(el.classList.contains('cs-moment')) return;
    setTimeout(function(){
      el.classList.remove('reveal', 'reveal--up-sm', 'reveal--scale', 'reveal--fade', 'revealed');
      el.style.transitionDelay = '';
    }, 1300);
  }
  // Anything reached by keyboard focus or a footnote jump shows at once
  function showFrom(node){
    for(var n = node; n && n !== document.body; n = n.parentElement){
      if(n.classList && n.classList.contains('reveal')) done(n);
      if(n.classList && (n.classList.contains('cs-map') || n.classList.contains('cs-score') || n.classList.contains('cs-clock') || n.classList.contains('cs-weeks'))) n.classList.add('in-view');
    }
  }
  document.addEventListener('focusin', function(e){ showFrom(e.target); });
  function showHash(){ if(location.hash){ var t = document.getElementById(location.hash.slice(1)); if(t) showFrom(t); } }
  window.addEventListener('hashchange', showHash);

  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ done(e.target); io.unobserve(e.target); }
    });
  }, { threshold:0, rootMargin:'0px 0px -10% 0px' });
  watched.forEach(function(el){ io.observe(el); });

  /* Micro-animations start when their card is properly in view */
  var hooks = document.querySelectorAll('.cs-map, .cs-score, .cs-clock, .cs-weeks');
  var hookIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in-view'); hookIO.unobserve(e.target); }
    });
  }, { threshold:0, rootMargin:'0px 0px -25% 0px' });
  [].forEach.call(hooks, function(el){ hookIO.observe(el); });
  showHash();

  /* Moments tabs on phones: re-stagger the cards of the panel you switch to */
  document.querySelectorAll('.cs-tabs [data-tab]').forEach(function(tab){
    tab.addEventListener('click', function(){
      var panel = document.getElementById(tab.getAttribute('aria-controls'));
      if(!panel) return;
      panel.querySelectorAll('.cs-moment').forEach(function(card, i){
        card.classList.remove('revealed');
        card.style.transitionDelay = (.07 * i) + 's';
        requestAnimationFrame(function(){ requestAnimationFrame(function(){ card.classList.add('revealed'); }); });
      });
    });
  });

  /* Video parallax on the final band */
  var vid = document.querySelector('.final-bg-video');
  var band = document.querySelector('.cs-final');
  if(vid && band){
    var parallax = function(){
      var r = band.getBoundingClientRect();
      var progress = (r.top + r.height * .5 - window.innerHeight * .5) / window.innerHeight;
      vid.style.transform = 'translateY(' + (progress * -40).toFixed(1) + 'px)';
    };
    window.addEventListener('scroll', parallax, { passive:true });
    parallax();
  }
})();

/* Pause / play the looping motion (WCAG 2.2.2). Remembered across the product pages. */
(function(){
  var btn = document.querySelector('.motion-toggle');
  if(!btn || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  var videos = [].slice.call(document.querySelectorAll('video[autoplay]'));
  function set(paused, save){
    btn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    btn.querySelector('.mt-label').textContent = paused ? 'play motion' : 'pause motion';
    document.documentElement.classList.toggle('motion-paused', paused);
    videos.forEach(function(v){
      if(paused){ v.pause(); }
      else { var p = v.play(); if(p && p.catch) p.catch(function(){}); }
    });
    if(save){ try{ localStorage.setItem('tacit-motion', paused ? 'paused' : 'on'); }catch(e){} }
  }
  btn.hidden = false;
  btn.addEventListener('click', function(){ set(btn.getAttribute('aria-pressed') !== 'true', true); });
  var stored = null;
  try{ stored = localStorage.getItem('tacit-motion'); }catch(e){}
  if(stored === 'paused') set(true, false);
})();
