// assets/js/scripts.js

// Ensure code runs once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  /* 1. Typing effect for Hero Section */
  (function setupTypingEffect() {
    const greetingEl = document.getElementById('typed-greeting');
    const titleEl = document.getElementById('typed-title');
    const subtitle1El = document.getElementById('typed-subtitle1');
    const subtitle2El = document.getElementById('typed-subtitle2');
    const desc1El = document.getElementById('typed-desc1');
    const desc2El = document.getElementById('typed-desc2');

    if (!greetingEl || !titleEl) {
      // If hero elements aren't present, skip typing setup
      return;
    }

    // Create and append cursor span for title
    const cursorSpan = document.createElement('span');
    cursorSpan.id = 'cursor';
    cursorSpan.textContent = '|';
    titleEl.appendChild(cursorSpan);

    // Sequence: element, text, optional delay after typing before next
    const sequences = [
      { el: greetingEl, text: "Hello, I'm", delayAfter: 5 },
      { el: titleEl, text: "Marcus Ruhinga", delayAfter: 8 },
      { el: subtitle1El, text: "Computer Science Student at MSU |", delayAfter: 5 },
      { el: subtitle2El, text: "Software Developer | Networking & Cybersecurity Enthusiast", delayAfter: 5 },
      { el: desc1El, text: "I strive to build immersive and beautiful applications through carefully crafted", delayAfter: 5 },
      { el: desc2El, text: "code and user-centric design.", delayAfter: 0 }
    ];
    const typingSpeed = 100; // ms per character

    let seqIndex = 0;

    function typeSequence() {
      if (seqIndex >= sequences.length) return;
      const { el, text, delayAfter } = sequences[seqIndex];
      el.textContent = ''; // clear previous
      // Ensure no-wrap style if desired
      el.style.whiteSpace = 'nowrap';
      let charIndex = 0;
      function typeChar() {
        if (charIndex < text.length) {
          el.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          seqIndex++;
          // After finishing this line, wait a bit then type next
          setTimeout(typeSequence, typingSpeed * delayAfter);
        }
      }
      typeChar();
    }
    // Start typing
    typeSequence();

    // Re-trigger typing on page revisit via back/forward
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        seqIndex = 0;
        sequences.forEach(item => {
          if (item.el) item.el.textContent = '';
        });
        typeSequence();
      }
    });
  })();

  /* 2. Smooth scrolling for internal nav links */
  (function smoothScrollLinks() {
    const links = document.querySelectorAll('a.nav-link[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navbarOffset = 80; // adjust if navbar height differs
          const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
          window.scrollTo({
            top: topPos,
            behavior: 'smooth'
          });
        }
      });
    });
  })();

  /* 3. Active nav-link highlighting on scroll */
  (function navLinkHighlightOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function onScroll() {
      const scrollPos = window.scrollY + 90; // offset to detect current section
      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          const id = section.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  })();

  /* 4. Hero background slideshow with overlay */
  (function heroBackgroundSlideshow() {
    const heroBgEl = document.getElementById('heroBackground');
    if (!heroBgEl) return;

    const imagePaths = [
      'assets/images/bg2.jpg',
      'assets/images/bg3.jpg',
      'assets/images/bg4.jpg'
      // add/remove as needed
    ];
    let validImages = [];
    let currentIndex = 0;

    function preloadImages(paths, callback) {
      let loaded = 0;
      paths.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          validImages.push(src);
          checkDone();
        };
        img.onerror = checkDone;
      });
      function checkDone() {
        loaded++;
        if (loaded === paths.length) callback();
      }
    }

    function changeBackground() {
      if (validImages.length > 0) {
        heroBgEl.style.backgroundImage = `url('${validImages[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % validImages.length;
      }
    }

    preloadImages(imagePaths, () => {
      if (validImages.length > 0) {
        changeBackground(); // initial
        setInterval(changeBackground, 20000); // change every 20s
      } else {
        console.warn('No valid hero background images found.');
      }
    });
  })();

  /* 5. Animate-on-scroll using IntersectionObserver */
  (function animateOnScroll() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  })();

}); // end DOMContentLoaded

// Preload and start slideshow
preloadImages(allImages, () => {
  if (validImages.length > 0) {
    changeBackground(); // Set initial
    setInterval(changeBackground, 10000); 
  } else {
    console.warn('No valid background images found.');
  }
});
document.addEventListener('DOMContentLoaded', function() {

  const observerOptions = {
    root: null,          // viewport
    rootMargin: '0px',
    threshold: 0.1       // trigger when 10% of element is visible
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        obs.unobserve(entry.target); // animate only once
      }
    });
  }, observerOptions);

  // Observe all elements with class 'animate-on-scroll'
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('animate-on-scroll-left')) {
          entry.target.classList.add('animate-visible-left');
        }
        if (entry.target.classList.contains('animate-on-scroll-right')) {
          entry.target.classList.add('animate-visible-right');
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.animate-on-scroll-left, .animate-on-scroll-right').forEach(el => {
    observer.observe(el);
  });
});

// assets/js/scripts.js

// Ensure code runs once DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  /* 1. Typing effect for Hero Section */
  (function setupTypingEffect() {
    const greetingEl = document.getElementById('typed-greeting');
    const titleEl = document.getElementById('typed-title');
    const subtitle1El = document.getElementById('typed-subtitle1');
    const subtitle2El = document.getElementById('typed-subtitle2');
    const desc1El = document.getElementById('typed-desc1');
    const desc2El = document.getElementById('typed-desc2');

    if (!greetingEl || !titleEl) {
      // If hero elements aren't present, skip typing setup
      return;
    }

    // Create and append cursor span for title
    const cursorSpan = document.createElement('span');
    cursorSpan.id = 'cursor';
    cursorSpan.textContent = '|';
    titleEl.appendChild(cursorSpan);

    // Sequence: element, text, optional delay after typing before next
    const sequences = [
      { el: greetingEl, text: "Hello, I'm", delayAfter: 5 },
      { el: titleEl, text: "Marcus Ruhinga", delayAfter: 8 },
      { el: subtitle1El, text: "Computer Science Student at MSU |", delayAfter: 5 },
      { el: subtitle2El, text: "Software Developer | Networking & Cybersecurity Enthusiast", delayAfter: 5 },
      { el: desc1El, text: "I strive to build immersive and beautiful applications through carefully crafted", delayAfter: 5 },
      { el: desc2El, text: "code and user-centric design.", delayAfter: 0 }
    ];
    const typingSpeed = 100; // ms per character

    let seqIndex = 0;

    function typeSequence() {
      if (seqIndex >= sequences.length) return;
      const { el, text, delayAfter } = sequences[seqIndex];
      el.textContent = ''; // clear previous
      // Ensure no-wrap style if desired
      el.style.whiteSpace = 'nowrap';
      let charIndex = 0;
      function typeChar() {
        if (charIndex < text.length) {
          el.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          seqIndex++;
          // After finishing this line, wait a bit then type next
          setTimeout(typeSequence, typingSpeed * delayAfter);
        }
      }
      typeChar();
    }
    // Start typing
    typeSequence();

    // Re-trigger typing on page revisit via back/forward
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        seqIndex = 0;
        sequences.forEach(item => {
          if (item.el) item.el.textContent = '';
        });
        typeSequence();
      }
    });
  })();

  /* 2. Smooth scrolling for internal nav links */
  (function smoothScrollLinks() {
    const links = document.querySelectorAll('a.nav-link[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navbarOffset = 80; // adjust if navbar height differs
          const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
          window.scrollTo({
            top: topPos,
            behavior: 'smooth'
          });
        }
      });
    });
  })();

  /* 3. Active nav-link highlighting on scroll */
  (function navLinkHighlightOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function onScroll() {
      const scrollPos = window.scrollY + 90; // offset to detect current section
      sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          const id = section.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
  })();

  /* 4. Hero background slideshow with overlay */
  (function heroBackgroundSlideshow() {
    const heroBgEl = document.getElementById('heroBackground');
    if (!heroBgEl) return;

    const imagePaths = [
      'assets/images/bg2.jpg',
      'assets/images/bg3.jpg',
      'assets/images/bg4.jpg'
      // add/remove as needed
    ];
    let validImages = [];
    let currentIndex = 0;

    function preloadImages(paths, callback) {
      let loaded = 0;
      paths.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          validImages.push(src);
          checkDone();
        };
        img.onerror = checkDone;
      });
      function checkDone() {
        loaded++;
        if (loaded === paths.length) callback();
      }
    }

    function changeBackground() {
      if (validImages.length > 0) {
        heroBgEl.style.backgroundImage = `url('${validImages[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % validImages.length;
      }
    }

    preloadImages(imagePaths, () => {
      if (validImages.length > 0) {
        changeBackground(); // initial
        setInterval(changeBackground, 20000); // change every 20s
      } else {
        console.warn('No valid hero background images found.');
      }
    });
  })();

  /* 5. Animate-on-scroll using IntersectionObserver */
  (function animateOnScroll() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  })();

}); // end DOMContentLoaded

