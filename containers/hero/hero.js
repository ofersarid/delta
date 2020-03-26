import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { device } from '../../services';

class Hero extends PureComponent {
  render() {
    const { deviceOrientation } = this.props;
    const isPortrait = deviceOrientation === 'portrait';
    return (
      <section className={styles.hero} >
        <div className={styles.left} >
          <h1 >How about hiring the entire front team from the start?</h1 >
          {isPortrait && <img src="/images/logo.svg" />}
          <p >
            Hiring Senior FEDs/PMs/Designers is not an easy task, let alone forging them into an effective &#34;delta
            force&#34;.<br />
            _Delta is A team of senior-level individuals who love working together and are ready to get you to your next
            milestone fast and strong
          </p >
        </div >
        {!isPortrait && <div className={styles.right} >
          <img src="/images/logo.svg" />
        </div >}
      </section >
    );
  }
}

Hero.propTypes = {
  deviceOrientation: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  deviceOrientation: device.selectors.orientation(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Hero);
