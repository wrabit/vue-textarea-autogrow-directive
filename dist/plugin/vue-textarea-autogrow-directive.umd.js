(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.VueTextareaAutogrowDirective = {}));
}(this, (function (exports) { 'use strict';

  var TextareaAutogrowDirective = {
    name: 'autogrow',
    inserted: function (el) {
      var observe, minHeight;

      // If used in a component library such as buefy, a wrapper will be used on the component so check if a child is the textarea
      el = el.tagName.toLowerCase() === 'textarea' ? el : el.querySelector('textarea');

      minHeight = parseFloat(getComputedStyle(el).getPropertyValue("min-height"));

      if (window.attachEvent) {
        observe = function (element, event, handler) {
          element.attachEvent("on" + event, handler);
        };
      } else {
        observe = function (element, event, handler) {
          element.addEventListener(event, handler, false);
        };
      }

      var resize = function () {
        el.style.height = "auto";
        var border = el.style.borderTopWidth * 2;
        el.style.height =
          (el.scrollHeight < minHeight ? minHeight : el.scrollHeight) +
          border +
          "px";
      };

      // 0-timeout to get the already changed el
      var delayedResize = function () {
        window.setTimeout(resize, 0);
      };

      // When the textarea is being shown / hidden
      var respondToVisibility = function (element, callback) {
        var intersectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
              if (entry.intersectionRatio > 0) { callback(); }
            });
          }, {
            root: document.documentElement
          }
        );

        intersectionObserver.observe(element);
      };

      respondToVisibility(el, resize);
      observe(el, "change", resize);
      observe(el, "cut", delayedResize);
      observe(el, "paste", delayedResize);
      observe(el, "drop", delayedResize);
      observe(el, "input", resize);

      resize();
    }
  };

  // eslint-disable-next-line no-unused-vars
  var VueTextareaAutogrowDirective = {
    install: function install(Vue) {
      Vue.directive(TextareaAutogrowDirective.name, TextareaAutogrowDirective);
    }
  };

  // Automatic installation if Vue has been added to the global scope.
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueTextareaAutogrowDirective);
  }

  exports.TextareaAutogrowDirective = TextareaAutogrowDirective;
  exports.default = VueTextareaAutogrowDirective;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
