import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import cx from 'classnames';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { estimator, device } from '../../services';

const EstimationSummary = ({ estimation, estimatorSummery, isMobile }) => {
  return estimation ? (
    <div className={styles.estimationSummary} >
      <div className={styles.basad}>בס״ד</div>
      <div className={styles.title}>BUDGET ESTIMATION</div>
      <ul>
        <li className={styles.explain}>{estimatorSummery.get('summaryDeltaEstimationProposal')}</li>
        <li className={styles.stepTitle}><div>Stage 1 (POC)</div><div>${Math.ceil(estimation * 0.1).toLocaleString()}</div></li>
        {isMobile ? null : <li className={styles.explain}>{estimatorSummery.get('summeryPOC')}</li>}
        <li className={styles.stepTitle}><div>Stage 2 (MVP)</div><div>${Math.ceil(estimation * 0.3).toLocaleString()}</div></li>
        {isMobile ? null : <li className={styles.explain}>{estimatorSummery.get('summeryMVP')}</li>}
        <li className={styles.stepTitle}><div>Stage 3 (Full Product)</div><div>${Math.ceil(estimation * 0.6).toLocaleString()}</div></li>
        {isMobile ? null : <li className={styles.explain}>{estimatorSummery.get('summeryFullProduct')}</li>}
        <li className={cx(styles.stepTitle, styles.invert)}><div>Total</div><div>${estimation.toLocaleString()}</div></li><br />
        <li className={styles.explain}>{estimatorSummery.get('summaryDeltaExperience')}</li>
        <li className={styles.tip}>{estimatorSummery.get('summeryTip')}</li>
      </ul>
      <img className={styles.logo} src="/images/logo.svg" alt="logo" />
    </div >
  ) : null;
};

const mapState = state => ({
  estimation: estimator.selectors.calculation(state),
  estimatorSummery: estimator.selectors.summery(state),
  isMobile: device.selectors.type(state) === 'mobile',
});

export default compose(
  connect(mapState)
)(EstimationSummary);
