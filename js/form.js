'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFields = adForm.children;
  var addressField = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var houseType = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFields = mapFilters.children;
  var WIDTH_MAIN_PIN = 65;
  var HEIGHT_MAIN_PIN = 65;
  var HEIGHT_MAIN_PIN_ARROW = 80;

  var getAdAddress = function (x, y) {
    addressField.value = Math.round(mapPinMain.offsetLeft + x) + ', ' + Math.round(mapPinMain.offsetTop + y);
  };

  var setAttrDisable = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', 'disabled');
    }
  };

  var removeAttrDisable = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled', 'disabled');
    }
  };

  var checkAdForm = function () {
    var roomNumberValue = +roomNumber.value;
    var capacityValue = +capacity.value;
    if (roomNumberValue < capacityValue) {
      capacity.setCustomValidity('Кол-во комнат слишком мало для Ваших гостей');
    } else if (roomNumberValue === 100 && capacityValue !== 0) {
      capacity.setCustomValidity('Кол-во комнат не для гостей');
    } else if (roomNumberValue !== 100 && capacityValue === 0) {
      capacity.setCustomValidity('Данное кол-во комнта не для');
    } else {
      capacity.setCustomValidity('');
    }
  };

  adForm.addEventListener('submit', function (evt) {
    checkAdForm();
    adForm.reportValidity();
    if (!adForm.checkValidity()) {
      evt.preventDefault();
    }
  });

  roomNumber.addEventListener('change', function () {
    checkAdForm();
    capacity.reportValidity();
  });

  capacity.addEventListener('change', function () {
    checkAdForm();
    capacity.reportValidity();
  });

  var housingTypeMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  priceInput.setAttribute('min', housingTypeMinPrice[houseType.value]);
  priceInput.placeholder = housingTypeMinPrice[houseType.value];
  houseType.addEventListener('change', function (evt) {
    priceInput.value = '';
    priceInput.setAttribute('min', housingTypeMinPrice[evt.target.value]);
    priceInput.placeholder = housingTypeMinPrice[evt.target.value];
  });

  checkinTime.addEventListener('change', function () {
    checkoutTime.value = checkinTime.value;
  });
  checkoutTime.addEventListener('change', function () {
    checkinTime.value = checkoutTime.value;
  });

  setAttrDisable(adFormFields);
  setAttrDisable(mapFiltersFields);
  getAdAddress(WIDTH_MAIN_PIN / 2, HEIGHT_MAIN_PIN / 2);

  window.activateForm = function () {
    getAdAddress(WIDTH_MAIN_PIN / 2, HEIGHT_MAIN_PIN_ARROW);
    adForm.classList.remove('ad-form--disabled');
    removeAttrDisable(adFormFields);
    removeAttrDisable(mapFiltersFields);
  };

})();
