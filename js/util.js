'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var enterEvent = function (evt, func) {
    if (evt.keyCode === ENTER_KEYCODE) {
      func();
    }
  };

  var escEvent = function (evt, func) {
    if (evt.keyCode === ESC_KEYCODE) {
      func();
    }
  };


  window.util = {
    enterEvent: enterEvent,
    escEvent: escEvent
  };
})();
