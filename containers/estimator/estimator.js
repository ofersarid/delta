import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import cx from 'classnames';
import Step from './step.js';
import styles from './styles.scss';
import { device } from '../../services';

const MONTHS = 7;
const COST_PER_MONTH = 8500;

const EFFORTS = [[{
  study: 0.1,
  design: 0.1,
  dev: 0,
}, {
  study: 0.3,
  design: 0.1,
  dev: 0,
}, {
  study: -0.3,
  design: 0.1,
  dev: 0.3,
}], [{
  study: 0,
  design: -0.3,
  dev: 0.3,
}, {
  study: 0.1,
  design: 0.1,
  dev: 0.1,
}, {
  study: 0.3,
  design: 0.3,
  dev: 0.3,
}], [{
  study: 0.3,
  design: 0.1,
  dev: 0.3,
}, {
  study: 0,
  design: 0,
  dev: 0,
}, {
  study: 0,
  design: 0,
  dev: 0.1,
}], [{
  study: 0.1,
  design: 0.3,
  dev: 0,
}, {
  study: 0,
  design: 0,
  dev: 0,
}, {
  study: 0.1,
  design: 0.1,
  dev: 0,
}], [{
  study: -0.1,
  design: 0,
  dev: 0,
}, {
  study: 0.1,
  design: 0,
  dev: 0.1,
}, {
  study: 0.1,
  design: 0.3,
  dev: 0.1,
}]];

const Estimator = ({ isMobile }) => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [options, setOptions] = useState(fromJS([0, 1, 2, 1, 0]));

  function getMultiplier(i) {
    return 1 + Object.values(EFFORTS[i][options.get(i)]).reduce((acc, val) => acc + val, 0);
  }

  function generateEstimate() {
    let estimate = MONTHS * COST_PER_MONTH;
    estimate = estimate * getMultiplier(0);
    estimate = estimate * getMultiplier(1);
    estimate = estimate * getMultiplier(2);
    estimate = estimate * getMultiplier(3);
    estimate = estimate * getMultiplier(4);
    console.log(options);
    console.log(Math.ceil(estimate));
  }

  function setOption(i, n) {
    setOptions(options.set(i, n));
  }

  return (
    <div className={cx(styles.estimator)} >
      <h1 >Generate Estimate</h1 >
      <div className={styles.calculator} style={{
        transform: isMobile ? `translateX(-${100 * (selectedStep - 1)}%)` : 'translateX(0)',
      }}>
        <Step
          title="What is your industry?"
          index={isMobile ? '1 / 5' : '1'}
          options={['Program Development, Cyber, Fintech', 'Medtech, Robotics, Electronics', 'eCommerce']}
          selectedOption={options.get(0)}
          onChange={option => setOption(0, option)}
          location={selectedStep === 1 ? 'focused' : selectedStep > 1 ? 'prev' : 'next'}
        />
        <Step
          title="What is your company’s current funding stage?"
          index={isMobile ? '2 / 5' : '2'}
          options={['Before Series A', 'Series A Stage', 'After Series A']}
          selectedOption={options.get(1)}
          onChange={option => setOption(1, option)}
          location={selectedStep === 2 ? 'focused' : selectedStep > 2 ? 'prev' : 'next'}
        />
        <Step
          title="Does your product incorporate hardware or a device?"
          index={isMobile ? '3 / 5' : '3'}
          options={['Yes', 'No', 'Probably in a future']}
          selectedOption={options.get(2)}
          onChange={option => setOption(2, option)}
          location={selectedStep === 3 ? 'focused' : selectedStep > 3 ? 'prev' : 'next'}
        />
        <Step
          title="Do you have constant branding?"
          index={isMobile ? '4 / 5' : '4'}
          options={['No', 'Yes', 'We have a temporary branding']}
          selectedOption={options.get(3)}
          onChange={option => setOption(3, option)}
          location={selectedStep === 4 ? 'focused' : selectedStep > 4 ? 'prev' : 'next'}
        />
        <Step
          title="When would you like to start?"
          index={isMobile ? '5 / 5' : '5'}
          options={['NOW', 'Within a 3-4 month period', 'After the COVID-19 desepearse']}
          selectedOption={options.get(4)}
          onChange={option => setOption(4, option)}
          location={selectedStep === 5 ? 'focused' : selectedStep > 5 ? 'prev' : 'next'}
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
        {!isMobile && <button
          className={cx(styles.generate, { [styles.disable]: selectedStep !== 5 })}
          onClick={generateEstimate}
        >Generate</button >}
      </div >
      {isMobile && <button
        className={cx(styles.generate, { [styles.disable]: selectedStep !== 5 })}
        onClick={generateEstimate}
      >Generate</button >}
    </div >
  );
};

const mapState = state => ({
  isMobile: device.selectors.type(state) === 'mobile',
});

export default compose(
  connect(mapState)
)(Estimator);
