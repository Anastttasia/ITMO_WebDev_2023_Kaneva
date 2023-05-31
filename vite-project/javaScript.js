const navbar = document.querySelector("nav");
const openMenu = document.getElementById("menuButton");
const closeMenu = document.getElementById("menuClose");

openMenu.addEventListener("click", () => {
  navbar.classList.add("open");
});

closeMenu.addEventListener("click", () => {
  navbar.classList.remove("open");
});