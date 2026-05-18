// transition.js
document.addEventListener("DOMContentLoaded", () => {
    const body = document.getElementById('body');
    // For pages without the loader, ensure they fade in
    if(body && !document.getElementById('loader')) {
        gsap.to(body, { opacity: 1, duration: 1, ease: "power2.inOut" });
    }

    // Intercept internal links for smooth transitions
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            
            // Ignore anchor links, external links, empty links
            if (!target || target.startsWith('#') || target.startsWith('http') || target.startsWith('mailto')) return;

            e.preventDefault();
            
            gsap.to(body, {
                opacity: 0,
                y: 10,
                duration: 0.6,
                ease: "power2.inOut",
                onComplete: () => {
                    window.location.href = target;
                }
            });
        });
    });

    // -------------------------------------------------------------
    // MOBILE MENU TOGGLE
    // -------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        let menuOpen = false;
        mobileMenuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
                mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
                // Change hamburger to cross
                mobileMenuBtn.innerHTML = `
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                `;
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                // Change cross to hamburger
                mobileMenuBtn.innerHTML = `
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileMenu.classList.add('opacity-0', 'pointer-events-none');
                mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
                mobileMenuBtn.innerHTML = `
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                `;
                document.body.style.overflow = '';
            });
        });
    }
});
