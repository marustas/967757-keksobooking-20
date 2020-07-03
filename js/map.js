'use strict';

(function () {

  var isActivate = true;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldset = adForm.querySelectorAll('.ad-form__element');

  var onLoadSuccess = function (adData) {
    window.filter.activateFiltration(adData);
  };

  var disconnectFieldset = function (disconnect) {
    fieldset.forEach(function (dis) {
      dis.disabled = disconnect;
    });
  };
  disconnectFieldset(true);

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removePins = function () {
    var mapPinsChildren = [].slice.call(mapPins.children);
    mapPinsChildren.forEach(function (elem) {
      if (elem.classList.contains('map__pin') && !elem.classList.contains('map__pin--main')) {
        elem.remove();
      }
    });
  };
  var onPopupClik = function (evt) {
    window.utils.mouseClik(evt, activatePage());

  };

  var onPinEnter = function (evt) {
    window.utils.keyEnter(evt, activatePage);
  };

  var toggleActivation = function () {
    if (window.utils.mouseClik) {
      map.classList.toggle('map--faded');
      adForm.classList.toggle('ad-form--disabled');
    }
  };

  var activatePage = function () {
    window.backend.load(onLoadSuccess);
    if (isActivate) {
      toggleActivation();
      disconnectFieldset(false);
      isActivate = false;
    }
  };

  mapPinMain.addEventListener('mousedown', onPopupClik);
  mapPinMain.addEventListener('keydown', onPinEnter);

  window.page = {
    deactivatePage: function () {
      toggleActivation();
      disconnectFieldset(true);
      isActivate = true;
      removeCard();
      removePins();
      window.filter.deactivateFiltration();
      window.pins.defaultPins();
    }
  };

})();
