'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PIN_SIZE_X = 62;
  var PIN_SIZE_Y = 62;
  var PIN_POINTER_TOP = 18;

  var setAttributeDisable = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].setAttribute('disabled', 'disabled');
    }
  };
  var dellAttributeDisable = function (elem) {
    for (var i = 0; i < elem.length; i++) {
      elem[i].removeAttribute('disabled');
    }
  };

  var openMap = function () {
    window.map.classList.remove('map--faded');
    formVision.classList.remove('ad-form--disabled');
    mapVision.removeAttribute('disabled');
    dellAttributeDisable(mapsFilters);
    dellAttributeDisable(inputVision);
  };

  var map = document.querySelector('.map');

  var formVision = document.querySelector('.ad-form');
  formVision.classList.add('ad-form--disabled');

  var mapVision = document.querySelector('.map__filters');
  var mapsFilters = mapVision.querySelectorAll('.map__filter');
  setAttributeDisable(mapsFilters);

  var inputVision = formVision.querySelectorAll('fieldset');
  setAttributeDisable(inputVision);

  var activeAction = document.querySelector('.map__pin--main');

  var xPin = activeAction.offsetLeft;
  var yPin = activeAction.offsetTop;

  var setlocation = document.querySelector('#address');
  var addressDefaultX = xPin + (PIN_SIZE_X / 2);
  var addressDefaultY = yPin + (PIN_SIZE_Y / 2);
  setlocation.setAttribute('value', window.getAddress(addressDefaultX, addressDefaultY));

  activeAction.addEventListener('mousedown', function () {
    openMap(map);
    var pinPointerX = xPin + (PIN_SIZE_X / 2);
    var pinPointerY = yPin + PIN_SIZE_Y + PIN_POINTER_TOP;
    setlocation.setAttribute('value', window.getAddress(pinPointerX, pinPointerY));
  });

  activeAction.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
    }
  });

  window.map = document.querySelector('.map');
  window.pins = window.getObjects();

  var pinContainerElem = document.querySelector('.map__pins');
  pinContainerElem.appendChild(window.renderPins());
  var mapPopup = document.querySelector('.map__filters-container');
  window.map.insertBefore(window.renderCard(), mapPopup);


  var mapCards = document.querySelectorAll('.map__card');
  var pinTm = document.querySelectorAll('.map__pin');

  function onClickPopup(g) {
    return function () {
      mapCards[g].classList.add('hidden');
    };
  }

  function onClickPopupEsc(pn) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        mapCards[pn].classList.add('hidden');
      }
    };
  }

  function onClickCard(pn) {
    return function () {

      for (var g = 0; g < mapCards.length; g++) {
        mapCards[g].classList.add('hidden');
      }
      mapCards[pn - 1].classList.remove('hidden');
      var closeCard = mapCards[pn - 1].querySelector('.popup__close');
      closeCard.addEventListener('click', onClickPopup(pn - 1), false);
      document.addEventListener('keydown', onClickPopupEsc(pn - 1), false);
    };
  }

  for (var pn = 0; pn < pinTm.length; pn++) {
    if (pn !== 0) {
      pinTm[pn].addEventListener('click', onClickCard(pn), false);
    }
  }
})();
