import React, { useEffect, useState } from 'react';
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
          <Step options={['Lorem', 'Ipsum', 'Dollar']} />
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
