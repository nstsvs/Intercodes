const services = document.querySelector(".services");
const subMenu = document.querySelector(".sub-menu");
services.addEventListener("click", () => {
  let can_submit = "true" === services.getAttribute("aria-expanded");
  services.setAttribute("aria-expanded", !can_submit);
  services.classList.toggle("on");
  subMenu.classList.toggle("sub-menu--open");
});
