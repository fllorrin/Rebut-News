(function(){
  const container = document.getElementById('issues');
  if(!container) return;

  fetch('papers/index.json').then(r=>{
    if(!r.ok) throw new Error('Manifest introuvable');
    return r.json();
  }).then(list=>{
    if(!list.length){
      container.innerHTML = '<div class="card">Aucune parution disponible.</div>';
      return;
    }
    container.innerHTML = '';
    list.forEach(item=>{
      const article = document.createElement('article');
      article.className = 'card';

      const d = new Date(item.date);
      const dateStr = d.toLocaleDateString('fr-FR');

      article.innerHTML = `
        <h3>${dateStr} — ${item.title}</h3>
        <p>${item.excerpt || ''}</p>
        <a href="${item.path}" class="link">Lire →</a>
      `;
      container.appendChild(article);
    });
  }).catch(err=>{
    console.error(err);
    container.innerHTML = '<div class="card">Erreur lors du chargement des parutions.</div>';
  });
})();