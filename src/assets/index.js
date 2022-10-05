document.addEventListener('DOMContentLoaded', () => {
  const {pathname} = window.location;
  const clsFoldOpen = 'nav-fold-open';
  document.querySelectorAll('nav div.nav-entry > svg').forEach(elm => {
    elm.addEventListener('click', () => {
      elm.parentElement.parentElement.classList.toggle(clsFoldOpen);
    });
  });
  const a = document.querySelector(`a[href="${encodeURI(pathname)}"]`);
  if (a == null) return;
  const p = a.parentElement;
  // add h2 list
  const ul = document.createElement('ul');
  for (const h2 of document.querySelectorAll('main h2')) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#'+(h2.id ?? '');
    a.innerText = h2.innerText;
    li.appendChild(a);
    ul.appendChild(li);
  }
  if (a.classList.contains('nav-root')) {
    return; // TODO
    // a.classList.add('nav-here');
    // p.insertBefore(ul, a.nextSibling);
  } else {
    p.classList.add('nav-here');
    const p2 = p.parentElement;
    p2.insertBefore(ul, p.nextSibling);
    p2.classList.add(clsFoldOpen);
  }
  // open fold
  for (let node=p; node?.tagName==='DIV'; node=node.parentElement?.parentElement) {
    node.classList.add(clsFoldOpen);
  }
});
