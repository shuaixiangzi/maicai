"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _createNamespace = (0, _utils.createNamespace)('empty'),
    createComponent = _createNamespace[0],
    bem = _createNamespace[1];

var PRESETS = ['error', 'search', 'default', 'network'];

var _default = createComponent({
  props: {
    description: String,
    image: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    url: function url() {
      if (PRESETS.indexOf(this.image) !== -1) {
        return "https://img.yzcdn.cn/vant/empty-image-" + this.image + ".png";
      }

      return this.image;
    }
  },
  methods: {
    genImage: function genImage() {
      var h = this.$createElement;
      var image = this.slots('image') || h("img", {
        "attrs": {
          "src": this.url
        }
      });
      return h("div", {
        "class": bem('image')
      }, [image]);
    },
    genDescription: function genDescription() {
      var h = this.$createElement;
      var description = this.slots('description') || this.description;

      if (description) {
        return h("p", {
          "class": bem('description')
        }, [description]);
      }
    },
    genBottom: function genBottom() {
      var h = this.$createElement;
      var slot = this.slots();

      if (slot) {
        return h("div", {
          "class": bem('bottom')
        }, [slot]);
      }
    }
  },
  render: function render() {
    var h = arguments[0];
    return h("div", {
      "class": bem()
    }, [this.genImage(), this.genDescription(), this.genBottom()]);
  }
});

exports.default = _default;