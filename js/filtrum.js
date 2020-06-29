'use strict';

(function () {
  var PINS_LIMIT = 5;

  var PriceRange = {
    Low: {
      MIN: 0,
      MAX: 10000
    },
    Middle: {
      MIN: 10000,
      MAX: 50000
    },
    High: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestsSelect = document.querySelector('#housing-guests');
  var featuresFieldset = document.querySelector('#housing-features');
  var data = [];
  var filteredData = [];

  var filterItem = function (it, item, key) {
    return it.value === 'any' ? true : it.value === item[key].toString();
  };

  var filterByType = function (item) {
    return filterItem(typeSelect, item.offer, 'type');
  };

  var filterByPrice = function (item) {
    var filteringPrice = PriceRange[priceSelect.value.toUpperCase()];
    return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
  };

  var filterByRooms = function (item) {
    return filterItem(roomsSelect, item.offer, 'rooms');
  };

  var filterByGuests = function (item) {
    return filterItem(guestsSelect, item.offer, 'guests');
  };

  var filterByFeatures = function (item) {
    var checkedFeaturesItems = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < mapPinsItems.length; j++) {
      mapPinsItems[j].remove();
    }
  };

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var onFilterChange = function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filterByType);
    filteredData = filteredData.filter(filterByPrice);
    filteredData = filteredData.filter(filterByRooms);
    filteredData = filteredData.filter(filterByGuests);
    filteredData = filteredData.filter(filterByFeatures);
    removePins();
    removeMapCard();
    window.pins.renderPins(filteredData.slice(0, PINS_LIMIT));
  };

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    onFilterChange();
    filter.addEventListener('change', onFilterChange);
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  window.filter = {
    activateFiltration: function (adData) {
      data = adData.slice(0);
      activateFilter();
      return adData.slice(0, PINS_LIMIT);
    },

    deactivateFiltration: function () {
      deactivateFilter();
      filter.reset();
    }
  };

})();
