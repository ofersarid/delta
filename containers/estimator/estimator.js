import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import cx from 'classnames';
import Step from './step.js';
import styles from './styles.scss';
import { device, estimator } from '../../services';
import { scrollToContact } from '../../utils';

const MONTHS = 7;
const COST_PER_MONTH = 8500;

const Estimator = ({ isMobile, storeEstimation, storeSelection }) => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [options, setOptions] = useState(fromJS([0, 1, 2, 1, 0]));

  function getMultiplier(i) {
    return 1 + Object.values(estimator.schema[`step${i + 1}`].options[options.get(i)].effort).reduce((acc, val) => acc + val, 0);
  }

  function generateEstimate() {
    let estimate = MONTHS * COST_PER_MONTH;
    estimate = estimate * getMultiplier(0);
    estimate = estimate * getMultiplier(1);
    estimate = estimate * getMultiplier(2);
    estimate = estimate * getMultiplier(3);
    estimate = estimate * getMultiplier(4);
    storeEstimation(Math.ceil(estimate));
    storeSelection(options);
    scrollToContact();
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
          title={estimator.schema.step1.title}
          index={isMobile ? '1 / 5' : '1'}
          options={estimator.schema.step1.options.map(opt => opt.txt)}
          selectedOption={options.get(0)}
          onChange={option => setOption(0, option)}
          location={selectedStep === 1 ? 'focused' : selectedStep > 1 ? 'prev' : 'next'}
        />
        <Step
          title={estimator.schema.step2.title}
          index={isMobile ? '2 / 5' : '2'}
          options={estimator.schema.step2.options.map(opt => opt.txt)}
          selectedOption={options.get(1)}
          onChange={option => setOption(1, option)}
          location={selectedStep === 2 ? 'focused' : selectedStep > 2 ? 'prev' : 'next'}
        />
        <Step
          title={estimator.schema.step3.title}
          index={isMobile ? '3 / 5' : '3'}
          options={estimator.schema.step3.options.map(opt => opt.txt)}
          selectedOption={options.get(2)}
          onChange={option => setOption(2, option)}
          location={selectedStep === 3 ? 'focused' : selectedStep > 3 ? 'prev' : 'next'}
        />
        <Step
          title={estimator.schema.step4.title}
          index={isMobile ? '4 / 5' : '4'}
          options={estimator.schema.step4.options.map(opt => opt.txt)}
          selectedOption={options.get(3)}
          onChange={option => setOption(3, option)}
          location={selectedStep === 4 ? 'focused' : selectedStep > 4 ? 'prev' : 'next'}
        />
        <Step
          title={estimator.schema.step5.title}
          index={isMobile ? '5 / 5' : '5'}
          options={estimator.schema.step5.options.map(opt => opt.txt)}
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

const mapDispatch = dispatch => ({
  storeEstimation: calculation => dispatch(estimator.actions.update(calculation)),
  storeSelection: selection => dispatch(estimator.actions.storeSelection(selection)),
});

export default compose(
  connect(mapState, mapDispatch)
)(Estimator);
