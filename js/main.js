'use strict';

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
var COUNT_OBJ = 8;

// Creates random number
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Creates random number due to the massive length
var getRandom = function (arr) {
  return Math.floor(Math.random() * arr.length - 1);
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
  return x + ',' + y;
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
  for (var i = 0; i < COUNT_OBJ; i++) {
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

var element = document.querySelector('.map');
element.classList.remove('map--faded');

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

var pinContainerElem = element.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins());
