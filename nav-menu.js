/* Product menu in the primary nav (disclosure pattern, not role=menu).
   Mouse: opens on hover, a click pins it open. Touch/keyboard: click toggles.
   Escape, a click outside, or tabbing away closes it. */
(function(){
  document.documentElement.classList.add('nav-js');

  function init(){
    var menus = [].slice.call(document.querySelectorAll('.nav-menu'));
    if(!menus.length) return;

    function setOpen(menu, open){
      menu.classList.toggle('is-open', open);
      menu.querySelector('.nav-menu-btn').setAttribute('aria-expanded', open ? 'true' : 'false');
      if(!open) menu._hoverOpen = false;
    }

    menus.forEach(function(menu){
      var btn = menu.querySelector('.nav-menu-btn');
      var closeTimer = null;

      btn.addEventListener('click', function(){
        if(menu._hoverOpen){ menu._hoverOpen = false; return; } // pin a hover-opened menu
        setOpen(menu, !menu.classList.contains('is-open'));
      });

      menu.addEventListener('pointerenter', function(e){
        if(e.pointerType !== 'mouse') return;
        clearTimeout(closeTimer);
        if(!menu.classList.contains('is-open')){ setOpen(menu, true); menu._hoverOpen = true; }
      });
      menu.addEventListener('pointerleave', function(e){
        if(e.pointerType !== 'mouse' || !menu._hoverOpen) return;
        closeTimer = setTimeout(function(){
          // keyboard focus moved into the panel: keep it open for the keyboard user
          if(menu.querySelector('.nav-menu-panel').contains(document.activeElement)){ menu._hoverOpen = false; return; }
          setOpen(menu, false);
        }, 180);
      });

      menu.addEventListener('focusout', function(e){
        if(e.relatedTarget && !menu.contains(e.relatedTarget)) setOpen(menu, false);
      });
    });

    // Escape closes an open menu wherever focus is (hover-opened menus included)
    document.addEventListener('keydown', function(e){
      if(e.key !== 'Escape') return;
      menus.forEach(function(menu){
        if(!menu.classList.contains('is-open')) return;
        var hadFocus = menu.contains(document.activeElement);
        setOpen(menu, false);
        if(hadFocus) menu.querySelector('.nav-menu-btn').focus();
      });
    });

    document.addEventListener('click', function(e){
      menus.forEach(function(menu){ if(!menu.contains(e.target)) setOpen(menu, false); });
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
