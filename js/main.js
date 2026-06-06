(function () {
    // habilita animaciones controladas por JS
    document.documentElement.classList.add('js');

    function marcarNavActivo() {
        var pagina = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(function (a) {
            var href = a.getAttribute('href').split('/').pop();
            if (href === pagina) {
                a.classList.add('nav-activo');
                a.setAttribute('aria-current', 'page');
            }
        });
    }

    function iniciarMenuHamburguesa() {
        var toggle = document.getElementById('menu-toggle');
        var nav = document.querySelector('nav');
        if (!toggle || !nav) return;

        toggle.addEventListener('click', function () {
            var abierto = nav.classList.toggle('nav-abierto');
            toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
            toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
        });

        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('nav-abierto');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    function iniciarAnimacionesScroll() {
        if (!window.IntersectionObserver) {
            document.querySelectorAll('.fade-in-up, .fade-in').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        document.querySelectorAll('.fade-in-up, .fade-in').forEach(function (el) {
            observer.observe(el);
        });
    }

    function iniciarContadorCaracteres() {
        var area = document.getElementById('mensaje');
        var contador = document.getElementById('msg-counter');
        if (!area || !contador) return;

        function actualizar() {
            var len = area.value.length;
            var max = parseInt(area.getAttribute('maxlength'), 10) || 500;
            contador.textContent = len + ' / ' + max;
            contador.classList.toggle('contador-limite', len >= Math.floor(max * 0.9));
        }

        area.addEventListener('input', actualizar);
        actualizar();
    }

    function iniciarVolverArriba() {
        var btn = document.getElementById('volver-arriba');
        if (!btn) return;

        window.addEventListener('scroll', function () {
            btn.classList.toggle('visible', window.scrollY > 400);
        }, { passive: true });

        btn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        marcarNavActivo();
        iniciarMenuHamburguesa();
        iniciarAnimacionesScroll();
        iniciarContadorCaracteres();
        iniciarVolverArriba();
    });
}());
