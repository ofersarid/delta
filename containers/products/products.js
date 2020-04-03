import React, { PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import { Swipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import { CheveronOutlineLeft } from '@styled-icons/zondicons/CheveronOutlineLeft';
import { CheveronOutlineRight } from '@styled-icons/zondicons/CheveronOutlineRight';
import styles from './styles.scss';
import data from './products-data';
import { device } from '../../services';

class Products extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      index: 0
    };
  }

  onSwipedLeft() {
    const { index } = this.state;
    const next = Math.min(index + 1, data.length - 1);
    this.setState({
      index: next
    });
  }

  onSwipedRight() {
    const { index } = this.state;
    const prev = Math.max(index - 1, 0);
    this.setState({
      index: prev
    });
  }

  selectMe(i) {
    this.setState({
      index: i
    });
  }

  render() {
    const { isMobile } = this.props;
    const { index } = this.state;
    return (
      <div className={cx(styles.products)} >
        <h1 >Work Sneak Peek</h1 >
        <Swipeable
          className={styles.swipeArea}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
        >
          <ul >
            {data.map((itm, i) => (
              <li
                key={itm.title}
                className={cx({ [styles.focused]: index === i })}
                onClick={() => this.selectMe(i)}
                style={{
                  transform: `translateX(calc(${index * -100}% - ${index * (isMobile ? 0 : 2)}vw))`
                }}
              >
                <video
                  src={isMobile ? itm.imgMobile : itm.imgDesktop}
                  preload="metadata"
                  autoPlay
                  loop
                  playsinline
                  muted />
                <div className={styles.overlay} />
              </li >
            ))}
          </ul >
        </Swipeable >
        <section className={styles.btns} >
          <CheveronOutlineLeft
            onClick={this.onSwipedRight}
            className={cx({ [styles.disable]: index === 0 })} />
          <CheveronOutlineRight
            onClick={this.onSwipedLeft}
            className={cx({ [styles.disable]: index === data.length - 1 })} />
        </section >
      </div >
    );
  }
}

Products.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isMobile: device.selectors.type(state) === 'mobile'
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Products);
