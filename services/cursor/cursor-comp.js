import autoBind from 'auto-bind';
import React, { PureComponent } from 'react';
import styles from './styles.scss';
import device from '../device';
import { connect } from 'react-redux';

class Cursor extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { device } = this.props;
    if (device === 'desktop') {
      this.bindEvents();
      this.ref.current.left = -10;
      this.ref.current.top = -10;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { device } = this.props;
    if (device !== prevProps.device) {
      if (device === 'desktop') {
        this.bindEvents();
      } else {
        this.unbindEvents();
      }
    }
  }

  setPosition(e) {
    const { pageX, pageY } = e;
    if (this.ref.current) {
      this.ref.current.style.left = `${pageX}px`;
      this.ref.current.style.top = `${pageY}px`;
    }
  }

  bindEvents() {
    window.addEventListener('mousemove', this.setPosition, true);
  }

  unbindEvents() {
    window.removeEventListener('mousemove', this.setPosition);
  }

  render() {
    return <div ref={this.ref} className={styles.cursor} />;
  }
}

const mapState = state => ({
  device: device.selectors.type(state)
});

export default connect(mapState)(Cursor);
