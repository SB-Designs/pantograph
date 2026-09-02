/*
  PANTOGRAPH CONFIG
  Edit only this object to add your own image URLs and links.
*/
const SITE_CONFIG = {
  LOGO_URL: "",
  HERO_IMAGE_URL: "",

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
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!location.hash) window.scrollTo(0, 0);
  if (SITE_CONFIG.LOGO_URL) {
    ["logoImage", "footerLogoImage"].forEach(id => {
      const img = document.getElementById(id);
      img.src = SITE_CONFIG.LOGO_URL;
      img.hidden = false;
    });
    document.getElementById("logoFallback").hidden = true;
    document.getElementById("footerLogoFallback").hidden = true;
  }

  if (SITE_CONFIG.HERO_IMAGE_URL) {
    document.documentElement.style.setProperty(
      "--hero-image",
      `url("${SITE_CONFIG.HERO_IMAGE_URL.replaceAll('"', '\\"')}")`
    );
  }

  document.querySelectorAll(".project-card").forEach((card, i) => {
    const item = SITE_CONFIG.PROJECTS[i];
    if (!item) return;
    card.href = item.url || "#";
    card.querySelector("h3").textContent = item.title;
    card.querySelector("p").textContent = item.description;

    const box = card.querySelector(".project-image");
    if (item.image) {
      box.classList.remove("placeholder");
      box.textContent = "";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = "";
      img.loading = "lazy";
      box.appendChild(img);
    }
  });

  document.querySelectorAll("#companies .small-card").forEach((card, i) => {
    const item = SITE_CONFIG.COMPANIES[i];
    if (!item) return;
    card.href = item.url || "#";
    card.querySelector("h3").innerHTML = item.title;
    card.querySelector("p").textContent = item.description;
  });

  const contactCards = document.querySelectorAll("#find-us .small-card");
  if (contactCards[0]) contactCards[0].href = SITE_CONFIG.CONTACTS.email;
  if (contactCards[1]) contactCards[1].href = SITE_CONFIG.CONTACTS.socials;
  if (contactCards[2]) contactCards[2].href = SITE_CONFIG.CONTACTS.status;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px" });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
});
