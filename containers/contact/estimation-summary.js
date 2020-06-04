import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { estimator, device } from '../../services';

const EstimationSummary = ({ estimation, estimatorData, isMobile }) => {
  return estimation ? (
    <div className={styles.estimationSummary} >
      <div className={styles.title}>ESTIMATION</div>
      <ul>
        <li>POC - ${Math.ceil(estimation * 0.1).toLocaleString()}</li>
        {isMobile ? null : <li className={styles.explane}>{estimatorData.get('summeryPOC')}</li>}
        <li>MVP - ${Math.ceil(estimation * 0.3).toLocaleString()}</li>
        {isMobile ? null : <li className={styles.explane}>{estimatorData.get('summeryMVP')}</li>}
        <li>Full Product - ${Math.ceil(estimation * 0.6).toLocaleString()}</li>
        {isMobile ? null : <li className={styles.explane}>{estimatorData.get('summeryFullProduct')}</li>}
        <li className={styles.divider} />
        <li>Total - ${estimation.toLocaleString()}</li>
        <li className={styles.tip}>* Your estimation and selction will be attached to the contact form</li>
      </ul>
    </div >
  ) : null;
};

const mapState = state => ({
  estimation: estimator.selectors.calculation(state),
  estimatorData: estimator.selectors.data(state),
  isMobile: device.selectors.type(state) === 'mobile',
});

export default compose(
  connect(mapState)
)(EstimationSummary);
