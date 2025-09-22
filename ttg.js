// ===== Initialize AOS =====
AOS.init({
  once: false,
  duration: 700,
  easing: 'ease-out-cubic',
  anchorPlacement: 'top-bottom'
});

  // Handle Play/Pause toggle for all video cards
  document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");
    const button = card.querySelector(".video-btn");

    button.addEventListener("click", () => {
      if (video.paused) {
        video.play();
        button.textContent = "⏸"; // Pause symbol
      } else {
        video.pause();
        button.textContent = "▶"; // Play symbol
      }
    });
  });

// ===== Custom cursor =====
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(0.7)';
  cursor.style.opacity = '0.9';
});
document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%,-50%) scale(1)';
});

// Enlarge cursor over interactive elements
document.querySelectorAll('a, button, input, textarea, label').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

// ===== CTA scroll to About on click =====
document.getElementById('cta-check').addEventListener('click', () => {
  document.querySelector('#about').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ===== Typewriter effect =====
const words = [
  "The Tech Gee 💻",
  "A Creative Web Developer",
  "A Ui/UX designer",
  "A Product Designer"
];

const typeEl = document.getElementById('type-text');
const TYPING_SPEED = 60;
const DELETING_SPEED = 40;
const PAUSE_AFTER = 1000;

let wordIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const current = words[wordIndex];
  if (typing) {
    charIndex++;
    typeEl.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, PAUSE_AFTER);
    } else {
      setTimeout(typeLoop, TYPING_SPEED + Math.random() * 40);
    }
  } else {
    charIndex--;
    typeEl.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeLoop, 250);
    } else {
      setTimeout(typeLoop, DELETING_SPEED + Math.random() * 30);
    }
  }
}
typeLoop();

// ===== Handle CV button differently for mobile =====
const cvBtn = document.getElementById("cv-btn");

if (cvBtn) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Force download on mobile
    cvBtn.removeAttribute("target");  // no new tab
    cvBtn.setAttribute("download", "Bello_Abdullahi_Olalekan_CV.pdf");
    cvBtn.textContent = "Download My CV"; // optional text change
  } else {
    // Desktop keeps preview mode
    cvBtn.setAttribute("target", "_blank");
    cvBtn.removeAttribute("download");
  }
}


// ===== Toggle Resume Preview =====
const resumeBtn = document.getElementById("resume-toggle-btn");
const resumePreview = document.getElementById("resume-preview-box");

if (resumeBtn && resumePreview) {
  resumeBtn.addEventListener("click", () => {
    if (resumePreview.style.display === "none") {
      resumePreview.style.display = "block";
      resumeBtn.textContent = "Hide My Resume";
    } else {
      resumePreview.style.display = "none";
      resumeBtn.textContent = "Show My Resume";
    }
  });
}



// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Small accessibility tweak: keyboard focus visible =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('show-focus');
  }
})

