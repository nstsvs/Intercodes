'use strict'

const menuButton = document.querySelector('.menu__button');
const menuList = document.querySelector('.menu__list');
menuButton.addEventListener('click', () => {
  let expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', !expanded);
  menuButton.classList.toggle('on');
  menuList.classList.toggle('menu__list--open');
});


const nav = document.querySelector('.menu__button');
const logo = document.querySelector('.logo__image');
nav.addEventListener('click', function() {
  this.classList.toggle('active');

  if (this.classList.contains('active')) {
    logo.src = './img/logo-black.svg'
  }
  else {
    logo.src = './img/logo-orange.svg'
  }
})

var divColor = document.getElementById('header'),
  btnColor = document.getElementById('menu__button');
  btnColor.onclick = function () {
  divColor.classList.toggle('header--active');
};

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}
