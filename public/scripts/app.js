"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log('app js is running');

var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "header" },
        React.createElement(
          "h1",
          { className: "display-4" },
          this.props.title
        ),
        this.props.subTitle && React.createElement(
          "p",
          { className: "lead" },
          this.props.subTitle
        )
      );
    }
  }]);

  return Header;
}(React.Component);

;

var Options = function (_React$Component2) {
  _inherits(Options, _React$Component2);

  function Options() {
    _classCallCheck(this, Options);

    return _possibleConstructorReturn(this, (Options.__proto__ || Object.getPrototypeOf(Options)).apply(this, arguments));
  }

  _createClass(Options, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement(
        "div",
        { className: "option-list mb-3" },
        React.createElement(
          "p",
          { className: "lead text-primary mt-5" },
          React.createElement(
            "strong",
            null,
            this.props.isHere
          )
        ),
        this.props.option.map(function (option) {
          return React.createElement(Option, { key: option, optiontext: option, removeSingleOption: _this3.props.removeSingleOption });
        }),
        React.createElement(
          "button",
          { disabled: this.props.optionIsHere, onClick: this.props.removeAllOptions, className: "btn btn-danger mt-3" },
          "Remove All Option"
        )
      );
    }
  }]);

  return Options;
}(React.Component);

;

var Option = function (_React$Component3) {
  _inherits(Option, _React$Component3);

  function Option() {
    _classCallCheck(this, Option);

    return _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).apply(this, arguments));
  }

  _createClass(Option, [{
    key: "render",
    value: function render() {
      var _this5 = this;

      return React.createElement(
        "div",
        { className: "border-bottom justify-content-center py-3" },
        React.createElement(
          "span",
          { className: "mr-2" },
          this.props.optiontext
        ),
        React.createElement(
          "button",
          { onClick: function onClick() {
              _this5.props.removeSingleOption(_this5.props.optiontext);
            }, className: "btn btn-danger" },
          "Remove"
        )
      );
    }
  }]);

  return Option;
}(React.Component);

var Form = function (_React$Component4) {
  _inherits(Form, _React$Component4);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this6 = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this6.addOptions = _this6.addOptions.bind(_this6);
    _this6.state = {
      error: undefined
    };
    return _this6;
  }

  _createClass(Form, [{
    key: "addOptions",
    value: function addOptions(e) {
      e.preventDefault();
      var value = e.target.elements.option.value.trim();
      var error = this.props.addOption(value);
      this.setState(function (e) {
        return {
          error: error
        };
      });
      if (!error) {
        e.target.elements.option.value = '';
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "from-group" },
        React.createElement(
          "form",
          { onSubmit: this.addOptions },
          this.state.error && React.createElement(
            "p",
            null,
            this.state.error
          ),
          React.createElement(
            "div",
            { className: "input-group" },
            React.createElement("input", { className: "form-control", type: "text", name: "option" }),
            React.createElement(
              "button",
              { className: "btn btn-primary" },
              "Add Option"
            )
          )
        )
      );
    }
  }]);

  return Form;
}(React.Component);

;

var MyApp = function (_React$Component5) {
  _inherits(MyApp, _React$Component5);

  function MyApp(props) {
    _classCallCheck(this, MyApp);

    var _this7 = _possibleConstructorReturn(this, (MyApp.__proto__ || Object.getPrototypeOf(MyApp)).call(this, props));

    _this7.removeAllOptions = _this7.removeAllOptions.bind(_this7);
    _this7.addOption = _this7.addOption.bind(_this7);
    _this7.removeSingleOption = _this7.removeSingleOption.bind(_this7);
    _this7.state = {
      options: []
    };
    return _this7;
  }

  _createClass(MyApp, [{
    key: "removeAllOptions",
    value: function removeAllOptions() {
      this.setState(function () {
        return {
          options: []
        };
      });
    }
  }, {
    key: "addOption",
    value: function addOption(option) {
      if (!option) {
        return "Add Valid value";
      } else if (this.state.options.indexOf(option) > -1) {
        return 'This value already exists';
      }
      this.setState(function (e) {
        return {
          options: e.options.concat([option])
        };
      });
    }
  }, {
    key: "removeSingleOption",
    value: function removeSingleOption(optionToRemove) {
      this.setState(function (e) {
        return {
          options: e.options.filter(function (option) {
            return optionToRemove !== option;
          })
        };
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      try {
        var json = localStorage.getItem('options');
        var options = JSON.parse(json);
        if (options) {
          this.setState(function () {
            return {
              options: options
            };
          });
        }
      } catch (e) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        var json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var title = "To Do App",
          subTitle = "First React App";
      return React.createElement(
        "div",
        { className: "app-group" },
        React.createElement(Header, { title: title, subTitle: subTitle }),
        React.createElement(Options, { removeAllOptions: this.removeAllOptions, optionIsHere: this.state.options.length === 0, isHere: this.state.options.length === 0 ? 'No option is here' : 'Option is here', removeSingleOption: this.removeSingleOption, option: this.state.options }),
        React.createElement(Form, { addOption: this.addOption })
      );
    }
  }]);

  return MyApp;
}(React.Component);

;

var app = document.getElementById('app');

ReactDOM.render(React.createElement(MyApp, null), app);
