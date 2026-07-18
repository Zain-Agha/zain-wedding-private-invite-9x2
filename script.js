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
    
    // 2. Play the music (points to your assets/music.mp3)
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

    // 3. IMMEDIATELY trigger the first page's text reveal. 
    // Because the text sits *behind* the curtains, it will rise elegantly 
    // exactly as the curtains expose it. Zero blanks, zero flashes.
    document.querySelectorAll('#section-opening .reveal').forEach(el => {
        el.classList.add('active');
    });

    // 4. Clean up the curtain DOM element so it doesn't block scrolling/clicks.
    // Set to 3000ms (3s) to ensure the 2.5s CSS animation finishes completely first.
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
    
    // A. Setup High-End Scroll Reveal for Sections 2 through 5
    const observerOptions = {
        root: document.getElementById('main-scroll'),
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all sections EXCEPT the first one (since first section is triggered by curtains)
    document.querySelectorAll('.scroll-section:not(#section-opening) .reveal').forEach(el => {
        observer.observe(el);
    });

    // B. Generate Cinematic Gold Bokeh Orbs
    const particleContainer = document.getElementById('particles-container');
    const particleCount = 20; // Kept lower for a clean, non-cluttered look

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.className = 'bokeh-particle';
        
        // Randomize sizes to be large and soft (between 30px and 90px)
        let size = Math.random() * 60 + 30;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Randomize horizontal starting position
        particle.style.left = `${Math.random() * 100}vw`;
        
        // Randomize float duration (Very slow and dreamy: 15 to 35 seconds)
        let duration = Math.random() * 20 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Randomize delay so they fade in continuously
        let delay = Math.random() * 20;
        particle.style.animationDelay = `${delay}s`;

        particleContainer.appendChild(particle);
    }
});