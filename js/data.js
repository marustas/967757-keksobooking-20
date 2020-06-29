'use strict';

(function () {

  var MOCK_DATA = [];
  var PINS_NUMBERS = 20;

  var generateData = function (data, fakeData, count, areAll) {
    var index = 0;
    if (areAll === true) {
      count = data.length;
    }
    while (index !== count) {
      var dataItem = data[index];
      fakeData.push({
        author: {
          avatar: dataItem.author.avatar
        },
        offer: {
          title: dataItem.offer.title,
          address: dataItem.offer.address,
          price: dataItem.offer.price,
          type: dataItem.offer.type,
          rooms: dataItem.offer.rooms,
          guests: dataItem.offer.guests,
          checkin: dataItem.offer.checkin,
          checkout: dataItem.offer.checkout,
          features: dataItem.offer.features,
          description: dataItem.offer.description,
          photos: dataItem.offer.photos,
        },
        location: {
          x: dataItem.location.x,
          y: dataItem.location.y
        }
      });

      fragment.appendChild(element);
      document.querySelector('main').appendChild(fragment);

      var error = document.querySelector('.error');
      var errorButton = error.querySelector('.error__button');

      var errorClickHandler = function () {
        error.remove();
        removeErrorClickHandler();
      };

      var errorKeyDownHandler = function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          errorClickHandler();
        }
      };

      var clickButtonHandler = function (evt) {
        evt.preventDefault();
        errorClickHandler();
      };

      var keyDownButtonHandler = function (evt) {
        evt.preventDefault();
        if (evt.keyCode === window.ENTER_KEYCODE) {
          errorClickHandler();
        }
      };

      error.addEventListener('click', errorClickHandler);
      document.addEventListener('keydown', errorKeyDownHandler);
      errorButton.addEventListener('click', clickButtonHandler);
      errorButton.addEventListener('click', keyDownButtonHandler);

      var removeErrorClickHandler = function () {
        error.removeEventListener('click', errorClickHandler);
        document.removeEventListener('keydown', errorKeyDownHandler);
        errorButton.removeEventListener('click', clickButtonHandler);
        errorButton.removeEventListener('click', keyDownButtonHandler);
      };
    }
  };

  window.data = {
    generateData: generateData,
    MOCK_DATA: MOCK_DATA,
    PINS_NUMBERS: PINS_NUMBERS
  };
})();
