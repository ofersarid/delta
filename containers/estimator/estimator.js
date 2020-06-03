import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import Step from './step.js';
import styles from './styles.scss';
import { device } from '../../services';

const Estimator = ({ isMobile }) => {
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className={cx(styles.estimator)} >
      <h1 >Generate Estimate</h1 >
      <div className={styles.calculator} style={{
        transform: `translateX(-${100 * (selectedStep - 1)}%)`,
      }}>
        <Step
          index={isMobile ? '1 / 5' : '1'}
          options={['Lorem1', 'Ipsum1', 'Dollar1']}
          defaultOption={0}
          focus={selectedStep === 1}
          title="What is your industry? "
        />
        <Step
          index={isMobile ? '2 / 5' : '2'}
          options={['Lorem2', 'Ipsum2', 'Dollar2']}
          defaultOption={1}
          focus={selectedStep === 2}
          title="What is your company’s current funding status?
"
        />
        <Step
          index={isMobile ? '3 / 5' : '3'}
          options={['Lorem3', 'Ipsum3', 'Dollar3']}
          defaultOption={2}
          focus={selectedStep === 3}
          title="Does your product incorporate hardware technology or device."
        />
        <Step
          index={isMobile ? '4 / 5' : '4'}
          options={['Lorem4', 'Ipsum4', 'Dollar4']}
          defaultOption={1}
          focus={selectedStep === 4}
          title="Are you using an existing branding with your new interactive product?"
        />
        <Step
          index={isMobile ? '5 / 5' : '5'}
          options={['Lorem5', 'Ipsum5', 'Dollar5']}
          defaultOption={0}
          focus={selectedStep === 5}
          title="When would you like to start the project?"
        />
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
  isMobile: device.selectors.type(state) === 'mobile',
});

export default compose(
  connect(mapState)
)(Estimator);
