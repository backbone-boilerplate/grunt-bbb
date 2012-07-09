var token = {};

function normalize(obj) {
  if (obj && obj.__marked__ !== token) {
    function next(key, val) {
      if (val && typeof val === "object") {
        // Mark this for future iteration.
        val.__proto__.__marked__ = token;

        normalize(val);
      } else if (typeof val === "function") {
        obj[key] = { __type__: "function", __src__: val.toString() };
      } else {
        obj[key] = val;
      }
    }

    if (Array.isArray(obj)) {
      obj.forEach(function(val, key) {
        next(key, val);
      });
    } else if (obj && typeof obj === "object") {
      obj = Object.create(obj);

      for (var key in obj) {
        next(key, obj[key]);
      }
    } else if (obj && typeof obj === "function") {
      return { __type__: "function", __src__: obj.toString() };
    }
  }

  return obj;
}

function nav(url) {
  Backbone.history.navigate(url, true);
}
