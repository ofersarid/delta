import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';
import styles from './styles.scss';
import { device } from '../../services';
import data from './crew-data';
import autoBind from 'auto-bind';

class Crew extends PureComponent {
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
    // const { deviceOrientation } = this.props;
    // const isPortrait = deviceOrientation === 'portrait';
    const { index } = this.state;
    return (
      <div className={styles.crew} >
        <h1 >THE CREW</h1 >
        <Swipeable
          className={styles.swipeArea}
          onSwipedLeft={this.onSwipedLeft}
          onSwipedRight={this.onSwipedRight}
        >
          <ul >
            {data.map((itm, i) => (
              <li
                key={itm.id}
                className={cx({ [styles.focused]: index === i })}
                onClick={() => this.selectMe(i)}
                style={{
                  transform: `translateX(calc(${index * -100}% - ${index * 10}px))`
                }}
              ><img src={itm.image} /></li >
            ))}
          </ul >
          <p className={styles.blue} >{data[index].name}<br />{data[index].title}</p >
          <p >{data[index].description}</p >
        </Swipeable >
      </div >
    );
  }
}

Crew.propTypes = {
  deviceOrientation: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  deviceOrientation: device.selectors.orientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Crew);
