// ── Accessibility helpers applied to whatever is on screen ──
// On/off switches get a name and switch role; scrolling tables can be reached with the keyboard.
(function(){
  function fix(root){
    root.querySelectorAll('button.toggle:not([data-a11y])').forEach(b=>{b.dataset.a11y='1';
      const row=b.closest('.set-row');const name=row&&row.querySelector('b');
      b.setAttribute('role','switch');if(name&&!b.getAttribute('aria-label'))b.setAttribute('aria-label',name.textContent.trim());
      b.setAttribute('aria-checked',b.classList.contains('on')?'true':'false');});
    root.querySelectorAll('.tbl-wrap:not([tabindex])').forEach(t=>{t.tabIndex=0;t.setAttribute('role','region');
      const h=t.previousElementSibling;t.setAttribute('aria-label',(h&&/^H\d$/.test(h.tagName)?h.textContent.trim():'Table')+' (scrolls sideways)');});
  }
  new MutationObserver(ms=>{for(const m of ms){
    if(m.type==='attributes'&&m.target.matches&&m.target.matches('button.toggle'))m.target.setAttribute('aria-checked',m.target.classList.contains('on')?'true':'false');
    else if(m.addedNodes.length)fix(document);}})
    .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('DOMContentLoaded',()=>fix(document));
})();
