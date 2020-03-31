import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';
import autoBind from 'auto-bind';
import { ScLinkedin } from '@styled-icons/evil/ScLinkedin';
import styles from './styles.scss';
import { device } from '../../services';
import data from './crew-data';

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
    const { isMobile } = this.props;
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
              ><img src={isMobile ? itm.imageMobile : itm.image} /></li >
            ))}
          </ul >
          <p className={cx(styles.title, styles.blue)} >
            <img src={data[index].icon} />
            {data[index].name}<br />
            {data[index].title}
          </p >
          <p className={styles.description}>
            {data[index].description}
            <br />
            <a href={data[index].linkedIn} target="_blank" rel="noopener noreferrer" >
              <ScLinkedin />
              My LinkedIn
            </a>
          </p >
        </Swipeable >
      </div >
    );
  }
}

Crew.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: device.selectors.type(state) === 'mobile',
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Crew);
