(function(){
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
       // 1. Let O be ? ToObject(this value).
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        var o = Object(this);
        // 2. Let len be ? ToLength(? Get(O, "length")).
        var len = o.length >>> 0;
        // 3. If IsCallable(predicate) is false, throw a TypeError exception.
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
        var thisArg = arguments[1];
        // 5. Let k be 0.
        var k = 0;
        // 6. Repeat, while k < len
        while (k < len) {
          // a. Let Pk be ! ToString(k).
          // b. Let kValue be ? Get(O, Pk).
          // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
          // d. If testResult is true, return kValue.
          var kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          // e. Increase k by 1.
          k++;
        }
        // 7. Return undefined.
        return undefined;
      },
      configurable: true,
      writable: true
    });
  }
  var open = document.querySelector(".main-contacts__button");
  var popup = document.querySelector(".modal-write-us");
  var close = popup.querySelector(".modal-close");
  var names = popup.querySelector("p:first-child input");
  var form = popup.querySelector("form");
  var email = popup.querySelector("[name=email]");
  var isStorageSupport = true;
  var storage = "";
  try {
    storage = localStorage.getItem("login");
  } catch (err) {
    isStorageSupport = false;
  }
  open.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");
  if (storage) {
    names.value = storage;
    email.focus();
  } else {
    names.focus();
  }
});
  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    popup.classList.remove("modal-error");
  })
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if (!names.value || !email.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("p:first-child input", names.value);
    }
  }
  })
  window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
var mapOpen = document.querySelector(".main-contacts__map");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");
mapOpen.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});
mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-show");
});
var removeClasses = function(elems, className) {
  elems.forEach(function (elem) {
    elem.classList.remove(className);
  });
}
var initSlider = function (prefix, activeControlClass, activeContentClass) {
var controls = Array.prototype.slice.call(document.querySelectorAll("[data-" + prefix + "-control]"));
var contents = Array.prototype.slice.call(document.querySelectorAll("[data-" + prefix + "-content]"));
controls.forEach(function (control) { 
  control.addEventListener("click", function (evt) {
    evt.preventDefault();
    removeClasses(contents, activeContentClass);
    removeClasses(controls, activeControlClass);
    control.classList.add(activeControlClass);
    var currentContent = contents.find(function (content) { 
      return content.dataset[prefix + "Content"] === control.dataset[prefix + "Control"];
    });
    if (currentContent) {
      currentContent.classList.add(activeContentClass);
    }
  });
});
};
initSlider("slider", "slide__change-button_active", "slide-wrapper_visible");
initSlider("options", "service-option__button_active", "service-option_visible");
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
    }
  }
});
})();