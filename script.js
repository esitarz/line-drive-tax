// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wrap section contents in a div for animation
  document.querySelectorAll("section").forEach((section) => {
    const contents = Array.from(section.children);
    const wrapper = document.createElement("div");
    wrapper.classList.add("section-content");
    contents.forEach((child) => wrapper.appendChild(child));
    section.appendChild(wrapper);
  });

  // Animate hero section content immediately
  gsap.from(".hero .section-content", {
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  // Animate other sections content on scroll
  document.querySelectorAll("section:not(.hero)").forEach((section) => {
    gsap.from(section.querySelector(".section-content"), {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
      y: 50,
      duration: 1,
      ease: "power2.out",
    });
  });

  // Handle navigation including logo
  document.querySelectorAll("header nav a, .logo").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      if (!link.classList.contains("logo")) {
        document
          .querySelectorAll("header nav a")
          .forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }

      const target = link.classList.contains("logo")
        ? document.querySelector(".hero")
        : document.querySelector(link.getAttribute("href"));

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    });
  });

  // Update active nav link on scroll
  gsap.utils.toArray("section").forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: (self) => {
        if (self.isActive) {
          const id = section.getAttribute("id");
          document.querySelectorAll("header nav a").forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      },
    });
  });
});

document.querySelector(".logo").addEventListener("click", (e) => {
  e.preventDefault();

  // Scroll to the hero section
  const target = document.querySelector(".hero");
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: target, offsetY: 0 },
    ease: "power2.inOut",
  });

  // Clear the hash from the URL
  history.pushState("", document.title, window.location.pathname);
});

