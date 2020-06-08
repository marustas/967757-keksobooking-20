'use strict';

var ENTER_KEYCODE = 13;
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
var LOCATION_X_WIDTH = 1200;
var LOCATION_X_HEIGHT = 10;
var PRICE = 1000;
var ROOMS = 5;
var GUEST = 4;
var TITLE = 'Зоголовок';
var DESCRIPTION = 'Описание';
var COUNT_PINS = 8;

var PIN_SIZE_X = 62;
var PIN_SIZE_Y = 62;
var PIN_POINTER_TOP = 18;

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

var getAddress = function (x, y) {
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
var getObjects = function () {
  var pins = [];
  for (var i = 0; i < COUNT_PINS; i++) {
    pins[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: getAddress(getLocationX(), getLocationY()),
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
  map.classList.remove('map--faded');
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
setlocation.setAttribute('value', getAddress(addressDefaultX, addressDefaultY));

activeAction.addEventListener('mousedown', function () {
  openMap();
  var pinPointerX = xPin + (PIN_SIZE_X / 2);
  var pinPointerY = yPin + PIN_SIZE_Y + PIN_POINTER_TOP;
  setlocation.setAttribute('value', getAddress(pinPointerX, pinPointerY));
});

activeAction.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openMap();
  }
});

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

var renderPins = function () {
  var result = document.createDocumentFragment();
  for (var i = 0; i < getObjects().length; i++) {
    result.appendChild(dataItemFragment(getObjects()[i]));
  }
  return result;
};

var pinContainerElem = map.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins());

// 3-3
var getTypeCard = function (type) {
  var result = '';
  switch (type) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'bungalo':
      result = 'Бунгало';
      break;
    case 'house':
      result = 'Дом';
      break;
    case 'palace':
      result = 'Дворец ';
      break;
  }
  return result;
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
  return card;
};

var renderCard = function () {
  var result = document.createDocumentFragment();
  result.appendChild(cardItemFragment(getObjects()[0]));
  return result;
};

var mapPopup = map.querySelector('.map__filters-container');
map.insertBefore(renderCard(), mapPopup);

// Validation

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

onRoomsChange();

formVision.addEventListener('change', function () {
  onRoomsChange();
});
