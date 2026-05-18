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
});
