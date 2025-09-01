// ===== Utilities =====
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

// Year
$('#year').textContent = new Date().getFullYear();

// ===== Theme toggle =====
const themeBtn = $('#themeToggle');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
function applyTheme(mode){
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('theme', mode);
}
applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Language / i18n =====
const langBtn = $('#langToggle');
const messages = {
    fr: {
    skip: "Aller au contenu",
    'nav.about': 'À propos', 'nav.skills':'Compétences', 'nav.projects':'Projets', 'nav.education':'Formation', 'nav.work':'Alternance', 'nav.contact':'Contact',
    'cta.hire':'Me contacter', 'cta.viewProjects':'Voir mes projets', 'cta.cv':'Télécharger mon CV',
    'hero.hi':'Bonjour, je suis', 'hero.role':'Étudiant BTS SIO SLAM (programmation)', 'hero.tag':'Mayenne • Passionné de dev, jeux vidéo, échecs (Laval) & culture japonaise', 'hero.photoNote':'Espace réservé pour ta photo (ajouter photo.jpg / mettre à jour l\'URL)',
    'about.title':'À propos de moi', 'about.p1':"Je m'appelle Baptiste BOIN. Étudiant en BTS SIO option SLAM, j'aime raisonner pour concevoir et développer des projets utiles. Curieux, j'apprends en pratiquant et en explorant de nouvelles technos.", 'about.p2':"Je suis passionné de jeux vidéo, je pratique les échecs au club de Laval, et je m'intéresse à la culture japonaise (cuisine, animation, paysages).", 'about.goal':'Objectif : alternance réussie & montée en compétences full‑stack', 'about.quick':'En bref', 'about.stat1k':'BTS SIO SLAM', 'about.stat1v':'1re année terminée (2024‑2025)', 'about.stat4k':'Langues', 'about.stat4v':'Français (natif), Anglais (technique)',
    'skills.title':'Compétences', 'skills.cat1':'Langages & Web', 'skills.cat2':'Données & BDD', 'skills.cat3':'Outils & Notions', 'skills.note1':'Bases solides en programmation scolaire et projets perso.', 'skills.note2':'Requêtage, jointures, scripts d\'export.', 'skills.note3':'Bonne autonomie d\'apprentissage, documentation first.',
    'projects.title':'Projets', 'projects.note':'💡 Ajoute des captures / liens GitHub quand tu veux — j\'ai préparé les cartes pour les accueillir.',
    'p.dbSync.desc':'Application C# pour comparer/rapprocher deux bases contenant des données similaires (détection d\'écarts, consolidation, export).', 'p.dbSync.b1':'Fonctions : mapping de champs, rapport des divergences, export CSV/XLSX.', 'p.dbSync.b2':'Objectif : faciliter la consolidation entre 2 SI hétérogènes.',
    'p.watch.desc':'Interface qui surveille un dossier et envoie automatiquement certains fichiers vers un serveur (ex : images, PDF).', 'p.watch.b1':'Filtrage par extension et taille, file d\'envoi.', 'p.watch.b2':'Journalisation des transferts et reprise simple.',
    'p.sim.desc':'Petites simulations algorithmiques et utilitaires (calculs, transformations de données, automatisations).', 'p.sim.b1':'Approche TDD sur certains exercices.', 'p.sim.b2':'Documentation succincte dans README.',
    'p.hotkey.desc':'Petit utilitaire C pour créer un raccourci clavier ouvrant Bloc‑notes et accélérer la prise de notes.', 'p.hotkey.b1':'Focus sur la gestion de raccourcis globaux et la stabilité.', 'p.hotkey.b2':'Aucune capture de frappes stockée.',
    'p.sql2xl.desc':'Outil qui exécute une requête SQL et exporte le résultat vers Excel pour analyses rapides.', 'p.sql2xl.b1':'Paramétrage de la requête & des colonnes.', 'p.sql2xl.b2':'Génération d\'onglets par requête.',
    'p.webtp.desc':'TP HTML/CSS/JS et PHP/MySQL réalisés durant la formation (CRUD, formulaires, petites APIs).', 'p.webtp.b1':'Bonnes pratiques d\'accessibilité & sémantique.', 'p.webtp.b2':'Validation côté serveur basique.',
    'edu.title':'Formation', 'edu.bts':'Institut : IIA Saint‑Berthevin — 1re année terminée. Projets web (PHP/MySQL), scripts Python, bases C#.', 'edu.bac':'Lycée : Immaculée Conception (Laval). Parcours SIN.', 'edu.schools':'Collège Saint‑Joseph (Ernée) — Parcours secondaire',
    'work.title':'Alternance', 'work.dates':'Août 2024 — Septembre 2026 (à confirmer)', 'work.link':'Voir notes', 'work.b1':'Gestion de smartphones chauffeurs via l\'outil MDM CLYD (déploiement, configuration).', 'work.b2':'Assistance aux utilisateurs (poste, messagerie, bureautique).', 'work.b3':'Gestion des comptes dans Active Directory (création, droits, suivi).',
    'contact.title':'Contact', 'contact.letsTalk':'Discutons', 'contact.p':'Je suis ouvert aux échanges, stages et projets. N\'hésitez pas.', 'contact.analytics':'Statistiques (facultatif)', 'contact.analyticsP':'Tu peux activer des stats anonymes (ex : Plausible). Ton consentement est enregistré localement.', 'contact.enable':'Activer', 'contact.disable':'Désactiver', 'contact.analyticsNote':'Paramètre : data-domain à renseigner ci‑dessous.',
    'footer.update':'Dernière mise à jour : 28 août 2025'
    },
    en: {
    skip: "Skip to content",
    'nav.about': 'About', 'nav.skills':'Skills', 'nav.projects':'Projects', 'nav.education':'Education', 'nav.work':'Apprenticeship', 'nav.contact':'Contact',
    'cta.hire':'Contact me', 'cta.viewProjects':'View my projects', 'cta.cv':'Download my CV',
    'hero.hi':'Hi, I\'m', 'hero.role':'BTS SIO SLAM student (software development)', 'hero.tag':'Mayenne • Into coding, video games, chess (Laval) & Japanese culture', 'hero.photoNote':'Placeholder for your photo (add photo.jpg / update URL)',
    'about.title':'About me', 'about.p1':"I\'m Baptiste BOIN, a BTS SIO (SLAM) student who loves reasoning to design and build useful software. I learn by doing and exploring new tech.", 'about.p2':'I enjoy video games, play chess in Laval\'s club, and love Japanese culture (food, anime, landscapes).', 'about.goal':'Goal: succeed in apprenticeship & grow full‑stack skills', 'about.quick':'At a glance', 'about.stat1k':'BTS SIO SLAM', 'about.stat1v':'Year 1 completed (2024‑2025)', 'about.stat4k':'Languages', 'about.stat4v':'French (native), English (technical)',
    'skills.title':'Skills', 'skills.cat1':'Languages & Web', 'skills.cat2':'Data & DBs', 'skills.cat3':'Tools & Basics', 'skills.note1':'Solid bases from school and personal projects.', 'skills.note2':'Querying, joins, export scripts.', 'skills.note3':'Self‑learning mindset, documentation first.',
    'projects.title':'Projects', 'projects.note':'💡 Add screenshots / GitHub links whenever you like — cards are ready.',
    'p.dbSync.desc':'C# app to compare/reconcile two similar databases (diffs, consolidation, export).', 'p.dbSync.b1':'Features: field mapping, diff report, CSV/XLSX export.', 'p.dbSync.b2':'Goal: make consolidation easier between two heterogeneous IS.',
    'p.watch.desc':'UI that watches a folder and automatically uploads certain files to a server (e.g., images, PDFs).', 'p.watch.b1':'Filter by extension & size, send queue.', 'p.watch.b2':'Transfer logging and simple resume.',
    'p.sim.desc':'Small algorithmic simulations and utilities (math, data transforms, automation).', 'p.sim.b1':'Some exercises done TDD‑style.', 'p.sim.b2':'Short README documentation.',
    'p.hotkey.desc':'Tiny C utility to open Notepad with a global hotkey to speed up note taking.', 'p.hotkey.b1':'Focus on global hotkey handling & stability.', 'p.hotkey.b2':'No keystrokes captured or stored.',
    'p.sql2xl.desc':'Tool that runs a SQL query and exports the result to Excel for quick analysis.', 'p.sql2xl.b1':'Parameterized query & columns.', 'p.sql2xl.b2':'One sheet per query.',
    'p.webtp.desc':'HTML/CSS/JS and PHP/MySQL practical work from school (CRUD, forms, small APIs).', 'p.webtp.b1':'Accessibility & semantic best practices.', 'p.webtp.b2':'Basic server‑side validation.',
    'edu.title':'Education', 'edu.bts':'Institute: IIA Saint‑Berthevin — Year 1 done. Web projects (PHP/MySQL), Python scripts, C# basics.', 'edu.bac':'High school: Immaculée Conception (Laval). SIN track.', 'edu.schools':'Collège Saint‑Joseph (Ernée) — Middle school',
    'work.title':'Apprenticeship', 'work.dates':'Aug 2024 — Sep 2026 (to confirm)', 'work.link':'See notes', 'work.b1':'Driver smartphones management with CLYD MDM (deploy, configure).', 'work.b2':'User support (workstation, mail, office).', 'work.b3':'Active Directory accounts (create, access, follow‑up).',
    'contact.title':'Contact', 'contact.letsTalk':'Let\'s talk', 'contact.p':'Open to chats, internships and projects.', 'contact.analytics':'Analytics (optional)', 'contact.analyticsP':'You can enable anonymous analytics (e.g., Plausible). Consent is stored locally.', 'contact.enable':'Enable', 'contact.disable':'Disable', 'contact.analyticsNote':'Set your data-domain below.',
    'footer.update':'Last updated: Aug 28, 2025'
    }
};
function applyI18n(lang){
    document.documentElement.lang = lang;
    $$('#langToggle').forEach(btn => btn.textContent = lang.toUpperCase());
    $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = messages[lang][key] || el.textContent;
    });
    localStorage.setItem('lang', lang);
}
const savedLang = localStorage.getItem('lang') || 'fr';
applyI18n(savedLang);
langBtn.addEventListener('click', () => {
    const lang = document.documentElement.lang === 'fr' ? 'en' : 'fr';
    applyI18n(lang);
});