/* 1. Typing effect for Hero Section */
function setupTypingEffect() {
  const greetingEl = document.getElementById('typed-greeting');
  const titleEl = document.getElementById('typed-title');
  const subtitle1El = document.getElementById('typed-subtitle1');
  const subtitle2El = document.getElementById('typed-subtitle2');
  const desc1El = document.getElementById('typed-desc1');
  const desc2El = document.getElementById('typed-desc2');

  if (!greetingEl || !titleEl) return;

  const cursorSpan = document.createElement('span');
  cursorSpan.id = 'cursor';
  cursorSpan.textContent = '|';
  titleEl.appendChild(cursorSpan);

  const sequences = [
    { el: greetingEl, text: "Hello, I'm", delayAfter: 5 },
    { el: titleEl, text: "Marcus Ruhinga", delayAfter: 8 },
    { el: subtitle1El, text: "Computer Science Student at MSU |", delayAfter: 5 },
    { el: subtitle2El, text: "Software Developer | Networking & Cybersecurity Enthusiast", delayAfter: 5 },
    { el: desc1El, text: "I strive to build immersive and beautiful applications through carefully crafted", delayAfter: 5 },
    { el: desc2El, text: "code and user-centric design.", delayAfter: 0 }
  ];
  const typingSpeed = 100;

  let seqIndex = 0;

  function typeSequence() {
    if (seqIndex >= sequences.length) return;
    const { el, text, delayAfter } = sequences[seqIndex];
    el.textContent = '';
    el.style.whiteSpace = 'nowrap';
    let charIndex = 0;
    
    function typeChar() {
      if (charIndex < text.length) {
        el.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeChar, typingSpeed);
      } else {
        seqIndex++;
        setTimeout(typeSequence, typingSpeed * delayAfter);
      }
    }
    typeChar();
  }
  
  typeSequence();

  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      seqIndex = 0;
      sequences.forEach(item => {
        if (item.el) item.el.textContent = '';
      });
      typeSequence();
    }
  });
}

