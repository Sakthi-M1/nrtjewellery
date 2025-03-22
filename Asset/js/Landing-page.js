const wrapper = document.querySelector(".wrapper");
const jewellery = document.querySelector(".jewellery");
const firstCardWidth = jewellery.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const jewelleryChildrens = [...jewellery.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(jewellery.offsetWidth / firstCardWidth);

jewelleryChildrens.slice(-cardPerView).reverse().forEach(card => {
    jewellery.insertAdjacentHTML("afterbegin", card.outerHTML);
});

jewelleryChildrens.slice(0, cardPerView).forEach(card => {
    jewellery.insertAdjacentHTML("beforeend", card.outerHTML);
});

jewellery.classList.add("no-transition");
jewellery.scrollLeft = jewellery.offsetWidth;
jewellery.classList.remove("no-transition");

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        jewellery.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    jewellery.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = jewellery.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; 
    jewellery.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    jewellery.classList.remove("dragging");
}

const infiniteScroll = () => {
    if(jewellery.scrollLeft === 0) {
        jewellery.classList.add("no-transition");
        jewellery.scrollLeft = jewellery.scrollWidth - (2 * jewellery.offsetWidth);
        jewellery.classList.remove("no-transition");
    }
    else if(Math.ceil(jewellery.scrollLeft) === jewellery.scrollWidth - jewellery.offsetWidth) {
        jewellery.classList.add("no-transition");
        jewellery.scrollLeft = jewellery.offsetWidth;
        jewellery.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => jewellery.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

jewellery.addEventListener("mousedown", dragStart);
jewellery.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
jewellery.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


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




const items = document.querySelectorAll('.feedback .item');
let currentIndex = 0;

function showNextItem() {
  items[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % items.length;
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentIndex * 100}%)`;
  items[currentIndex].classList.add('active');
}

setInterval(showNextItem, 3000);