// ===== Active nav highlight =====
const links = $$('.navlink');
const sections = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
    if (e.isIntersecting) {
        const id = '#' + e.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
    }
    });
}, { rootMargin: '-50% 0px -46% 0px', threshold: 0 });
sections.forEach(s => io.observe(s));

// ===== Copy email =====
const EMAIL = 'baptiste.boin06@gmail.com';
$('#copyEmail').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); } catch {}
    const b = $('#copyEmail');
    const old = b.innerHTML;
    b.innerHTML = '✅ Copié !';
    setTimeout(() => b.innerHTML = old, 1400);
});

// ===== Optional analytics consent (Plausible) =====
const CONSENT_KEY = 'analyticsConsent';
function injectPlausible(){
    if ($('#plausible')) return; // avoid duplicates
    const s = document.createElement('script');
    s.defer = true; s.src = 'https://plausible.io/js/script.js';
    s.setAttribute('data-domain', 'VOTRE-DOMAINE.FR');
    s.id = 'plausible';
    document.head.appendChild(s);
}
function removePlausible(){
    const s = $('#plausible'); if (s) s.remove();
}
if (localStorage.getItem(CONSENT_KEY) === 'true') injectPlausible();
$('#enableAnalytics').addEventListener('click', () => { localStorage.setItem(CONSENT_KEY, 'true'); injectPlausible(); alert('✅ Analytics activés'); });
$('#disableAnalytics').addEventListener('click', () => { localStorage.setItem(CONSENT_KEY, 'false'); removePlausible(); alert('⛔ Analytics désactivés'); });
