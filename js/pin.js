'use strict';

(function () {

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
