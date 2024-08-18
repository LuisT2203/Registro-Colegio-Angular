

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", ()=>{
  sidebar.classList.toggle("close");
});

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementsByName('miContenedor')[0]; // Obtener el iframe por nombre
    const menuLinks = document.querySelectorAll('.sub-menu a,.iocn-link a');
    const loadingDiv = document.getElementById('loading');

    // Agregar un evento de clic a cada enlace del menú
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Ocultar la imagen con un efecto de desvanecimiento
            fadeOut(loadingDiv, 500); // 500 milisegundos de duración del desvanecimiento
        });
    });

    // Agregar un evento de carga al iframe

});
