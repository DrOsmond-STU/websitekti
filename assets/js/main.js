(function () {
  "use strict";

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 24) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");

    const backToTop = document.getElementById("backToTop");
    if (backToTop) {
      if (window.scrollY > 600) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    }
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile drawer ---------- */
  const navToggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  if (navToggle && drawer) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      drawer.classList.toggle("open");
    });
    drawer.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navToggle.classList.remove("open");
        drawer.classList.remove("open");
      })
    );
  }

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const setActiveLink = () => {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  };
  document.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Hero slider ---------- */
  const slides = Array.from(document.querySelectorAll(".hero-slide"));
  const dots = Array.from(document.querySelectorAll(".hero-dot"));
  let current = 0;
  let timer = null;
  const AUTO_MS = 6500;

  function goTo(index) {
    slides[current]?.classList.remove("active");
    dots[current]?.classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current]?.classList.add("active");
    dots[current]?.classList.add("active");
  }
  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }
  function startAuto() {
    stopAuto();
    timer = setInterval(next, AUTO_MS);
  }
  function stopAuto() {
    if (timer) clearInterval(timer);
  }

  if (slides.length) {
    document.getElementById("heroNext")?.addEventListener("click", () => { next(); startAuto(); });
    document.getElementById("heroPrev")?.addEventListener("click", () => { prev(); startAuto(); });
    dots.forEach((dot, i) =>
      dot.addEventListener("click", () => { goTo(i); startAuto(); })
    );
    const heroEl = document.querySelector(".hero");
    heroEl?.addEventListener("mouseenter", stopAuto);
    heroEl?.addEventListener("mouseleave", startAuto);
    startAuto();
  }

  /* ---------- Client tabs ---------- */
  const tabs = document.querySelectorAll(".client-tab");
  const panels = document.querySelectorAll(".client-panel");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      panels.forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById("tab-" + tab.dataset.tab)?.classList.add("active");
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }
  // Safety net: never leave content permanently invisible if the
  // observer misses an element for any reason.
  window.setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("in-view"));
  }, 4000);

  /* ---------- Stat counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + "+";
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const cIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            cIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => cIo.observe(c));
  }

  /* ---------- Back to top ---------- */
  document.getElementById("backToTop")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Contact form (mailto handoff) ---------- */
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "";
    const company = data.get("company") || "";
    const email = data.get("email") || "";
    const phone = data.get("phone") || "";
    const service = data.get("service") || "";
    const message = data.get("message") || "";

    const subject = `Permintaan Informasi Layanan — ${service}`;
    const body =
      `Nama: ${name}\n` +
      `Instansi/Perusahaan: ${company}\n` +
      `Email: ${email}\n` +
      `No. Telepon: ${phone}\n` +
      `Layanan: ${service}\n\n` +
      `Pesan:\n${message}`;

    const mailto = `mailto:info@kitateknologi.co.id?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    success?.classList.add("show");
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
