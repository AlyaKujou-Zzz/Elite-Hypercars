/* =====================================================================
   ELITE HYPERCARS — Script principal (main.js)
   ---------------------------------------------------------------------
   Funcionalidades:
   1. Marcar el enlace activo del menú según la página actual
   2. Menú hamburguesa (móvil)
   3. Cambio de estilo de la barra al hacer scroll
   4. Reveal on scroll (animaciones con IntersectionObserver)
   5. Smooth scroll para enlaces internos (#ancla)
   6. Año dinámico en el footer
   ===================================================================== */

document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------------------------------------------------
     1. ENLACE ACTIVO DEL MENÚ
     Compara el nombre del archivo actual con el href de cada enlace.
     ------------------------------------------------------------------- */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });

  /* -------------------------------------------------------------------
     2. MENÚ HAMBURGUESA (MÓVIL)
     ------------------------------------------------------------------- */
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    // Cerrar el menú al hacer clic en un enlace
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
      });
    });
  }

  /* -------------------------------------------------------------------
     3. ESTILO DE LA BARRA AL HACER SCROLL
     Añade la clase "scrolled" cuando se baja más de 60px.
     ------------------------------------------------------------------- */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 60) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* -------------------------------------------------------------------
     4. REVEAL ON SCROLL
     Usa IntersectionObserver para revelar los elementos [data-anim]
     cuando entran en el viewport (fade, zoom, slide, etc.).
     ------------------------------------------------------------------- */
  const animated = document.querySelectorAll("[data-anim]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Retardo opcional definido con data-delay (en ms)
            const delay = entry.target.getAttribute("data-delay") || 0;
            setTimeout(function () {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animated.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Respaldo: mostrar todo si no hay soporte
    animated.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* -------------------------------------------------------------------
     5. SMOOTH SCROLL PARA ENLACES INTERNOS
     ------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  /* -------------------------------------------------------------------
     6. AÑO DINÁMICO EN EL FOOTER
     ------------------------------------------------------------------- */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
