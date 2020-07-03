'use strict';

(function () {

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');


  var drag = function (evt) {
    evt.preventDefault();
    var initialCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapBorder = {
      TOP: DragLimit.Y.MIN - mapPinMain.offsetHeight,
      BOTTOM: DragLimit.Y.MAX - mapPinMain.offsetHeight,
      LEFT: DragLimit.X.MIN,
      RIGHT: DragLimit.X.MAX - mapPinMain.offsetWidth
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: initialCoords.x - moveEvt.clientX,
        y: initialCoords.y - moveEvt.clientY
      };

      initialCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mainPinPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      if (mainPinPosition.x >= mapBorder.LEFT && mainPinPosition.x <= mapBorder.RIGHT) {
        mapPinMain.style.left = mainPinPosition.x + 'px';
      }

      if (mainPinPosition.y >= mapBorder.TOP && mainPinPosition.y <= mapBorder.BOTTOM) {
        mapPinMain.style.top = mainPinPosition.y + 'px';
      }

      window.address.fillAddress();

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      map.removeEventListener('mousemove', onMouseMove);
      map.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    map.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', drag);


})();
