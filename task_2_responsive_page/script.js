let cart = 0;

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden");
}

function addToCart() {
  cart++;
  document.getElementById("cartCount").innerText = cart;
}

function toggleLike(btn) {
  btn.classList.toggle("text-red-500");

  if (btn.classList.contains("text-red-500")) {
    btn.innerText = "❤️";
  } else {
    btn.innerText = "🤍";
  }
}