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
        'nav.about': 'À propos', 'nav.skills':'Compétences', 'nav.projects':'Projets', 'nav.work':'Alternance', 'nav.contact':'Contact',
        'cta.hire':'Me contacter', 'cta.cv':'Télécharger mon CV',
        'hero.hi':'Bonjour, je suis', 'hero.role':'Alternant Développement (BTS SIO SLAM)', 'hero.tag':'Mayenne • Passionné de Dev, Stratégie, Musique & Culture Japonaise',
        
        'about.title':'À propos de moi', 
        'about.p1':"Je m'appelle Baptiste BOIN. Actuellement en BTS SIO SLAM et alternant, je développe mes compétences en C#, Python et Web.", 
        'about.p2':"Je suis passionné par les jeux de stratégie, la musique et la culture japonaise.",
        'about.quick':'En bref', 'about.stat1k':'Etudes', 'about.stat1v':'BTS SIO (En cours)', 'about.hobbies':'Stratégie, Musique, Japon',

        'skills.title':'Compétences', 'skills.cat1':'Langages & Web', 'skills.cat2':'Données & BDD', 'skills.cat3':'Outils & Frameworks',
        
        'projects.title':'Projets & Missions',
        'p.demat.title': 'Outil Dématérialisation', 'p.demat.desc': 'Outil Python pour automatiser la dématérialisation (Lien SQL Server & Excel).',
        'p.sqltool.title': 'Outil Requêtes SQL', 'p.sqltool.desc': 'Script Python pour exécuter des requêtes sur SQL Server et MySQL.',
        'p.wpfdb.title': 'Liaison BDD (WPF)', 'p.wpfdb.desc': 'Application C# WPF assurant la liaison entre deux bases SQL Server.',
        'p.contacts.title': 'Gestion Contacts', 'p.contacts.desc': 'Application de gestion de contacts en C# (WPF) avec base MySQL.',
        'p.spotify.title': 'App API Spotify', 'p.spotify.desc': 'Application JavaScript utilisant l\'API Spotify avec Node.js.',
        'p.keylogger.title': 'KeyLogger C', 'p.keylogger.desc': 'Développement d\'un KeyLogger en C (Projet éducatif/sécurité).',

        'work.title':'Alternance', 'work.dates':'Contrat de 2 ans (En cours)', 
        'work.b1':'Développement applicatif (Python, C#).', 
        'work.b2':'Maintenance et requêtage BDD.', 
        'work.b3':'Support technique et déploiement.',

        'contact.title':'Contact', 'contact.letsTalk':'Discutons'
    },
    en: {
        skip: "Skip to content",
        'nav.about': 'About', 'nav.skills':'Skills', 'nav.projects':'Projects', 'nav.work':'Work', 'nav.contact':'Contact',
        'cta.hire':'Contact me', 'cta.cv':'Download CV',
        'hero.hi':'Hi, I\'m', 'hero.role':'Software Dev Apprentice (BTS SIO)', 'hero.tag':'Mayenne • Strategy Games, Music, Dev & Japanese Culture',
        
        'about.title':'About me', 
        'about.p1':"I'm Baptiste BOIN. Currently a BTS SIO student and apprentice, growing my skills in C#, Python, and Web development.", 
        'about.p2':"I am passionate about strategy games, music, and Japanese culture.",
        'about.quick':'At a glance', 'about.stat1k':'Education', 'about.stat1v':'BTS SIO (Ongoing)', 'about.hobbies':'Strategy, Music, Japan',

        'skills.title':'Skills', 'skills.cat1':'Languages & Web', 'skills.cat2':'Data & DB', 'skills.cat3':'Tools & Frameworks',
        
        'projects.title':'Projects & Missions',
        'p.demat.title': 'Demat Tool', 'p.demat.desc': 'Python tool for automation (SQL Server & Excel link).',
        'p.sqltool.title': 'SQL Query Tool', 'p.sqltool.desc': 'Python script to execute requests on SQL Server and MySQL.',
        'p.wpfdb.title': 'DB Linking (WPF)', 'p.wpfdb.desc': 'C# WPF Desktop app linking two SQL Server databases.',
        'p.contacts.title': 'Contact Manager', 'p.contacts.desc': 'Contact management app using C# (WPF) and MySQL.',
        'p.spotify.title': 'Spotify API App', 'p.spotify.desc': 'JavaScript application using Spotify API with Node.js.',
        'p.keylogger.title': 'KeyLogger C', 'p.keylogger.desc': 'KeyLogger development in C (Educational/Security project).',

        'work.title':'Apprenticeship', 'work.dates':'2-year contract (Ongoing)', 
        'work.b1':'Application development (Python, C#).', 
        'work.b2':'Database maintenance and querying.', 
        'work.b3':'Tech support and deployment.',

        'contact.title':'Contact', 'contact.letsTalk':'Let\'s talk'
    }
};

function applyI18n(lang){
    document.documentElement.lang = lang;
    $$('#langToggle').forEach(btn => btn.textContent = lang.toUpperCase());
    $$('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(messages[lang][key]) el.textContent = messages[lang][key];
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
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
sections.forEach(s => io.observe(s));