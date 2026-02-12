function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "" || !email.includes("@")) {
    alert("All fields are required!");
    return false;
  }

  alert("Form submitted successfully!");
  return true;
}