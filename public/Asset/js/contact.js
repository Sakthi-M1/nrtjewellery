document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const subject = formData.get("subject");
    const message = formData.get("message");
  
    alert(
      `Thank you, ${name}! We have received your message.\n\nDetails:\n- Email: ${email}\n- Subject: ${subject}\n- Message: ${message}`
    );
  
    // Clear the form
    e.target.reset();
  });
  

  const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  hamburger.classList.toggle("toggle");
});
