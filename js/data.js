'use strict';
(function () {
  var AD_ARR_LENGTH = 8;
  var AUTHOR_AVATARS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  var OFFER_TITLES = ['Сдам', 'Не дорогое жильё', 'По суточное жильё', 'Сдам выгодно'];
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_DESCRIPTIONS = ['Бесплатные печеньки', 'Все супер уютно', 'Самый большой телевизон', 'Есть джакузи', 'Нет мебели, только стены, пол, потолок', 'Жильё премиум класса, есть ФСЁ!'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PRICE_MIN = 100;
  var PRICE_MAX = 10000;
  var ROOMS_MIN = 1;
  var ROOMS_MAX = 15;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 8;
  var PIN_Y_START = 130;
  var PIN_Y_END = 630;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItemArr = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var getRandomLengthArr = function (arr) {
    return arr.slice(getRandomNumber(0, arr.length - 1));
  };

  var getAdArr = function () {
    var adArr = [];
    var locationX;
    var locationY;
    for (var i = 0; i < AD_ARR_LENGTH; i++) {
      locationX = getRandomNumber(window.pin.WIDTH_PIN, document.querySelector('.map').clientWidth);
      locationY = getRandomNumber(PIN_Y_START, PIN_Y_END);
      adArr[i] = {
        'author': {
          'avatar': 'img/avatars/user' + getRandomItemArr(AUTHOR_AVATARS) + '.png',
        },
        'offer': {
          'title': getRandomItemArr(OFFER_TITLES),
          'address': locationX + ', ' + locationY,
          'price': getRandomNumber(PRICE_MIN, PRICE_MAX),
          'type': getRandomItemArr(OFFER_TYPES),
          'rooms': getRandomNumber(ROOMS_MIN, ROOMS_MAX),
          'guests': getRandomNumber(GUESTS_MIN, GUESTS_MAX),
          'checkin': getRandomItemArr(OFFER_CHECKIN_TIMES),
          'checkout': getRandomItemArr(OFFER_CHECKOUT_TIMES),
          'features': getRandomLengthArr(OFFER_FEATURES),
          'description': getRandomItemArr(OFFER_DESCRIPTIONS),
          'photos': getRandomLengthArr(OFFER_PHOTOS),
        },
        'location': {
          'x': locationX,
          'y': locationY,
        }
      };
    }
    return adArr;
  };
  window.ads = getAdArr();
})();
