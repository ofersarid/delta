import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';
import autoBind from 'auto-bind';
import { ScLinkedin } from '@styled-icons/evil/ScLinkedin';
import styles from './styles.scss';
import { device, section, crew } from '../../services';

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
    const { crew } = this.props;
    const next = Math.min(index + 1, crew.size - 1);
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
    const { isMobile, crew } = this.props;
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
            {crew.map((itm, i) => (
              <li
                key={itm.get('id')}
                className={cx({ [styles.focused]: index === i })}
                onClick={() => this.selectMe(i)}
                style={{
                  transform: `translateX(calc(${index * -100}% - ${index * 10}px))`
                }}
              ><img src={isMobile ? itm.get('picMobile') : itm.get('pic')} alt="profile image" /></li >
            ))}
          </ul >
          <p className={cx(styles.title, styles.blue)} >
            <img src={crew.getIn([index, 'icon'])} alt="icon" />
            {crew.getIn([index, 'name'])}<br />
            {crew.getIn([index, 'title'])}
          </p >
          <p className={styles.description}>
            {crew.getIn([index, 'description'])}
            <br />
            <a href={crew.getIn([index, 'linkedInURL'])} target="_blank" rel="noopener noreferrer" >
              <ScLinkedin />
              LinkedIn
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
  crew: crew.selectors.data(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default section.HOC(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Crew), 'crew');
