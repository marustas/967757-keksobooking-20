'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var errorButton = error.querySelector('.error__button');

  var successElement;
  var errorElement;

  var uploadForm = function (evt) {
    var formData = new FormData(adForm);
    window.backend.upload(formData, uploadSucceed, uploadFail);
    evt.preventDefault();
  };

  var uploadSucceed = function () {
    window.page.deactivatePage();
    adForm.reset();
    document.querySelector('main').appendChild(success);
    successElement = document.querySelector('.success');
  };

  var uploadFail = function () {
    document.querySelector('main').appendChild(error);
    errorElement = document.querySelector('.error');
  };

  var RemoveElementKey = function () {
    success.remove();
    error.remove();
  };

  var onKeyClose = function (evt) {
    window.utils.keyEsc(evt, RemoveElementKey);
    window.utils.keyEsc(evt, RemoveElementKey);
  };

  var onButtonClick = function () {
    error.remove();
  };

  var removeElemClick = function (evt) {
    if (evt.target === successElement || errorElement) {
      success.remove();
      error.remove();
    }
  };

  errorButton.addEventListener('click', onButtonClick);
  success.addEventListener('click', removeElemClick);
  error.addEventListener('click', removeElemClick);

  document.addEventListener('keydown', onKeyClose);
  document.addEventListener('keydown', onKeyClose);

  adForm.addEventListener('submit', uploadForm);


})();
