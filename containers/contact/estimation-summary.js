import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './styles.scss';
import { estimator } from '../../services';

const EstimationSummary = ({ estimation }) => {
  return estimation ? (
    <div className={styles.estimationSummary} >
      <div className={styles.title}>ESTIMATION</div>
      <ul>
        <li>POC - ${Math.ceil(estimation * 0.1).toLocaleString()}</li>
        <li>MVP - ${Math.ceil(estimation * 0.3).toLocaleString()}</li>
        <li>Full Product - ${Math.ceil(estimation * 0.6).toLocaleString()}</li>
        <li className={styles.divider} />
        <li>Total - ${estimation.toLocaleString()}</li>
        <li className={styles.tip}>* Your estimation and selction will be attached to the contact form</li>
      </ul>
    </div >
  ) : null;
};

const mapState = state => ({
  estimation: estimator.selectors.calculation(state),
});

export default compose(
  connect(mapState)
)(EstimationSummary);
