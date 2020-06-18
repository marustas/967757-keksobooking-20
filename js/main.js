'use strict';

(function () {
// Module data.js
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var FEATURES_MIN = 1;
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  var PHOTOS_MIN = 1;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;
  var LOCATION_X_WIDTH = 1130;
  var LOCATION_X_HEIGHT = 10;
  var PRICE = 1000;
  var ROOMS = 5;
  var GUEST = 4;
  var TITLE = 'Зоголовок';
  var DESCRIPTION = 'Описание';
  var COUNT_PINS = 8;

  // Creates random number
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Creates random number due to the massive length
  var getRandom = function (arr) {
    return Math.ceil(Math.random() * arr.length - 1);
  };

  // Returns uniq massive
  var getUniqRandomArray = function (array, randomNumber) {
    var arr = [];
    while (arr.length < randomNumber) {
      var item = array[getRandomIntInclusive(0, array.length - 1)];
      if (arr.indexOf(item) === -1) {
        arr.push(item);
      }
    }
    return arr;
  };

  var getType = function () {
    var num = getRandom(TYPE);
    return TYPE[num];
  };

  var getCheckin = function () {
    var num = getRandom(CHECKIN_TIME);
    return CHECKIN_TIME[num];
  };

  var getCheckout = function () {
    var num = getRandom(CHECKOUT_TIME);
    return CHECKOUT_TIME[num];
  };

  window.getAddress = function (x, y) {
    return x + ', ' + y;
  };

  var getPhotos = function () {
    var num = getRandomIntInclusive(PHOTOS_MIN, PHOTOS.length);
    return getUniqRandomArray(PHOTOS, num);
  };

  var getFeatures = function () {
    var num = getRandomIntInclusive(FEATURES_MIN, FEATURES.length);
    return getUniqRandomArray(FEATURES, num);
  };

  var getLocationX = function () {
    return getRandomIntInclusive(LOCATION_X_WIDTH, LOCATION_X_HEIGHT);
  };

  var getLocationY = function () {
    return getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX);
  };

  // Returns ad
  window.getObjects = function () {
    var pins = [];
    for (var i = 0; i < COUNT_PINS; i++) {
      pins[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLE,
          address: window.getAddress(getLocationX(), getLocationY()),
          price: PRICE,
          type: getType(),
          rooms: ROOMS,
          guests: GUEST,
          checkin: getCheckin(),
          checkout: getCheckout(),
          features: getFeatures(),
          description: DESCRIPTION,
          photos: getPhotos()
        },
        location: {
          x: getLocationX(),
          y: getLocationY()
        }
      };
    }
    return pins;
  };

})();

(function () {
  // Module map.js
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

(function () {
  // Module card.js
  var getTypeCard = function (type) {
    switch (type) {
      case 'flat':
        return 'Квартира';
      case 'bungalo':
        return 'Бунгало';
      case 'house':
        return 'Дом';
      case 'palace':
        return 'Дворец ';
    }
    return type;
  };

  var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');

  var cardItemFragment = function (item) {
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = item.offer.title;
    card.querySelector('.popup__text--address').textContent = item.offer.address;
    card.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = getTypeCard(item.offer.type);
    card.querySelector('.popup__text--capacity').textContent = item.offer.guests + 'комнаты для ' + item.offer.rooms + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkout + ' , выезд до ' + item.offer.checkin;
    card.querySelector('.popup__description').textContent = item.offer.description;
    card.querySelector('.popup__avatar').src = item.author.avatar;

    var features = card.querySelector('.popup__features');
    for (var j = 0; j < item.offer.features.length; j++) {
      if (item.offer.features.indexOf(item.offer.features[j]) >= 0) {
        var elementForFeatures = document.createElement('li');
        elementForFeatures.classList.add('popup__feature', 'popup__feature--' + item.offer.features[j]);
        features.appendChild(elementForFeatures);
      }
    }

    var photos = card.querySelector('.popup__photos');
    for (var z = 0; z < item.offer.photos.length; z++) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = item.offer.photos[z];
      img.alt = 'Фотография жилья';
      img.style.width = '45px';
      img.style.height = '40px';
      photos.appendChild(img);
    }
    card.classList.add('hidden');
    return card;
  };

  window.renderCard = function () {
    var result = document.createDocumentFragment();
    for (var e = 0; e < window.pins.length; e++) {
      result.appendChild(cardItemFragment(window.pins[e]));
    }
    return result;
  };

})();

(function () {
// Module pin.js
  var pinTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');

  var dataItemFragment = function (item) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = item.location.x + 'px';
    pin.style.top = item.location.y + 'px';
    var img = pin.querySelector('img');
    img.src = item.author.avatar;
    img.alt = item.offer.title;
    return pin;
  };

  window.renderPins = function () {
    var result = document.createDocumentFragment();
    for (var i = 0; i < window.pins.length; i++) {
      result.appendChild(dataItemFragment(window.pins[i]));
    }
    return result;
  };

})();

