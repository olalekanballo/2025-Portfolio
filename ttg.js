// ===== Initialize AOS =====
if (window.AOS) {
  window.AOS.init({
    once: false,
    duration: 700,
    easing: 'ease-out-cubic',
    anchorPlacement: 'top-bottom'
  });
}

// Load videos shortly before they enter the viewport.
const videos = document.querySelectorAll("video");
const loadVideo = (video) => {
  const sources = video.querySelectorAll("source[data-src]");

  sources.forEach((source) => {
    source.src = source.dataset.src;
    delete source.dataset.src;
  });

  if (sources.length) {
    video.load();
  }
};

if ("IntersectionObserver" in window) {
  const videoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadVideo(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "1000px 0px" }
  );

  videos.forEach((video) => videoObserver.observe(video));
} else {
  videos.forEach(loadVideo);
}

  // Handle Play/Pause toggle for all video cards
  document.querySelectorAll(".video-card").forEach(card => {
    const video = card.querySelector("video");
    const button = card.querySelector(".video-btn");

    button.addEventListener("click", () => {
      if (video.paused) {
        loadVideo(video);
        video.play().catch((error) => {
          if (error.name !== "AbortError") {
            console.error("Unable to play project video.", error);
          }
        });
      } else {
        video.pause();
      }
    });

    video.addEventListener("play", () => {
      button.textContent = "⏸";
    });
    video.addEventListener("pause", () => {
      button.textContent = "▶";
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

// ===== Toggle Resume Preview =====
const resumeBtn = document.getElementById("resume-toggle-btn");
const resumePreview = document.getElementById("resume-preview-box");

if (resumeBtn && resumePreview) {
  resumeBtn.addEventListener("click", () => {
    if (resumePreview.style.display === "none") {
      resumePreview.style.display = "flex";
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
