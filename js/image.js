'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarFile = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoFile = document.querySelector('.ad-form__upload');
  var photoDiv = document.querySelector('.ad-form__photo');

  var setFileSelectHandler = function (evt, preview) {
    var fileChooser = evt.currentTarget;
    var files = Array.from(evt.target.files);
    files.forEach(function (file, i) {
      var currentIndex = i;
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (fileChooser === photoFile) {
            if (currentIndex === 0) {
              photoDiv.remove();
            }
            addNewPhotoDiv(createNewPhoto(fileName, reader.result));
          } else {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var createNewPhoto = function (fileName, link) {
    var newPhotoDiv = createNewDiv();
    var img = document.createElement('img');
    img.src = link;
    img.title = fileName;
    img.width = 70;
    img.height = 70;
    newPhotoDiv.appendChild(img);
    return newPhotoDiv;
  };

  var addNewPhotoDiv = function (div) {
    photoContainer.insertBefore(div, photoContainer.lastChild);
  };

  var createNewDiv = function () {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    return div;
  };

  var resetForm = function () {
    avatarPreview.src = 'img/muffin-grey.svg';
    resetPhotoContainer();
  };

  var resetPhotoContainer = function () {
    photoContainer.innerHTML = '';
    photoContainer.appendChild(photoFile);
    photoDiv = createNewDiv();
    addNewPhotoDiv(photoDiv);
  };

  var returnAvatar = function (evt) {
    setFileSelectHandler(evt, avatarPreview);
  };

  photoFile.addEventListener('change', setFileSelectHandler);
  avatarFile.addEventListener('change', returnAvatar);

  window.image = {
    resetForm: resetForm,
  };

})();
