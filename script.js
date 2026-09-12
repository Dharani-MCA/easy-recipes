document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const smoothAnchors = document.querySelectorAll('a[href^="#"]');
  smoothAnchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    };

    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop);

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const successMessage = document.querySelector(".form-success");

      const nameError = document.getElementById("nameError");
      const emailError = document.getElementById("emailError");
      const messageError = document.getElementById("messageError");

      let valid = true;

      if (!name || !email || !message || !successMessage) return;

      if (name.value.trim() === "") {
        nameError.textContent = "Please enter your name.";
        valid = false;
      } else {
        nameError.textContent = "";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
      } else {
        emailError.textContent = "";
      }

      if (message.value.trim().length < 10) {
        messageError.textContent = "Please write at least 10 characters.";
        valid = false;
      } else {
        messageError.textContent = "";
      }

      if (valid) {
        successMessage.textContent = "Thank you! Your message has been sent successfully.";
        contactForm.reset();
      } else {
        successMessage.textContent = "";
      }
    });
  }

  const recipeCards = document.querySelectorAll(".recipe-detail-card");
  const searchInput = document.getElementById("recipe-search");
  const filterButtons = document.querySelectorAll(".filter-btn");
  let activeFilter = "all";

  const applyRecipeFilters = () => {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";

    recipeCards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const category = card.dataset.category;
      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesQuery = !query || name.includes(query);
      const shouldShow = matchesFilter && matchesQuery;

      card.classList.toggle("hidden-card", !shouldShow);
    });
  };

  if (searchInput) {
    searchInput.addEventListener("input", applyRecipeFilters);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      applyRecipeFilters();
    });
  });

  document.querySelectorAll(".view-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".recipe-detail-card");
      if (!card) return;

      card.classList.toggle("expanded");
      const isExpanded = card.classList.contains("expanded");
      button.textContent = isExpanded ? "Hide Recipe" : "View Recipe";

      if (isExpanded) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  document.querySelectorAll(".read-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".recipe-detail-card");
      if (!card) return;

      const procedureFull = card.querySelector(".procedure-full");
      const procedureShort = card.querySelector(".procedure-short");

      if (!procedureFull || !procedureShort) return;

      const isHidden = procedureFull.classList.toggle("hidden");
      procedureShort.style.display = isHidden ? "block" : "none";
      button.textContent = isHidden ? "Read More" : "Read Less";
    });
  });

  const recipeHash = window.location.hash.replace("#", "");
  if (recipeHash) {
    const targetCard = document.getElementById(recipeHash);
    if (targetCard) {
      targetCard.classList.add("expanded");
      targetCard.querySelector(".view-recipe-btn")?.click();
    }
  }
});
