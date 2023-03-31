import "../scss/app.scss";

/* Your JS Code goes here */
const landing = document.querySelector(".landingSection");
const subBtn = document.querySelector(".sub-btn");
const navToggle = document.querySelector(".navbar_toggle");
const links = document.querySelector(".main_nav");
const topHead = document.querySelector(".landingSection");
const card1 = document.querySelector(".card-1");
const card2 = document.querySelector(".card-2");
const card3 = document.querySelector(".card-3");
const card4 = document.querySelector(".card-4");
const slide1 = document.querySelector(".slide1");
const slide2 = document.querySelector(".slide-2");
const redHead = document.querySelector(".red-heading");
const subscribeButton = document.querySelector(".subscribe");

navToggle.addEventListener("click", function () {
  links.classList.toggle("show_nav");
  links.classList.toggle("hidden");
});

var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

subscribeButton.addEventListener("click", (e) => {
  e.preventDefault();
  let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (mail.email.value.match(mailFormat)) {
    fetch("http://localhost:5000/email-data", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: `id=${Date.now()}&Email=${mail.email.value}`,
    }).then((res) => {
      console.log("Data posted", res);
      subscribeButton.textContent = "DONE";
      mail.email.value = "";
    });
  } else {
    alert("Enter Valid Email Address");
  }
});

subBtn.addEventListener("click", (e) => {
  if (
    form.checkin.value.trim().length > 0 &&
    form.checkout.value.trim().length > 0 &&
    form.adults.value.trim().length > 0 &&
    form.children.value.trim().length > 0
  ) {
    e.preventDefault();
    fetch("http://localhost:5000/form-data", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: `id=${Date.now()}&checkInDate=${form.checkin.value}&checkOutDate=${
        form.checkout.value
      }&noOfAdults=${form.adults.value}&noOfchildren=${form.children.value}`,
    }).then((res) => {
      console.log("data potsed", res);
      subBtn.textContent = "Submitted";
      form.checkin.value = "";
      form.checkout.value = "";
      form.children.value = "";
      form.adults.value = "";
    });
  } else {
    alert("Fill the form Correctly");
  }
});

function addTop(d) {
  console.log(d);
  topHead.querySelector("h1").textContent = d.data[0].heading;
  topHead.querySelector("p").textContent = d.data[0].desc;
  topHead.style.backgroundImage = `url(${d.data[0].image})`;
}

function addCard(d) {
  console.log(d);
  card1.querySelector("img").src = d.data[0].image;
  card1.querySelector("p").textContent = d.data[0].semiHeading;
  card1.querySelector("h3").textContent = d.data[0].heading;
  card1.querySelector(".card-desc1").textContent = d.data[0].desc;

  card2.querySelector("img").src = d.data[1].image;
  card2.querySelector("p").textContent = d.data[1].semiHeading;
  card2.querySelector("h3").textContent = d.data[1].heading;
  card2.querySelector(".card-desc2").textContent = d.data[1].desc;

  card3.querySelector("img").src = d.data[2].image;
  card3.querySelector("p").textContent = d.data[2].semiHeading;
  card3.querySelector("h3").textContent = d.data[2].heading;
  card3.querySelector(".card-desc3").textContent = d.data[2].desc;

  card4.querySelector("img").src = d.data[3].image;
  card4.querySelector("p").textContent = d.data[3].semiHeading;
  card4.querySelector("h3").textContent = d.data[3].heading;
  card4.querySelector(".card-desc4").textContent = d.data[3].desc;
}

function slider(d) {
  console.log(d);
  redHead.textContent = d.data[0].redHeading;
  slide1.querySelector("img").src = d.data[0].image;
  slide2.querySelector("img").src = d.data[1].image;
}

async function GetTopData() {
  await fetch("http://localhost:5000/top")
    .then((d) => {
      return d.json();
    })
    .then((d) => {
      addTop(d);
    });
}

async function getCardData() {
  await fetch("http://localhost:5000/card")
    .then((d) => {
      return d.json();
    })
    .then((d) => {
      addCard(d);
    });
}

async function getSlideData() {
  await fetch("http://localhost:5000/slider")
    .then((d) => {
      return d.json();
    })
    .then((d) => {
      slider(d);
    });
}

(() => {
  GetTopData();
  getCardData();
  getSlideData();
})();
