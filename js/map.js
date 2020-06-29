'use strict';

(function () {
  var isActivate = true;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var fieldsets = adForm.querySelectorAll('.ad-form__element');

  var onLoadSuccess = function (adData) {
    window.filter.activateFiltration(adData);
  };

  var findsFieldsetsDisconnects = function (disconnect) {
    fieldsets.forEach(function (disa) {
      disa.disabled = disconnect;
    });
  };
  findsFieldsetsDisconnects(true);

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removePins = function () {
    var mapPinsChildren = [].slice.call(mapPins.children);
    mapPinsChildren.forEach(function (el) {
      if (el.classList.contains('map__pin') && !el.classList.contains('map__pin--main')) {
        el.remove();
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
      findsFieldsetsDisconnects(false);
      isActivate = false;
    }
  };

  mapPinMain.addEventListener('mousedown', onPopupClik);
  mapPinMain.addEventListener('keydown', onPinEnter);

  window.page = {
    deactivatePage: function () {
      toggleActivation();
      findsFieldsetsDisconnects(true);
      isActivate = true;
      removeCard();
      removePins();
      window.filter.deactivateFiltration();
      window.pins.defaultPins();
    }
  };

  var ENTER_KEYCODE = 13;
  window.window.ESC_KEYCODE = 27;

  var mapActivate = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
  };

  window.map = {
    markClickHandler: function () {
      mapActivate();

      window.form.activateAdsForm();

      window.form.disableAllInputs(false);

      var loadHandler = function (adsList) {
        window.drawPins(adsList);

        var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        var openPopUp = function (evt, key, handler) {
          var target = evt.currentTarget;
          var number = target.id;
          window.drawMapCard(adsList, number);
          addListen();
          mapPins[number].removeEventListener(key, handler);
        };

        var closeButtonClickHandler = function () {
          var popUp = document.querySelector('.map__card');
          if (popUp) {
            popUp.remove();
          }
          addListen();
        };

        var closePopUpAuto = function () {
          closeButtonClickHandler();
        };

        var closePopUpEsc = function () {
          document.addEventListener('keydown', function (evt) {
            if (evt.keyCode === window.ESC_KEYCODE) {
              closeButtonClickHandler();
            }
          });
        };

        var closePopUpEnter = function () {
          var popUp = document.querySelector('.map__card');
          var closeButton = popUp.querySelector('.popup__close');
          closeButton.addEventListener('keydown', function (evt) {
            if (evt.keyCode === ENTER_KEYCODE) {
              closeButtonClickHandler();
            }
          });
        };

        var closePopUpClick = function () {
          var popUp = document.querySelector('.map__card');
          var closeButton = popUp.querySelector('.popup__close');
          closeButton.addEventListener('click', closeButtonClickHandler);
        };

        var pinClickHandler = function (evt) {
          closePopUpAuto();
          openPopUp(evt, 'click', pinClickHandler);
          closePopUpEsc();
          closePopUpClick();
          closePopUpEnter();
        };

        var enterKeyDownHandler = function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            closePopUpAuto();
            openPopUp(evt, 'keydown', enterKeyDownHandler);
            closePopUpEsc();
            closePopUpClick();
            closePopUpEnter();
          }
        };

        var addListen = function () {
          for (var i = 0; i < mapPins.length; i++) {
            mapPins[i].addEventListener('click', pinClickHandler);
            mapPins[i].addEventListener('keydown', enterKeyDownHandler);
          }
        };
        addListen();

      };

      window.backend.load(loadHandler, window.data.errorHandler);

      window.marker.mark.removeEventListener('mousedown', window.map.markClickHandler);
      window.marker.mark.removeEventListener('keydown', window.map.enterPressHandler);
    },
    enterPressHandler: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.map.markClickHandler();
      }
    }
  };

  window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);

  window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
})();
