'use strict';
function app() {

  let self = new Object();
  let xhr = new XMLHttpRequest();

  /* DOM Elements */
  //Header
  let eToggleMenu = document.querySelector(".header-main-toggle-menu");
  let eToggleIcon = document.querySelector(".header-main-toggle-menu-icon");  
  let eToggleShip = document.querySelector(".header-main-shipping-toggle");  
  let eLogo = document.querySelector(".header-main-logo");
  let eSearch = document.querySelector(".header-main-search");
  let eShipping = document.querySelector(".header-main-shipping");
  let eBag = document.querySelector(".header-main-bag");
  let eNavbar = document.querySelector(".header-nav");
  let eFormSearch = document.querySelector(".form-search-stock");

  //Main
  let ePotions = document.querySelector('.potions-grid');
  let eCloseModal = document.querySelector(".close-modal");
  let eModal = document.querySelector(".potions-modal");
  let eNotLoaded = document.querySelector(".potions-not-loaded");

  //Footer
  let eLinks = document.querySelector(".footer-links-items");

  function required(param) {
    throw new Error(`Parameter ${param} is required.`);
  }

  function request (sMethod, sUrl, bAsync = false) {
    
    xhr.open(sMethod, sUrl, bAsync);

    xhr.onreadystatechange = () => {

      //Readey State -> 3 - Loading / 4 - Done
      //Response Code -> 200 - OK
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          console.error("Ocorreu um erro na requição. Erro " + xhr.status);
          return false;
        }
      }

    };

    xhr.send();
    return xhr.responseText;

  }

  function convertObjToArrayObj (obj) {
    
    let array = new Array();

    for (let key in obj) { array.push(obj[key]); }

    return array;

  }

  function createElement(element, attrs, parentNode = null, textContent = null, events) {

    let e = document.createElement(element);
        e.textContent = textContent;

    if (attrs && attrs.length) {

      attrs.forEach(attribute => {
      
        let key = Object.keys(attribute)[0];
        let values = Object.values(attribute)[0];

        if (Array.isArray(values)) {        
          values.forEach(value => { e.setAttribute(key, value); })
        } else {
          e.setAttribute(key, values);
        }

      });

    }

    if (events) {
      let event = Object.keys(events)[0];
      let callback = Object.values(events)[0];
      e.addEventListener(event, callback)
    };

    if (parentNode) parentNode.appendChild(e);

    return e;

  }

  function loadPotions(obj) {

    let aPotions = self.potions;

    function clickImage (obj) {
      let eModal = document.querySelector(".potions-modal");
          eModal.classList.remove("hidden");
      loadModal(obj);
    }

    aPotions.forEach(potion => {

      let ePotion = createElement("div", [{class: 'potion-item'}], ePotions);
      let eFigurePotion = createElement("figure", [{class: 'potion-item-image'}], ePotion);

      let eImgPotion = createElement("img", [
            {src: 'static/assets/img/products/' + potion.image},
            {alt: potion.name}
          ], eFigurePotion, null, {click: () => { clickImage(potion) }});

      let eDescrPotion = createElement("div", [{class: 'potion-item-descr'}], ePotion);

      let eDescrNamePotion = createElement("span", [
            {class: 'potion-item-descr-name'}
          ], eDescrPotion, potion.name + " - ");

      let eDescrPricePotion = createElement("span", [
            {class: 'potion-item-descr-price'}
          ], eDescrPotion, "$" + potion.price);

    });

  }

  function loadModal (potion) {
    
    let eImage = document.querySelector('.potion-info-image');
        eImage.src = "static/assets/img/products/" + potion.image;

    let eTitle = document.querySelector('.potion-info-descr-title');
        eTitle.textContent = potion.name;

    let eEffect = document.querySelector('.potion-info-descr-effect');
        eEffect.textContent = potion.effect;

    let ePrice = document.querySelector('.potion-info-descr-price-down');
        ePrice.textContent = "$" + potion.price;

    let aIngredients = potion.ingredients;

    let eIngredientsContent = document.querySelector('.potion-info-descr-ingredients');
        eIngredientsContent.innerHTML = "";
    
    aIngredients.forEach(i => {
      let eIngredients = createElement("li", null, eIngredientsContent, i);
    })

  }

  function loadEvents () {
    
    eToggleIcon.addEventListener('click', () => {
      eNavbar.classList.toggle('hidden');
      eLogo.classList.toggle('hidden');
      eSearch.classList.toggle('hidden');
      eBag.classList.toggle('hidden');
      eToggleMenu.classList.toggle('rotate');
      eToggleIcon.classList.toggle('rotate');
      eToggleShip.classList.toggle('hidden');
    });

    eCloseModal.addEventListener('click', () => {
      eModal.classList.add("hidden");
    });

    eFormSearch.addEventListener('submit', event => {
      event.preventDefault();
    })

  }

  self.resize = () => {
    
    let nWindowsWidth = window.innerWidth;

    if (nWindowsWidth <= 768) {
      eNavbar.classList.add('hidden');
      eSearch.classList.add('hidden');
      eShipping.classList.add('hidden');
      eLinks.classList.add('hidden');
      eToggleMenu.classList.remove('hidden');
      eToggleShip.classList.remove('hidden');
    } else {
      eNavbar.classList.remove('hidden');
      eSearch.classList.remove('hidden');
      eShipping.classList.remove('hidden');
      eLinks.classList.remove('hidden');
      eToggleMenu.classList.add('hidden');
      eToggleShip.classList.add('hidden');
    }
  }

  self.init = (sMethod = required('sMethod'), sUrl = required('sUrl'), bAsync = false) => {
    
    let response = request(sMethod, sUrl, bAsync);

    try {
      
      let sPotions = JSON.parse(response);
      self.potions = convertObjToArrayObj(sPotions.potions);
      loadPotions();

    } catch(e) {
      
      eNotLoaded.classList.remove('hidden');

    } finally {

      self.resize();
      loadEvents();

    }    

  };

  return self;

}