// ==========================================
// 1. AUDIO & CURTAIN CHOREOGRAPHY
// ==========================================
const audio = document.getElementById('bg-music');
const audioBtn = document.getElementById('audio-btn');
const iconSvg = document.querySelector('.music-icon');
let isPlaying = false;

function openCurtains() {
    // 1. Instantly part the curtains and trigger the parallax background zoom
    document.body.classList.add('curtains-open');
    
    // 2. Play the music
    audio.volume = 0.5;
    let playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise.then(_ => {
            isPlaying = true;
            iconSvg.classList.add('spin');
        }).catch(error => {
            console.log("Browser blocked autoplay. User must tap the music icon manually.");
        });
    }

    // 3. IMMEDIATELY trigger the first page's text reveal
    document.querySelectorAll('#section-opening .reveal').forEach(el => {
        el.classList.add('active');
    });

    // 4. Remove curtain container after animation completes
    setTimeout(() => {
        document.getElementById('curtain-container').style.display = 'none';
    }, 3000);
}

function toggleAudio() {
    if (isPlaying) {
        audio.pause();
        iconSvg.classList.remove('spin');
    } else {
        audio.play();
        iconSvg.classList.add('spin');
    }
    isPlaying = !isPlaying;
}

// ==========================================
// 2. SCROLL REVEAL & CINEMATIC EFFECTS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Setup High-End Scroll Reveal
    const observerOptions = {
        root: document.getElementById('main-scroll'),
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all sections EXCEPT the first one
    document.querySelectorAll('.scroll-section:not(#section-opening) .reveal').forEach(el => {
        observer.observe(el);
    });

    // B. Generate Cinematic Gold Bokeh Orbs
    const particleContainer = document.getElementById('particles-container');
    const particleCount = 20; 

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'bokeh-particle';
        
        let size = Math.random() * 60 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}vw`;
        
        let duration = Math.random() * 20 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        let delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;

        particleContainer.appendChild(particle);
    }
});

// ==========================================
// 3. VERTICAL DOT NAVIGATION LOGIC
// ==========================================
function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const scroller = document.getElementById('main-scroll');
    const sections = document.querySelectorAll('.scroll-section');
    const dots = document.querySelectorAll('.nav-dot');

    if (scroller) {
        scroller.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scroller.scrollTop >= (sectionTop - window.innerHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            dots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('onclick').includes(current)) {
                    dot.classList.add('active');
                }
            });
        });
    }
});