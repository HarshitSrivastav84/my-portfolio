const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const progressBar = document.getElementById("progressBar");
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");
const reveals = document.querySelectorAll(".reveal");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const detailsButtons = document.querySelectorAll(".details-btn");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const skillFills = document.querySelectorAll(".skill-fill");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const typing = document.getElementById("typing");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "🌙";
});

const text = [
  "A BTech student passionate about web development.",
  "I build simple and responsive websites.",
  "I enjoy Java, JavaScript, and problem solving."
];
let line = 0;
let char = 0;
let deleting = false;

function typeEffect() {
  const current = text[line];
  if (!deleting) {
    typing.textContent = current.substring(0, char++);
    if (char > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    typing.textContent = current.substring(0, char--);
    if (char < 0) {
      deleting = false;
      line = (line + 1) % text.length;
    }
  }
  setTimeout(typeEffect, deleting ? 40 : 80);
}
typeEffect();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

detailsButtons.forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalDesc.textContent = button.dataset.desc;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    tabContents.forEach(content => content.classList.remove("active"));
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

function animateSkills() {
  skillFills.forEach(fill => {
    const rect = fill.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      fill.style.width = fill.dataset.width;
    }
  });
}

function revealSections() {
  reveals.forEach(item => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      item.classList.add("show");
    }
  });
}

function updateNav() {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    const height = section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

function updateProgressBar() {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", () => {
  revealSections();
  animateSkills();
  updateNav();
  updateProgressBar();
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill all fields.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";
  form.reset();
});

revealSections();
animateSkills();
updateNav();
updateProgressBar();h