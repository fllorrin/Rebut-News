const fs = require('fs');
const path = require('path');

const papersDir = path.join(__dirname, '..', 'papers');
const outFile = path.join(papersDir, 'index.json');

function parseTitle(content){
  const match = content.match(/<h2[^>]*>([^<]+)<\/h2>/i);
  return match ? match[1].trim() : '';
}

function parseLead(content){
  const match = content.match(/<p[^>]*class="lead"[^>]*>([\s\S]*?)<\/p>/i);
  if(!match) return '';
  // remove tags and collapse whitespace
  return match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
}

fs.readdir(papersDir, (err, files) => {
  if(err) return console.error('Erreur lecture dossier papers:', err);
  const issues = files
    .filter(f => /^p\d{8}\.html$/.test(f))
    .map(f => {
      const full = fs.readFileSync(path.join(papersDir, f), 'utf8');
      const title = parseTitle(full) || `Édition ${f}`;
      const excerpt = parseLead(full).slice(0,240);
      const date = f.slice(1,9); // YYYYMMDD
      const formattedDate = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`;
      return {
        file: f,
        date: formattedDate,
        title: title,
        excerpt: excerpt,
        path: `papers/${f}`
      };
    })
    .sort((a,b) => b.date.localeCompare(a.date));

  fs.writeFileSync(outFile, JSON.stringify(issues, null, 2), 'utf8');
  console.log(`Généré ${outFile} (${issues.length} parution(s))`);
});
