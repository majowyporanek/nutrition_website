const hamburger = document.querySelector(".hamburger");
const navBar = document.querySelector(".nav-bar");
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    // const navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle('active');
});

const items = document.querySelectorAll(".nav-bar-item");

items.forEach(item=> item.addEventListener('click', () => {
    hamburger.classList.remove("active");
    navBar.classList.remove("active");
}));


var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    if(hamburger.classList.contains('active')) {
    navBar.classList.add('active');
    }
  } else {
    navBar.classList.remove('active');
  }
  prevScrollpos = currentScrollPos;
}



var imgOfDiet = document.querySelectorAll('.img img');

// popup containers
var popupContainer1 = document.querySelector('.popup-container-1');
var popupContainer2 = document.querySelector('.popup-container-2')
var popupContainer3 = document.querySelector('.popup-container-3');

// diets
var dietProposition1 = document.querySelector("#jesienna");
var dietProposition2 = document.querySelector("#srodziemnomorska");
var dietProposition3 = document.querySelector("#wegetarianska");


// close btn-s
var closeJesienna = document.getElementById("closeJ");
var closeSrodziemnomorka = document.getElementById("closeS");
var closeWegetarianska = document.getElementById("closeW");


//funkcje do dodawania i usuwania klasy hover
function removeHover() {
  imgOfDiet.forEach(img => img.classList.remove(classForHover));
}

function addHover() {
  imgOfDiet.forEach(img => img.classList.add(classForHover));
}



//work in progress
// function getClassName(){
//   var clickedBtn = event.target.className;
//   return clickedBtn;
// }




function hidePopup(){

  imgOfDiet.classList.add('classForHover');
}


dietProposition1.addEventListener('click', ()=>{
  //imgOfDiet.classList.remove('classForHover');
  popupContainer1.classList.add("popup-display"); 
});

dietProposition2.addEventListener('click',()=>{
  popupContainer2.classList.add("popup-display");
});

dietProposition3.addEventListener('click', () => {
  popupContainer3.classList.add("popup-display");
})

//close bts:

closeJesienna.addEventListener('click', () => {
    popupContainer1.classList.remove("popup-display");
});

closeSrodziemnomorka.addEventListener('click', ()=>{
  popupContainer2.classList.remove("popup-display");
});

closeWegetarianska.addEventListener('click', () => {
  popupContainer3.classList.remove("popup-display");
})
