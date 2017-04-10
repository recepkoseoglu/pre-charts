import React, {Component} from "react";

const iframeStyle = {
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


export default class ResizeComponent extends Component {

    static propTypes = {
        onResize: React.PropTypes.func,
        onScroll: React.PropTypes.func,
        style: React.PropTypes.object
    };

    static defaultProps = {
        style: {},
    };


    state = {
        width: -1,
        height: -1,
        offsetLeft: -1,
        offsetTop: -1,
        scrollLeft: -1,
        scrollTop: -1
    };

    render() {
        const {onResize, style, ...props} = this.props;
        return (
            <div ref={this.onContainerRef} style={{position: 'relative', ...style}} {...props}>
                {onResize ? <iframe ref={this.onSensorRef} style={iframeStyle}/> : null}
                {this.props.children}
            </div>
        );
    }

    onResize = () => {
        const {innerWidth: width, innerHeight: height} = this.sensor.contentWindow;
        const {onResize} = this.props;
        onResize({width, height});
        this.setState({width, height});
    };


    onScroll = () => {
        const {offsetLeft, offsetTop, scrollLeft, scrollTop} = this.container;
        const {onScroll} = this.props;
        onScroll({offsetLeft, offsetTop, scrollLeft, scrollTop});
        this.setState({offsetLeft, offsetTop, scrollLeft, scrollTop});
    };


    onContainerRef = (ref) => {
        this.container = ref;
    };


    onSensorRef = (ref) => {
        this.sensor = ref;
    };

    componentWillMount() {
        const {onResize, onScroll} = this.props;

        if (onResize) {
            this.onResizeDebounced = this.onResize;
        }

        if (onScroll) {
            this.onScrollDebounced = this.onScroll;
        }
    };


    componentDidMount() {
        const {onResize, onScroll} = this.props;

        if (onResize) {
            this.sensor.contentWindow.addEventListener('resize', this.onResizeDebounced, false);
            this.rafOnResize = requestAnimationFrame(this.onResize);
        }

        if (onScroll) {
            this.container.addEventListener('scroll', this.onScrollDebounced, false);
            this.rafOnScroll = requestAnimationFrame(this.onScroll);
        }
    }


    componentWillUnmount() {
        const {onResize, onScroll} = this.props;

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
}