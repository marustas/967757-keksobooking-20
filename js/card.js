'use strict';
(function () {
  var map = document.querySelector('.map');
  var offerCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var createPhotosHtml = function (photos) {
    var photoTag = '';
    for (var i = 0; i < photos.length; i++) {
      photoTag += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }
    return photoTag;
  };

  var createFeaturesHtml = function (features) {
    var featuresTag = '';
    for (var i = 0; i < features.length; i++) {
      featuresTag += '<li class="popup__feature popup__feature--' + features[i] + '">' + features[i] + '</li>';
    }
    return featuresTag;
  };

  var createOfferCard = function (ad) {
    var offerCard = offerCardTemplate.cloneNode(true);
    var type = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    offerCard.querySelector('.popup__title').textContent = ad.offer.title;
    offerCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    offerCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    offerCard.querySelector('.popup__type').textContent = type[ad.offer.type];
    offerCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей.';
    offerCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    offerCard.querySelector('.popup__features').innerHTML = createFeaturesHtml(ad.offer.features);
    offerCard.querySelector('.popup__description').textContent = ad.offer.description;
    offerCard.querySelector('.popup__photos').innerHTML = createPhotosHtml(ad.offer.photos);
    offerCard.querySelector('.popup__avatar').src = ad.author.avatar;
    return offerCard;
  };

  var removeCard = function () {
    map.querySelector('.popup__close').removeEventListener('click', removeCard);
    document.removeEventListener('keydown', cardEscPressHandler);
    map.querySelector('.map__card').remove();
  };

  var cardEscPressHandler = function (evt) {
    window.util.escEvent(evt, removeCard);
  };

  window.card.renderAd = function (currentAd) {
    if (map.querySelector('.map__card')) {
      removeCard();
    }
    map.insertBefore(createOfferCard(currentAd), document.querySelector('.map__filters-container'));
    map.querySelector('.popup__close').addEventListener('click', removeCard);
    document.addEventListener('keydown', cardEscPressHandler);
  };

})();
