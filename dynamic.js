import { skills, projects } from "./data.js";



const nav_el = document.querySelector(".nav-el");
let nav_arrow = document.querySelector(".arrow");
let nav_mood = "closed";
const skills_box = document.querySelector(".skills-box  .cards-box");

let proj_cards = Array.from(document.querySelectorAll(".card"));
let proj_wrapper = document.querySelector(".wrapper");

let card_img = Array.from(document.querySelectorAll(".card img"));
let card_h1 = Array.from(document.querySelectorAll(".card h1"));
let card_p = Array.from(document.querySelectorAll(".card p"));
let card_time = Array.from(document.querySelectorAll(".card .time-consumed"));
let card_rating_box = Array.from(document.querySelectorAll(".stars-box"));

let Next_section_btn = document.querySelectorAll(".next");
let sections = document.querySelectorAll(".main .section");
let current = 0;

let color_btn = document.querySelector(".color-box");

/********************Colors**************************/
let saved_color =JSON.parse(localStorage.getItem("color")) ;

if(saved_color){
  document.body.classList.add(`${saved_color}`);
}

color_btn.addEventListener("click", function () {
  color_btn.innerHTML = `
  <div class="red color" data-color="red"></div>
  <div class="cyan color" data-color="cyan"></div>
  <div class="gray color" data-color="gray"></div>
  <div class="green color" data-color="green"></div>
  `;
  color_btn.style = `
  width:14rem;
  height:3rem;
  display:flex;
  align-items:center;
  justify-content:center;
  `;

  let colors = document.querySelectorAll(".color");
  setColor(colors);
});

function setColor(colors) {
  colors.forEach(function (color) {
    color.addEventListener("click", function () {
      for (let i = 0; i < colors.length; i++) {
        document.body.classList.remove(colors[i].getAttribute("data-color"));
      }
      localStorage.color = JSON.stringify(color.getAttribute("data-color"));
      document.body.classList.add(color.getAttribute("data-color"));
      color_btn.innerHTML = `
      <ion-icon name="color-fill"></ion-icon>
  `;
    });
  });
}

/******************************Navbar********************************************/
let icons = Array.from(document.querySelectorAll(".nav-li a"));

icons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    sections.forEach(function (sec) {
      if (icon.getAttribute("href") === "#" + sec.getAttribute("id")) {
        for (let i = 0; i < sections.length; i++) {
          sections[i].classList.remove("displayed");
          sections[i].classList.add("undisplayed");
        }
        sec.classList.remove("undisplayed");
        sec.classList.add("displayed");
        if (icon.getAttribute("href") == "#skills") {
          setTimeout(skillsAnimation, 500);
        }

        if (!(icon.getAttribute("href") == "#main")) {
          document.body.style = `  box-shadow: inset 10rem 10rem 20rem rgba(0, 0, 0, 0.285) ,inset -10rem -10rem 20rem rgba(0, 0, 0, 0.285) ;`; // to add some blur on surroindings
        }
      }
    });
  });
});

/********************************************************************************/

Next_section_btn.forEach(function (next) {
  next.addEventListener("click", function () {
    current = current < sections.length - 1 ? current : 0;
    console.log("-" + current);
    ++current;
    console.log("+" + current);
    sections.forEach(function (sec) {
      sec.classList.remove("displayed");
      sec.classList.add("undisplayed");
    });
    sections[current].classList.add("displayed");
    sections[current].classList.remove("undisplayed");
    document.body.style = `box-shadow: inset 10rem 10rem 20rem rgba(0, 0, 0, 0.285) ,inset -10rem -10rem 20rem rgba(0, 0, 0, 0.285) ;`; // to add some blur on surroindings
    if (current == 1) {
      setTimeout(skillsAnimation, 500);
    }
  });
});

/*******************Filling project cards********************************/

function fillCards() {
  let num_of_cards = proj_cards.length;
  for (let i = 0; i < num_of_cards; i++) {
    card_h1[i].innerText = `${projects[i]["h1"]}`;
    card_p[i].innerText = `${projects[i]["p"]}`;
    card_time[i].innerText = `${projects[i]["time"]}`;
    card_img[i].setAttribute("src", `${projects[i]["img-path"]}`);
    for (let j = 0; j < parseInt(projects[i]["rate"]); j++) {
      card_rating_box[i].children[j].style = `color:#ffa700;`;
    }
  }
}

fillCards();

/***********************nav arrow*******************************/

ArrowPosition();

window.onresize = function () {
  ArrowPosition();
};

nav_arrow.addEventListener("click", function () {
  Nav_el_displayer();
});

