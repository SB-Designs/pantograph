/*
  PANTOGRAPH SITE CONFIG
  ----------------------
  Add your image URLs and links here.

  - LOGO_URL: your logo image URL
  - HERO_IMAGE_URL: your train/hero background image URL
  - PROJECTS: image + link + title + description
  - COMPANIES / CONTACTS: link destinations
*/

const SITE_CONFIG = {
  LOGO_URL: "", // e.g. "https://example.com/logo.png"
  HERO_IMAGE_URL: "", // e.g. "https://example.com/train.jpg"

  PROJECTS: [
    { image: "", title: "Project One", description: "Short description of the project and what makes it interesting.", url: "#" },
    { image: "", title: "Project Two", description: "Short description of the project and what makes it interesting.", url: "#" },
    { image: "", title: "Project Three", description: "Short description of the project and what makes it interesting.", url: "#" },
    { image: "", title: "Project Four", description: "Short description of the project and what makes it interesting.", url: "#" },
    { image: "", title: "Project Five", description: "Short description of the project and what makes it interesting.", url: "#" },
    { image: "", title: "Project Six", description: "Short description of the project and what makes it interesting.", url: "#" }
  ],

  COMPANIES: [
    { title: "Project<br>Transport", description: "A joint venture with Aramid and Lev568.", url: "#" },
    { title: "HeadQR", description: "Partner and developer of HeadQR.", url: "#" },
    { title: "Zenity", description: "Partner and developer of Zenity.", url: "#" }
  ],

  CONTACTS: {
    email: "mailto:hello@pantograph.uk",
    socials: "#",
    status: "#"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Apply logo to both header/footer.
  if (SITE_CONFIG.LOGO_URL) {
    ["logoImage", "footerLogoImage"].forEach(id => {
      const img = document.getElementById(id);
      img.src = SITE_CONFIG.LOGO_URL;
      img.hidden = false;
    });
    document.getElementById("logoFallback").hidden = true;
    document.getElementById("footerLogoFallback").hidden = true;
  }

  // Apply hero background image.
  if (SITE_CONFIG.HERO_IMAGE_URL) {
    document.documentElement.style.setProperty(
      "--hero-image",
      `url("${SITE_CONFIG.HERO_IMAGE_URL.replaceAll('"', '\\"')}")`
    );
  }

  // Render project data from config.
  document.querySelectorAll(".project-card").forEach((card, i) => {
    const item = SITE_CONFIG.PROJECTS[i];
    if (!item) return;

    card.href = item.url || "#";
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p").textContent = item.description;

    const imageBox = card.querySelector(".project-image");
    if (item.image) {
      imageBox.classList.remove("placeholder");
      imageBox.textContent = "";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "";
      img.loading = "lazy";
      imageBox.appendChild(img);
    }
  });

  // Render company links/content.
  document.querySelectorAll("#companies .small-card").forEach((card, i) => {
    const item = SITE_CONFIG.COMPANIES[i];
    if (!item) return;
    card.href = item.url || "#";
    card.querySelector("h3").innerHTML = item.title;
    card.querySelector("p").textContent = item.description;
  });

  // Contact links.
  const contactCards = document.querySelectorAll("#find-us .small-card");
  if (contactCards[0]) contactCards[0].href = SITE_CONFIG.CONTACTS.email;
  if (contactCards[1]) contactCards[1].href = SITE_CONFIG.CONTACTS.socials;
  if (contactCards[2]) contactCards[2].href = SITE_CONFIG.CONTACTS.status;

  // Scroll reveal.
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Tiny timeline motion based on scroll.
  const timeline = document.querySelector(".timeline");
  const updateTimeline = () => {
    const rect = timeline.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (viewport * .7 - rect.top) / (rect.height * .72)));
    timeline.style.setProperty("--timeline-progress", progress.toFixed(3));
  };

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateTimeline();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateTimeline();
});
