'use strict';

(function () {

  var MIN_NAME_LENGTH = 30;
  var MAX_NAME_LENGTH = 100;
  var ROOMS_CAPACITY = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var MinPriceTypes = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000

  var MARK_START_X = 570;
  var MARK_START_Y = 375;

  var adsForm = document.querySelector('.ad-form');

  window.form = {
    activateAdsForm: function () {
      adsForm.classList.remove('ad-form--disabled');
    },
    disableAllInputs: function (status) {
      disableInput('fieldset', status);
      disableInput('select', status);
      disableInput('input', status);
    },
    drawMarkPosition: function (width, height) {
      var inputAddress = document.querySelector('#address');
      inputAddress.value = (getMarkPosition().x + width) + ', ' + (getMarkPosition().y + height);
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var addTitle = document.querySelector('#title');
  var adPrice = document.querySelector('#price');
  var addType = document.querySelector('#type');
  var adTimein = document.querySelector('#timein');
  var adTimeout = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacityRoom = document.querySelector('#capacity');

  adAddress.value = Math.floor(mapPinMain.offsetLeft + mapPinMain.offsetWidth / 2) + ', ' + Math.floor(mapPinMain.offsetTop + mapPinMain.offsetHeight);

  var getMapPinMainCoords = function () {
    var mapPinMainPosition = {
      x: mapPinMain.offsetLeft + Math.floor(mapPinMain.offsetWidth / 2),
      y: mapPinMain.offsetTop + mapPinMain.offsetHeight
    };
    return mapPinMainPosition;
  };

  var onRoomNumberChange = function () {
    if (capacityRoom.options.length) {
      [].forEach.call(capacityRoom.options, function (item) {
        item.selected = (ROOMS_CAPACITY[roomNumber.value][0] === item.value) ? true : false;
        item.hidden = (ROOMS_CAPACITY[roomNumber.value].indexOf(item.value) >= 0) ? false : true;
      });
    } else {
      capacityRoom.setCustomValidity('');
    }
  };

  var headline = function () {
    if (addTitle.validity.tooShort) {
      addTitle.setCustomValidity('Минимальная длина - ' + MIN_NAME_LENGTH + ' символов');
    } else if (addTitle.validity.tooLong) {
      addTitle.setCustomValidity('Максимальная длина - ' + MAX_NAME_LENGTH + ' символов');
    } else if (addTitle.validity.valueMissing) {
      addTitle.setCustomValidity('Обязательное текстовое поле');
    } else {
      addTitle.setCustomValidity('');
      
  var inputRoomNumber = document.querySelector('#room_number');
  var inputSeatsNumber = document.querySelector('#capacity');
  var inputSeatsOption = inputSeatsNumber.querySelectorAll('option');
  var inputPrice = adsForm.querySelector('#price');

  var disableInput = function (input, status) {
    var inputs = document.querySelectorAll(input);
    for (var i = 0; i < inputs.length; i++) {
      if (status) {
        inputs[i].disabled = true;
      } else {
        inputs[i].disabled = false;
      }
    }
  };

  addTitle.addEventListener('invalid', headline);

  var setPriceMin = function (input, data) {
    input.min = data;
    input.placeholder = data;
  };

  addType.addEventListener('change', function (evt) {
    setPriceMin(adPrice, MinPriceTypes[evt.target.value]);
  });

  adTimein.addEventListener('change', function (evt) {
    adTimeout.value = evt.target.value;
  });

  adTimeout.addEventListener('change', function (evt) {
    adTimein.value = evt.target.value;
  });

  adFormReset.addEventListener('mousedown', window.page.deactivatePage);
  roomNumber.addEventListener('change', onRoomNumberChange);
=======
  window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);

  var validationInput = function () {
    var inputTitle = adsForm.querySelector('#title');
    var inputType = adsForm.querySelector('#type');
    var inputTimeIn = adsForm.querySelector('#timein');
    var inputTimeOut = adsForm.querySelector('#timeout');

    var roomNumberClickHandler = function () {
      for (var i = 0; i < inputSeatsOption.length; i++) {
        inputSeatsOption[i].disabled = true;
      }
      for (var j = 0; j < NUMBERS_SEATS[inputRoomNumber.value].length; j++) {
        var number = NUMBERS_SEATS[inputRoomNumber.value][j];

        for (var k = 0; k < inputSeatsOption.length; k++) {
          var seat = inputSeatsOption[k].value;
          if (String(number) === seat) {
            inputSeatsOption[k].disabled = false;
            inputSeatsOption[k].selected = true;
          }
        }
      }
    };

    inputRoomNumber.addEventListener('change', function () {
      roomNumberClickHandler();
    });

    inputTitle.addEventListener('invalid', function () {
      if (inputTitle.validity.tooShort) {
        inputTitle.setCustomValidity('Минимальная длина — 30 символов');
      } else if (inputTitle.validity.tooLong) {
        inputTitle.setCustomValidity('Максимальная длина — 100 символов');
      } else if (inputTitle.validity.valueMissing) {
        inputTitle.setCustomValidity('Обязательное поле');
      } else {
        inputTitle.setCustomValidity('');
      }
    });

    inputPrice.addEventListener('invalid', function () {
      if (inputPrice.validity.valueMissing) {
        inputPrice.setCustomValidity('Обязательное поле');
      } else {
        inputPrice.setCustomValidity('');
      }
    });

    inputType.addEventListener('change', function (evt) {
      inputPrice.min = HOUSING_MIN_PRICES[evt.target.value];
      inputPrice.placeholder = HOUSING_MIN_PRICES[evt.target.value];
    });

    inputTimeIn.addEventListener('change', function () {
      inputTimeOut.value = inputTimeIn.value;
    });

    inputTimeOut.addEventListener('change', function () {
      inputTimeIn.value = inputTimeOut.value;
    });
    
  window.address = {
    fillAddress: function () {
      var addressInputCoords = getMapPinMainCoords();
      adAddress.value = addressInputCoords.x + ', ' + addressInputCoords.y;
    },
  };

  validationInput();

  var deactivateMap = function () {
    var map = document.querySelector('.map');
    map.classList.add('map--faded');
  };

  var deactivateAdsForm = function () {
    adsForm.classList.add('ad-form--disabled');
  };

  var removePins = function () {
    var removablePins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < removablePins.length; i++) {
      removablePins[i].remove();
    }
  };

  var removeCard = function () {
    var popUp = document.querySelector('.map__card');
    if (popUp) {
      popUp.remove();
    }
  };

  var addMarkListeners = function () {
    window.marker.mark.addEventListener('mousedown', window.map.markClickHandler);
    window.marker.mark.addEventListener('keydown', window.map.enterPressHandler);
  };

  var resetMark = function () {
    window.marker.mark.style.left = MARK_START_X + 'px';
    window.marker.mark.style.top = MARK_START_Y + 'px';
    window.form.drawMarkPosition(window.marker.MARK_WIDTH / 2, window.marker.MARK_WIDTH / 2);
  };

  var resetInputPlaceholder = function () {
    inputPrice.placeholder = HOUSING_MIN_PRICES.bungalo;
  };

  var generateSuccessMessage = function () {
    var element = document.querySelector('#success').content.querySelector('.success ');
    var successMessage = element.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);

    var success = document.querySelector('.success');

    var messageClickHandler = function () {
      success.remove();
      removeClickHandler();
    };

    var messageKeyDownHandler = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        messageClickHandler();
      }
    };

    document.addEventListener('click', messageClickHandler);
    document.addEventListener('keydown', messageKeyDownHandler);

    var removeClickHandler = function () {
      success.removeEventListener('click', messageClickHandler);
      document.removeEventListener('keydown', messageKeyDownHandler);
    };
  };

  var uploadHandler = function () {
    adsForm.reset();
    deactivateAdsForm();
    deactivateMap();
    removePins();
    removeCard();
    addMarkListeners();
    resetMark();
    resetInputPlaceholder();
    generateSuccessMessage();
  };

  adsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adsForm), uploadHandler, window.data.errorHandler);
  });
})();
