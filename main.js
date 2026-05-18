// -------------------------------------------------------------
// 1. LOADER & INITIAL MORPH ANIMATION (Scissor -> Tire)
// -------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    const scissor = document.getElementById('loader-scissor');
    const tire = document.getElementById('loader-tire');
    const loader = document.getElementById('loader');
    const body = document.getElementById('body');
    
    // Create timeline for the Scissor -> Tire morph animation
    const tlLoader = gsap.timeline({
        onComplete: () => {
            gsap.to(loader, { opacity: 0, duration: 1, ease: "power2.inOut", onComplete: () => loader.remove() });
            body.style.opacity = '1';
            initHeroAnimations();
        }
    });

    // Animate Scissor cutting/rotating
    tlLoader.to(scissor, {
        rotation: 360,
        scale: 0.5,
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut"
    }, "+=0.5")
    // Animate Tire fading in and spinning
    .to(tire, {
        scale: 1,
        opacity: 1,
        rotation: 720,
        duration: 1.5,
        ease: "power3.out"
    }, "-=0.8")
    .to(tire, {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in"
    });
});

// -------------------------------------------------------------
// 2. THREE.JS HERO SECTION (Abstract Luxury Automotive Core)
// -------------------------------------------------------------
let scene, camera, renderer, particles, mesh;
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

function initThree() {
    const container = document.getElementById('canvas-container');
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Abstract "Engine/Precision" Object
    const geometry = new THREE.TorusKnotGeometry(10, 2.5, 256, 32, 2, 3);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 1,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 2.0,
    });
    
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Particle System (Stars/Streaks)
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 2000;
    const posArray = new Float32Array(particleCount * 3);
    
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xd4af37, // SA Gold
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd4af37, 500, 100);
    pointLight1.position.set(15, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe0e0e0, 300, 100);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    animateThree();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
}

function animateThree() {
    requestAnimationFrame(animateThree);

    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    mesh.rotation.y += 0.005;
    mesh.rotation.x += 0.002;
    
    mesh.rotation.y += 0.05 * (targetX - mesh.rotation.y);
    mesh.rotation.x += 0.05 * (targetY - mesh.rotation.x);

    particles.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// -------------------------------------------------------------
// 3. GSAP ANIMATIONS & SCROLLTRIGGERS
// -------------------------------------------------------------
function initHeroAnimations() {
    // Reveal Hero Content
    gsap.to(".hero-text", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
    gsap.to(".hero-sub", { opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: "power4.out" });
    gsap.to(".hero-btn", { opacity: 1, y: 0, duration: 1.5, delay: 0.6, ease: "power4.out" });
    gsap.to(".hero-scroll", { opacity: 1, duration: 1.5, delay: 1, ease: "power2.out" });

    // Scroll line animation
    gsap.to(".scroll-line", {
        y: "100%",
        repeat: -1,
        duration: 2,
        ease: "power2.inOut"
    });

    // Initialize ScrollTriggers
    gsap.registerPlugin(ScrollTrigger);

    // Reveal Text elements
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.fromTo(text, 
            { opacity: 0, y: 30 },
            { 
                scrollTrigger: {
                    trigger: text,
                    start: "top 85%",
                },
                opacity: 1, 
                y: 0, 
                duration: 1, 
                ease: "power3.out" 
            }
        );
    });

    // Collection Items Staggered
    gsap.fromTo('.collection-item', 
        { opacity: 0, y: 50 },
        {
            scrollTrigger: {
                trigger: '#collection',
                start: "top 75%"
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out"
        }
    );

    // Image Parallax / Reveal
    gsap.utils.toArray('.reveal-image').forEach(img => {
        gsap.fromTo(img.querySelector('img'),
            { scale: 1.2 },
            {
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    end: "bottom top",
                    scrub: 1
                },
                scale: 1,
                ease: "none"
            }
        );
    });

    // Parallax on ThreeJS elements using ScrollTrigger
    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
            if(mesh) {
                mesh.position.y = self.progress * 5;
            }
        }
    });

    initThree();
}

// -------------------------------------------------------------
// 4. AUDIO TOGGLE (Synthesized Precision Engine Sound)
// -------------------------------------------------------------
class EngineSynth {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.nodes = [];
        this.isPlaying = false;
    }
    init() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0;
        this.masterGain.connect(this.ctx.destination);
    }
    start() {
        if(!this.ctx) this.init();
        if(this.ctx.state === 'suspended') this.ctx.resume();
        if(this.isPlaying) return;
        this.isPlaying = true;
        
        const osc1 = this.ctx.createOscillator();
        osc1.type = 'sawtooth';
        osc1.frequency.value = 45; // Deep V12 rumble

        const osc2 = this.ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = 90;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 120; // Muffler

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 12; // Rev modulation
        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 40;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(this.masterGain);

        osc1.start();
        osc2.start();
        lfo.start();

        this.nodes = [osc1, osc2, lfo, filter, lfoGain];
        
        // Smooth fade in
        gsap.to(this.masterGain.gain, { value: 0.3, duration: 2, ease: "power2.inOut" });
    }
    stop() {
        if(!this.isPlaying) return;
        this.isPlaying = false;
        // Smooth fade out
        gsap.to(this.masterGain.gain, { 
            value: 0, 
            duration: 1.5, 
            ease: "power2.inOut",
            onComplete: () => {
                this.nodes.forEach(n => {
                    if(n.stop) n.stop();
                    n.disconnect();
                });
                this.nodes = [];
            }
        });
    }
}

const soundToggle = document.getElementById('sound-toggle');
const engineSynth = new EngineSynth();
let isSoundOn = false;

if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        isSoundOn = !isSoundOn;
        if(isSoundOn) {
            engineSynth.start();
            soundToggle.textContent = 'Sound: On';
            soundToggle.classList.add('bg-sa-silver', 'text-sa-black');
            soundToggle.classList.remove('bg-transparent', 'text-sa-silver');
        } else {
            engineSynth.stop();
            soundToggle.textContent = 'Sound: Off';
            soundToggle.classList.remove('bg-sa-silver', 'text-sa-black');
            soundToggle.classList.add('bg-transparent', 'text-sa-silver');
        }
    });
}
