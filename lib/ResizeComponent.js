'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
}

function _objectWithoutProperties(obj, keys) {
    var target = {};
    for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    return target;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var iframeStyle = {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    border: 'none',
    background: 'transparent',
    pointerEvents: 'none',
    zIndex: -1
};

var ResizeComponent = function (_Component) {
    _inherits(ResizeComponent, _Component);

    function ResizeComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ResizeComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ResizeComponent.__proto__ || Object.getPrototypeOf(ResizeComponent)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            width: -1,
            height: -1,
            offsetLeft: -1,
            offsetTop: -1,
            scrollLeft: -1,
            scrollTop: -1
        }, _this.onResize = function () {
            var _this$sensor$contentW = _this.sensor.contentWindow,
                width = _this$sensor$contentW.innerWidth,
                height = _this$sensor$contentW.innerHeight;
            var onResize = _this.props.onResize;

            onResize({width: width, height: height});
            _this.setState({width: width, height: height});
        }, _this.onScroll = function () {
            var _this$container = _this.container,
                offsetLeft = _this$container.offsetLeft,
                offsetTop = _this$container.offsetTop,
                scrollLeft = _this$container.scrollLeft,
                scrollTop = _this$container.scrollTop;
            var onScroll = _this.props.onScroll;

            onScroll({offsetLeft: offsetLeft, offsetTop: offsetTop, scrollLeft: scrollLeft, scrollTop: scrollTop});
            _this.setState({
                offsetLeft: offsetLeft,
                offsetTop: offsetTop,
                scrollLeft: scrollLeft,
                scrollTop: scrollTop
            });
        }, _this.onContainerRef = function (ref) {
            _this.container = ref;
        }, _this.onSensorRef = function (ref) {
            _this.sensor = ref;
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ResizeComponent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                onResize = _props.onResize,
                style = _props.style,
                props = _objectWithoutProperties(_props, ['onResize', 'style']);

            return _react2.default.createElement(
                'div',
                _extends({ref: this.onContainerRef, style: _extends({position: 'relative'}, style)}, props),
                onResize ? _react2.default.createElement('iframe', {ref: this.onSensorRef, style: iframeStyle}) : null,
                this.props.children
            );
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props2 = this.props,
                onResize = _props2.onResize,
                onScroll = _props2.onScroll;


            if (onResize) {
                this.onResizeDebounced = this.onResize;
            }

            if (onScroll) {
                this.onScrollDebounced = this.onScroll;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props3 = this.props,
                onResize = _props3.onResize,
                onScroll = _props3.onScroll;


            if (onResize) {
                this.sensor.contentWindow.addEventListener('resize', this.onResizeDebounced, false);
                this.rafOnResize = requestAnimationFrame(this.onResize);
            }

            if (onScroll) {
                this.container.addEventListener('scroll', this.onScrollDebounced, false);
                this.rafOnScroll = requestAnimationFrame(this.onScroll);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _props4 = this.props,
                onResize = _props4.onResize,
                onScroll = _props4.onScroll;


            if (onResize) {
                cancelAnimationFrame(this.rafOnResize);
                this.sensor.contentWindow.removeEventListener('resize', this.onResizeDebounced, false);
                if (this.onResizeDebounced.cancel) {
                    this.onResizeDebounced.cancel();
                }
            }

            if (onScroll) {
                cancelAnimationFrame(this.rafOnScroll);
                this.container.removeEventListener('scroll', this.onScrollDebounced, false);
                if (this.onScrollDebounced.cancel) {
                    this.onScrollDebounced.cancel();
                }
            }
        }
    }]);

    return ResizeComponent;
}(_react.Component);

ResizeComponent.propTypes = {
    onResize: _react2.default.PropTypes.func,
    onScroll: _react2.default.PropTypes.func,
    style: _react2.default.PropTypes.object
};
ResizeComponent.defaultProps = {
    style: {}
};
exports.default = ResizeComponent;