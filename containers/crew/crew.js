import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { device } from '../../services';
import data from './crew-data';
import autoBind from 'auto-bind';

class Crew extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      focused: data[0]
    };
  }

  render() {
    // const { deviceOrientation } = this.props;
    // const isPortrait = deviceOrientation === 'portrait';
    const { focused } = this.state;
    return (
      <section className={styles.crew} >
        <h1 >MEET THE CREW</h1 >
        <ul >
          {data.map(itm => (
            <li
              key={itm.id}
              className={cx({ [styles.focused]: focused.id === itm.id })}
            ><img src={itm.image} /></li >
          ))}
        </ul >
        <p ></p >
      </section >
    );
  }
}

Crew.propTypes = {
  deviceOrientation: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  deviceOrientation: device.selectors.orientation(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Crew);
