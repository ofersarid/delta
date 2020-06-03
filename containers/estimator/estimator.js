import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import Step from './step.js';
import styles from './styles.scss';
import { device } from '../../services';

const Estimator = ({ device }) => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className={cx(styles.estimator)} >
      <h1 >Generate Estimate</h1 >
      <div className={styles.calculator} style={{
        transform: `translateX(-${100 * (selectedStep - 1)}%)`,
      }}>
        <Step index={1} options={['Lorem1', 'Ipsum1', 'Dollar1']} focus={selectedStep === 1} />
        <Step index={2} options={['Lorem2', 'Ipsum2', 'Dollar2']} focus={selectedStep === 2} />
        <Step index={3} options={['Lorem3', 'Ipsum3', 'Dollar3']} focus={selectedStep === 3} />
        <Step index={4} options={['Lorem4', 'Ipsum4', 'Dollar4']} focus={selectedStep === 4} />
        <Step index={5} options={['Lorem5', 'Ipsum5', 'Dollar5']} focus={selectedStep === 5} />
      </div>
      <div className={styles.controllers}>
        <button
          className={cx(styles.prev, { [styles.disable]: selectedStep === 1 })}
          onClick={() => {
            setSelectedStep(Math.max(selectedStep - 1, 1));
          }}
        >Prev</button >
        <button
          className={cx(styles.next, { [styles.disable]: selectedStep === 5 })}
          onClick={() => {
            setSelectedStep(Math.min(selectedStep + 1, 5));
          }}
        >Next</button >
      </div >
    </div >
  );
};

const mapState = state => ({
  device: device.selectors.type(state)
});

export default compose(
  connect(mapState)
)(Estimator);
