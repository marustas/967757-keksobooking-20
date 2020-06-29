
'use strict';

(function () {

  var UPLOAD = 'https://javascript.pages.academy/keksobooking';
  var LOAD = 'https://javascript.pages.academy/keksobooking/data';

  var setup = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
=======
  var TIMEOUT_DURATION = 5000;
  var STATUS_OK = 200;

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad) {
      var xhr = setup(onLoad);
      xhr.open('POST', UPLOAD);
      xhr.send(data);
    },
    load: function (onLoad) {
      var xhr = setup(onLoad);
      xhr.open('GET', LOAD);
      xhr.send();
      
    upload: function (data, onLoad, onError) {
      var URL = 'https://javascript.pages.academy/keksobooking';

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      handleErrors(xhr, onLoad, onError);

      xhr.timeout = TIMEOUT_DURATION;

      xhr.open('POST', URL);
      xhr.send(data);

    }
  };

})();