(function () {
// Module form.js
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MAX_VALUE_PRICE = 1000000;
  var PRICE_BUNGALO = 0;
  var PRICE_FLAT = 1000;
  var PRICE_HOUSE = 5000;
  var PRICE_PALACE = 10000;

  var form = document.querySelector('.ad-form');

  var onRoomsChange = function () {

    guests.setCustomValidity('');

    if (rooms.value === '1' && guests.value !== '1') {
      guests.setCustomValidity('В комнате может находиться только 1 гость');
    } else if (guests.value !== '2' && guests.value !== '1' && rooms.value === '2') {
      guests.setCustomValidity('В комнате может находиться только 1 или 2 гостя');
    } else if (rooms.value === '3' && guests.value === '0') {
      guests.setCustomValidity('В комнате может находиться 1 или 2 или 3 гостя');
    } else if (rooms.value === '100' && guests.value !== '0') {
      guests.setCustomValidity('"Это не жилое помещение');
    } else {
      guests.setCustomValidity('');
    }
  };

  var rooms = document.querySelector('#room_number');
  var guests = document.querySelector('#capacity');

  form.addEventListener('change', function () {
    onRoomsChange();
  });

  var titleForm = form.querySelector('#title');
  titleForm.setAttribute('required', 'required');
  titleForm.setAttribute('minlength', MIN_LENGTH_TITLE);
  titleForm.setAttribute('maxlength', MAX_LENGTH_TITLE);

  var priceForm = form.querySelector('#price');
  priceForm.setAttribute('required', 'required');
  priceForm.setAttribute('type', 'number');
  priceForm.setAttribute('max', MAX_VALUE_PRICE);

  var typeForm = form.querySelector('#type');
  typeForm.addEventListener('change', function () {
    switch (typeForm.value) {
      case 'flat':
        priceForm.setAttribute('min', PRICE_FLAT);
        priceForm.setAttribute('placeholder', PRICE_FLAT);
        break;
      case 'bungalo':
        priceForm.setAttribute('min', PRICE_BUNGALO);
        priceForm.setAttribute('placeholder', PRICE_BUNGALO);
        break;
      case 'house':
        priceForm.setAttribute('min', PRICE_HOUSE);
        priceForm.setAttribute('placeholder', PRICE_HOUSE);
        break;
      case 'palace':
        priceForm.setAttribute('min', PRICE_PALACE);
        priceForm.setAttribute('placeholder', PRICE_PALACE);
        break;
    }
  });

  var addressForm = form.querySelector('#address');
  addressForm.setAttribute('readonly', 'readonly');

  var timeoutForm = form.querySelector('#timeout');
  var timeinForm = form.querySelector('#timein');

  timeinForm.addEventListener('change', function () {
    timeoutForm.value = timeinForm.value;
  });
  timeoutForm.addEventListener('change', function () {
    timeinForm.value = timeoutForm.value;
  });

})();
