'use strict';
(function () {
  var pageIsActive = !document.querySelector('.map').classList.contains('map--faded');
  var mapPinMain = document.querySelector('.map__pin--main');

  var addPinClickHandler = function (pin, index) {
    var currentAd = window.ads[index];
    pin.addEventListener('click', function () {
      window.card.renderAd(currentAd);
    });
    pin.addEventListener('keydown', function (evt) {
      window.util.enterEvent(evt, function () {
        window.card.renderAd(currentAd);
      });
    });
  };

  var activatePage = function () {
    document.querySelector('.map').classList.remove('map--faded');
    window.activateForm();
    window.pin.renderMapPin();
    var mapPinButtons = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinButtons.length; i++) {
      addPinClickHandler(mapPinButtons[i], i);
    }
    pageIsActive = true;
  };


  mapPinMain.addEventListener('mousedown', function () {
    if (!pageIsActive) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (!pageIsActive) {
      window.util.enterEvent(evt, activatePage);
    }
  });
})();
