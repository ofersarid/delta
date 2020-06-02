import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import Step from './step.js';
import styles from './styles.scss';
import { device } from '../../services';

const Estimator = ({ device }) => {
  return (
    <div className={cx(styles.estimator)} >
      <h1 >Generate Estimate</h1 >
      {device === 'mobile' ? null : (
        <div className={styles.calculator}>
          <Step index={1} options={['Lorem1', 'Ipsum1', 'Dollar1']} focus={true} />
          <Step index={2} options={['Lorem2', 'Ipsum2', 'Dollar2']} />
          <Step index={3} options={['Lorem3', 'Ipsum3', 'Dollar3']} />
          <Step index={4} options={['Lorem4', 'Ipsum4', 'Dollar4']} />
          <Step index={5} options={['Lorem5', 'Ipsum5', 'Dollar5']} />
        </div>
      )}
    </div>
  );
};

const mapState = state => ({
  device: device.selectors.type(state)
});

export default compose(
  connect(mapState)
)(Estimator);
