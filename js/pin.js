'use strict';
(function () {
  var WIDTH_PIN = 50;
  var HEIGHT_PIN = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarMapPin = document.querySelector('.map__pins');

  var createMapPin = function (pin) {
    var mapPin = mapPinTemplate.cloneNode(true);
    mapPin.style.left = (pin.location.x - WIDTH_PIN / 2) + 'px';
    mapPin.style.top = (pin.location.y - HEIGHT_PIN) + 'px';
    mapPin.querySelector('img').src = pin.author.avatar;
    mapPin.querySelector('img').alt = pin.offer.title;
    return mapPin;
  };
  var renderMapPin = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.ads.length; i++) {
      fragment.appendChild(createMapPin(window.ads[i]));
    }
    similarMapPin.appendChild(fragment);
  };


  window.pin = {
    WIDTH_PIN: WIDTH_PIN,
    renderMapPin: renderMapPin,
  };

})();
