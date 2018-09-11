
export default {
  createElement(element, attrs, parentNode = null, textContent = null, events) {
    let e = document.createElement(element);
    e.textContent = textContent;

    if (attrs && attrs.length) {
      attrs.forEach((attribute) => {
        let key = Object.keys(attribute)[0];
        let values = Object.values(attribute)[0];

        if (Array.isArray(values)) {
          values.forEach((value) => {
            e.setAttribute(key, value);
          });
        } else {
          e.setAttribute(key, values);
        }
      });
    }

    if (events) {
      let event = Object.keys(events)[0];
      let callback = Object.values(events)[0];
      e.addEventListener(event, callback);
    };

    if (parentNode) parentNode.append(e);

    return e;
  },
};
