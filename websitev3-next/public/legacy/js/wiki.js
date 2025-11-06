(function(){
  const navEl = document.getElementById('wiki-nav');
  const contentEl = document.getElementById('wiki-content');
  const breadcrumbsEl = document.getElementById('wiki-breadcrumbs');
  const searchEl = document.getElementById('wiki-search');

  let config = null;
  let flatIndex = [];

  async function loadConfig(){
    const res = await fetch('config.json');
    if(!res.ok) throw new Error('Failed to load wiki config');
    config = await res.json();
  }

  function buildNav(){
    navEl.innerHTML = '';
    flatIndex = [];

    config.sections.forEach((section, sIdx) => {
      const sec = document.createElement('div');
      sec.className = 'wiki-section';

      const h = document.createElement('h4');
      h.textContent = section.title;
      sec.appendChild(h);

      const ul = document.createElement('ul');
      section.items.forEach((item, iIdx) => {
        const li = document.createElement('li');
        li.className = 'wiki-item';
        const a = document.createElement('a');
        a.href = `#/${encodeURIComponent(item.path)}`;
        a.textContent = item.title;
        a.dataset.path = item.path;
        a.dataset.type = item.type || 'md';
        a.dataset.section = section.title;
        a.addEventListener('click', () => highlightActive(item.path));
        li.appendChild(a);
        ul.appendChild(li);
        flatIndex.push({
          title: item.title.toLowerCase(),
          section: section.title.toLowerCase(),
          path: item.path,
          type: item.type || 'md',
          el: a
        });
      });
      sec.appendChild(ul);
      navEl.appendChild(sec);
    });
  }

  function filterNav(query){
    const q = query.trim().toLowerCase();
    flatIndex.forEach(entry => {
      const match = !q || entry.title.includes(q) || entry.section.includes(q);
      entry.el.parentElement.style.display = match ? '' : 'none';
    });
  }

  function highlightActive(path){
    const links = navEl.querySelectorAll('a');
    links.forEach(a => a.classList.toggle('active', a.dataset.path === path));
  }

  function setBreadcrumbs(title, section){
    breadcrumbsEl.innerHTML = '';
    const home = document.createElement('a');
    home.href = 'index.html';
    home.textContent = 'Wiki';
    const sep = document.createElement('span'); sep.textContent = ' / ';
    const sec = document.createElement('span'); sec.textContent = section || '';
    const sep2 = document.createElement('span'); sep2.textContent = ' / ';
    const cur = document.createElement('span'); cur.textContent = title || '';
    breadcrumbsEl.append(home, sep, sec, sep2, cur);
  }

  async function loadContentByPath(path, type){
    contentEl.innerHTML = '<div class="loading">Loading…</div>';
    try{
      const res = await fetch(`../${path}`);
      if(!res.ok) throw new Error(`Failed to fetch ${path}`);
      const raw = await res.text();
      if(type === 'md'){
        contentEl.innerHTML = marked.parse(raw);
      } else {
        // Extract body content if a full HTML page
        const bodyMatch = raw.match(/<body[\s\S]*?>([\s\S]*?)<\/body>/i);
        contentEl.innerHTML = bodyMatch ? bodyMatch[1] : raw;
      }
      // Auto-scroll top after render
      contentEl.scrollTop = 0;
    } catch(err){
      console.error(err);
      contentEl.innerHTML = `<p style="color:#ff6b6b">Error loading: ${path}</p>`;
    }
  }

  function route(){
    const hash = decodeURIComponent(location.hash || '');
    let path = config.default.path;
    let type = config.default.type || 'md';
    let title = config.default.title;
    let sectionTitle = 'Start Here';

    if(hash.startsWith('#/')){
      path = hash.slice(2);
      // find in index to get type and titles
      const entry = flatIndex.find(e => e.path === path);
      if(entry){
        type = entry.type;
        title = entry.el.textContent;
        sectionTitle = entry.el.dataset.section;
      }
    }
    highlightActive(path);
    setBreadcrumbs(title, sectionTitle);
    loadContentByPath(path, type);
  }

  async function init(){
    await loadConfig();
    buildNav();
    window.addEventListener('hashchange', route);
    searchEl.addEventListener('input', (e)=>filterNav(e.target.value));
    route();
  }

  init();
})();
