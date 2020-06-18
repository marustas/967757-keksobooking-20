'use strict';
(function () {
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

