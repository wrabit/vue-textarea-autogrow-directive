const TextareaAutogrowDirective = {
  name: 'autogrow',
  inserted: function (el) {
    let observe, minHeight;

    // If used in a component library such as buefy, a wrapper will be used on the component so check if a child is the textarea
    el = el.tagName.toLowerCase() === 'textarea' ? el : el.querySelector('textarea')

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

    let resize = () => {
      el.style.height = "auto";
      let border = el.style.borderTopWidth * 2;
      el.style.setProperty("height", (( el.scrollHeight < minHeight ? minHeight : el.scrollHeight ) + border) + "px", "important");
    };

    // 0-timeout to get the already changed el
    let delayedResize = () => {
      window.setTimeout(resize, 0);
    };

    // When the textarea is being shown / hidden
    var respondToVisibility = (element, callback) => {
      let intersectionObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio > 0) callback();
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
const VueTextareaAutogrowDirective = {
  install(Vue) {
    Vue.directive(TextareaAutogrowDirective.name, TextareaAutogrowDirective);
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTextareaAutogrowDirective)
}

export default VueTextareaAutogrowDirective

export { TextareaAutogrowDirective }