function Nav_el_displayer() {
  if (window.innerWidth < 1200) {
    nav_arrow.setAttribute("name", "chevron-down");
    nav_arrow.style = `
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      `;
    if (nav_mood === "opened") {
      nav_mood = "closed";
      nav_el.style = `opacity:0;pointer-events: none;`;
      nav_arrow.setAttribute("name", "chevron-down");
      nav_arrow.style = `
        top:0.5rem;
        left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);`;
    } else if (nav_mood === "closed") {
      nav_mood = "opened";
      nav_el.style = `opacity:1;pointer-events: all;`;
      nav_arrow.style = `top:6.5rem;
        left: 50%;
        transform: translateX(-50%);
        -webkit-transform: translateX(-50%);
        -moz-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        -o-transform: translateX(-50%);`;
      nav_arrow.setAttribute("name", "close");
    }
  } else {
    nav_arrow.style = `
        top:6.5rem;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);`;
    nav_arrow.setAttribute("name", "chevron-forward");

    if (nav_mood === "opened") {
      nav_mood = "closed";
      nav_el.style = `opacity:0;pointer-events: none;`;
      nav_arrow.setAttribute("name", "chevron-forward");
      nav_arrow.style = `
          left:0.5rem;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          `;
    } else if (nav_mood === "closed") {
      nav_mood = "opened";
      nav_el.style = `opacity:1;pointer-events: all;`;
      nav_arrow.style = `
          left:6.5rem;
          top: 50%;
          transform: translateY(-50%);
          -webkit-transform: translateY(-50%);
          -moz-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          -o-transform: translateY(-50%);
          `;
      nav_arrow.setAttribute("name", "close");
    }
  }
}
function ArrowPosition() {
  if (window.innerWidth < 1200) {
    nav_arrow.setAttribute("name", "chevron-down");
    nav_arrow.style = `
      left: 50%;
      transform: translateX(-50%);
      -webkit-transform: translateX(-50%);
      -moz-transform: translateX(-50%);
      -ms-transform: translateX(-50%);
      -o-transform: translateX(-50%);
      `;
  } else {
    nav_arrow.style = `
        top:6.5rem;
        top: 50%;
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);`;
    nav_arrow.setAttribute("name", "chevron-forward");
  }
}

/*********************SKILLS CREATION*************************/

function skillsDom() {
  for (let i = 0; i < skills.length; i++) {
    let div = document.createElement("div");
    div.classList.add("skill-outer");

    let label = document.createElement("label");
    label.classList.add("skill-label");
    let label_text = document.createTextNode(skills[i]["name"]);
    label.appendChild(label_text);

    let span = document.createElement("span");
    span.classList.add("skill-inner");
    span.setAttribute("data-width", `${skills[i]["rate"]}`);

    div.appendChild(label);
    div.appendChild(span);
    skills_box.appendChild(div);
  }
}

function skillsAnimation() {
  let skills_span = Array.from(document.querySelectorAll(".skill-inner"));
  for (let i = 0; i < skills_span.length; i++) {
    skills_span[i].style = `width: ${parseInt(skills[i]["rate"])}% ;
    background-color: ${skills[i]["color"]}; 
    box-shadow: inset 0.1rem 0.2rem 1rem rgb(0,0,0,0.2),inset -0.1rem -0.2rem 1rem rgb(0,0,0,0.2);`;
  }
}
skillsDom();

/*******************************Slider*********************************************/
let prevP , prevScrollLeft ;
let started = false;
function start(e) {
  if(window.innerWidth >1000){
    started = true;
    prevP = e.clientX;
    prevScrollLeft = proj_wrapper.scrollLeft;
    }
    else{
        started = true;
    prevP = e.touches[0].clientX;
    prevScrollLeft = proj_wrapper.scrollLeft;
    }
}

function dragging(e) {
  if(window.innerWidth >1000){

    if(!started) return;
    let scroll_amount = e.clientX - prevP;
    proj_wrapper.scrollLeft = prevScrollLeft - scroll_amount;
    }
    else{
        if (!started) return;
    let scroll_amount = e.touches[0].clientX - prevP;
    proj_wrapper.scrollLeft = prevScrollLeft - scroll_amount;
    
    }
}

function end() {
  started = false;
}

proj_wrapper.addEventListener("mousedown", start);

proj_wrapper.addEventListener("mousemove", dragging);

proj_wrapper.addEventListener("mouseup", end);


proj_wrapper.addEventListener('touchstart',start);

proj_wrapper.addEventListener('touchmove',dragging);
    
proj_wrapper.addEventListener('touchend',end);