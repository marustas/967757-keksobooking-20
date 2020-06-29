
'use strict';

(function () {

  var TypesRoomRus = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var Photo = {
    PHOTO_NAME: 'Фотография жилья',
    PHOTO_WIDTH: '45',
    PHOTO_HEIGHT: '40'
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapCard = document.querySelector('#card').content.querySelector('.map__card');
  var advertisementCard = mapCard.cloneNode(true);
  var popupClose = advertisementCard.querySelector('.popup__close');

  var getPhotoRoom = function (photoSrc, fragment) {
    var popupPhotoItem = document.createElement('img');
    popupPhotoItem.className = 'popup__photo';
    popupPhotoItem.src = photoSrc;
    popupPhotoItem.alt = Photo.PHOTO_NAME;
    popupPhotoItem.width = Photo.PHOTO_WIDTH;
    popupPhotoItem.height = Photo.PHOTO_HEIGHT;
    fragment.appendChild(popupPhotoItem);
  };

  var createPhotosFragment = function (elem) {
    var photosFragment = document.createDocumentFragment();
    var elemPhoto = elem.offer.photos;
    var popupPhotos = advertisementCard.querySelector('.popup__photos');
    popupPhotos.innerHTML = '';
    if (elemPhoto.length === 0) {
      popupPhotos.style.display = 'none';
    } else {
      popupPhotos.style.display = 'block';
      elemPhoto.forEach(function (photoSrc) {
        getPhotoRoom(photoSrc, photosFragment);
      });
    }
    return photosFragment;
  };

  var getFeature = function (popapFeat, fragment) {
    var featureItem = document.createElement('li');
    featureItem.className = 'popup__feature popup__feature--' + popapFeat;
    fragment.appendChild(featureItem);
  };

  var createFeatureFragment = function (elem) {
    var featureFragment = document.createDocumentFragment();
    var element = elem.offer.features;
    var popupFeatures = advertisementCard.querySelector('.popup__features');
    popupFeatures.innerHTML = '';
    if (element.length === 0) {
      popupFeatures.style.display = 'none';
    } else {
      popupFeatures.style.display = 'block';
      element.forEach(function (popapFeat) {
        getFeature(popapFeat, featureFragment);
      });
    }

    return featureFragment;
  };

  var onPopupClik = function (evt) {
    window.utils.mouseClik(evt, advertisementCard.remove());
  };
  var onPopupClose = function () {
    advertisementCard.remove();
  };

  var onPopupEsc = function (evt) {
    window.utils.keyEsc(evt, onPopupClose);
  };

  popupClose.addEventListener('mousedown', onPopupClik);

  map.addEventListener('keydown', onPopupEsc);

  window.card = {

    createAd: function (card) {
      advertisementCard.querySelector('.popup__avatar').src = card.author.avatar;
      advertisementCard.querySelector('.popup__title').textContent = card.offer.title;
      advertisementCard.querySelector('.popup__text--address').textContent = card.offer.address;
      advertisementCard.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
      advertisementCard.querySelector('.popup__type').textContent = TypesRoomRus[card.offer.type];
      advertisementCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
      advertisementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
      advertisementCard.querySelector('.popup__features').appendChild(createFeatureFragment(card));
      advertisementCard.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
      advertisementCard.querySelector('.popup__description').textContent = card.offer.description;

      mapFiltersContainer.insertAdjacentElement('beforebegin', advertisementCard);


      return advertisementCard;
    },
  };


})();
