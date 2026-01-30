console.log("Script chargé — navigation mobile activée");

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-menu');
if(navToggle && navList){
  navToggle.addEventListener('click', ()=>{
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

// Ajoutez ici d'autres interactions si besoin (lazy-loading, animations, etc.)
