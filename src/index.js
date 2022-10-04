document.addEventListener('DOMContentLoaded', () => {
  const {pathname} = window.location;
  const foldOpenCls = 'nav-fold-open';
  document.querySelectorAll('nav div.nav-dir-row > svg').forEach(elm => {
    elm.addEventListener('click', () => {
      elm.parentElement.parentElement.classList.toggle(foldOpenCls);
    });
  });
  const a = document.querySelector(`a[href="${encodeURI(pathname)}"]`);
  if (a) {
    // add here
    a.classList.add('nav-here');
    // add h2 list
    const p = a.parentElement;
    const ul = document.createElement('ul');
    for (const h2 of document.querySelectorAll('main h2')) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#'+(h2.id ?? '');
      a.innerText = h2.innerText;
      li.appendChild(a);
      ul.appendChild(li);
    }
    p.insertBefore(ul, a.nextSibling);
    // open fold
    for (let node=p.parentElement; node?.tagName==='DIV'; node=node.parentElement?.parentElement) {
      node.classList.add(foldOpenCls);
    }
  }
});