/* 2. Smooth scrolling for internal nav links */
function smoothScrollLinks() {
  const links = document.querySelectorAll('a.nav-link[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const navbarOffset = 80;
        const topPos = targetEl.getBoundingClientRect().top + window.scrollY - navbarOffset;
        window.scrollTo({
          top: topPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* 3. Active nav-link highlighting on scroll */
function navLinkHighlightOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function onScroll() {
    const scrollPos = window.scrollY + 90;
    sections.forEach(section => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
}

/* 4. Hero background slideshow with overlay */
function heroBackgroundSlideshow() {
  const heroBgEl = document.getElementById('heroBackground');
  if (!heroBgEl) return;

  const imagePaths = [
    'assets/images/bg2.jpg',
    'assets/images/bg3.jpg',
    'assets/images/bg4.jpg'
  ];
  let validImages = [];
  let currentIndex = 0;

  function preloadImages(paths, callback) {
    let loaded = 0;
    paths.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        validImages.push(src);
        checkDone();
      };
      img.onerror = checkDone;
    });
    function checkDone() {
      loaded++;
      if (loaded === paths.length) callback();
    }
  }

  function changeBackground() {
    if (validImages.length > 0) {
      heroBgEl.style.backgroundImage = `url('${validImages[currentIndex]}')`;
      currentIndex = (currentIndex + 1) % validImages.length;
    }
  }

  preloadImages(imagePaths, () => {
    if (validImages.length > 0) {
      changeBackground();
      setInterval(changeBackground, 20000);
    } else {
      console.warn('No valid hero background images found.');
    }
  });
}

/* 5. Animate-on-scroll using IntersectionObserver */
function animateOnScroll() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('animate-on-scroll')) {
          entry.target.classList.add('animate-visible');
        }
        if (entry.target.classList.contains('animate-on-scroll-left')) {
          entry.target.classList.add('animate-visible-left');
        }
        if (entry.target.classList.contains('animate-on-scroll-right')) {
          entry.target.classList.add('animate-visible-right');
        }
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right').forEach(el => {
    observer.observe(el);
  });
}
// assets/js/scripts.js

document.addEventListener('DOMContentLoaded', function () {
  /* Typing effect (existing code stays unchanged)... */

  // === Fly-in animation for Skills Section ===
  const skillCards = document.querySelectorAll('#skills .card');

  const observerOptions = {
    threshold: 0.2
  };

  const flyInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fly-in');
      } else {
        entry.target.classList.remove('fly-in'); // ensures animation on scroll back
      }
    });
  }, observerOptions);

  skillCards.forEach(card => {
    card.classList.add('fly-in-init'); // initial hidden state
    flyInObserver.observe(card);
  });
});
// Projects Section Animation
function initProjectsAnimation() {
  // Animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right').forEach(el => {
    observer.observe(el);
  });
  
  // Image hover effect
  document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
    });
    img.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initProjectsAnimation();
});
// Projects Section Animation and Interactions
function initProjectsSection() {
  // Animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll, .animate-on-scroll-left, .animate-on-scroll-right').forEach(el => {
    observer.observe(el);
  });
  
  // Image hover effect
  document.querySelectorAll('.project-img').forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.03)';
    });
    img.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initProjectsSection();
});