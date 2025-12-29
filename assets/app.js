// Original Fitness – simple UI helpers (modal + mobile menu + active nav)
(function () {
  const byId = (id) => document.getElementById(id);

  const modalBackdrop = byId("joinModal");
  const openBtns = document.querySelectorAll("[data-open-join]");
  const closeBtns = document.querySelectorAll("[data-close-join]");

  function openModal() {
    if (!modalBackdrop) return;
    modalBackdrop.style.display = "grid";
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.style.display = "none";
    document.body.style.overflow = "";
  }

  openBtns.forEach((b) => b.addEventListener("click", openModal));
  closeBtns.forEach((b) => b.addEventListener("click", closeModal));
  modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // Mobile drawer
  const drawer = byId("drawer");
  const burger = byId("burger");
  const drawerClose = byId("drawerClose");

  function openDrawer(){ drawer?.classList.add("open"); }
  function closeDrawer(){ drawer?.classList.remove("open"); }

  burger?.addEventListener("click", openDrawer);
  drawerClose?.addEventListener("click", closeDrawer);
  drawer?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

  // Fake form submission
  const form = byId("joinForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = byId("joinMsg");
    if (msg) {
      msg.textContent = "Thanks! Your request was sent. We will contact you shortly.";
    }
    form.reset();
    setTimeout(() => closeModal(), 900);
  });

  // Highlight active nav (based on current file)
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a, .drawer a").forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
})();
