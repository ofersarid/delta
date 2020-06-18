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

const Estimator = ({ isMobile, isTablet, storeEstimation, storeSelection, schema, interfaceSignificance }) => {
  const [selectedStep, setSelectedStep] = useState(1);
  const [options, setOptions] = useState(fromJS([0, 1, 2, 1, 0, 0]));

  function getEfforts(i) {
    return parseFloat(schema.getIn([i, `option${options.get(i) + 1}EffortStudy`])) + parseFloat(schema.getIn([i, `option${options.get(i) + 1}EffortDesign`])) + parseFloat(schema.getIn([i, `option${options.get(i) + 1}EffortDev`]));
  }

  function generateEstimate() {
    let estimate = MONTHS * COST_PER_MONTH;
    const effortsSum = getEfforts(0) + getEfforts(1) + getEfforts(2) + getEfforts(3) + getEfforts(4);
    estimate = estimate + effortsSum * estimate;
    estimate = estimate * parseFloat(interfaceSignificance.get(`option${options.get(5) + 1}Factor`));
    storeEstimation(Math.round(estimate / 100) * 100);
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
        transform: (isMobile || isTablet) ? `translateX(-${100 * (selectedStep - 1)}%)` : 'translateX(0)',
      }}>
        {schema.map((step, i) => (
          <Step
            key={step.get('id')}
            title={step.get(isMobile ? 'titleMobile' : 'title')}
            index={(isMobile || isTablet) ? `${i + 1} / 6` : i + 1}
            options={[step.get(isMobile ? 'option1TxtMobile' : 'option1Txt'), step.get(isMobile ? 'option2TxtMobile' : 'option2Txt'), step.get(isMobile ? 'option3TxtMobile' : 'option3Txt')]}
            selectedOption={options.get(i)}
            onChange={option => setOption(i, option)}
            location={selectedStep === i + 1 ? 'focused' : selectedStep > i + 1 ? 'prev' : 'next'}
          />
        ))}
        <Step
          title={interfaceSignificance.get(isMobile ? 'titleMobile' : 'title')}
          index={(isMobile || isTablet) ? '6 / 6' : 6}
          options={[
            interfaceSignificance.get(isMobile ? 'option1TextMobile' : 'option1Text'),
            interfaceSignificance.get(isMobile ? 'option2TextMobile' : 'option2Text'),
            interfaceSignificance.get(isMobile ? 'option3TextMobile' : 'option3Text')]}
          selectedOption={options.get(5)}
          onChange={option => setOption(5, option)}
          location={selectedStep === 6 ? 'focused' : selectedStep > 6 ? 'prev' : 'next'}
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
          className={cx(styles.next, { [styles.disable]: selectedStep === options.size })}
          onClick={() => {
            setSelectedStep(Math.min(selectedStep + 1, options.size));
          }}
        >Next</button >
        {!isMobile && !isTablet && <button
          className={cx(styles.generate, { [styles.disable]: selectedStep !== options.size })}
          onClick={generateEstimate}
        >Generate</button >}
      </div >
      {(isMobile || isTablet) && <button
        className={cx(styles.generate, { [styles.disable]: selectedStep !== options.size })}
        onClick={generateEstimate}
      >Generate</button >}
    </div >
  );
};

const mapState = state => ({
  isMobile: device.selectors.type(state) === 'mobile',
  isTablet: device.selectors.type(state) === 'tablet',
  schema: estimator.selectors.schema(state),
  interfaceSignificance: estimator.selectors.interfaceSignificance(state),
});

const mapDispatch = dispatch => ({
  storeEstimation: calculation => dispatch(estimator.actions.update(calculation)),
  storeSelection: selection => dispatch(estimator.actions.storeSelection(selection)),
});

export default compose(
  connect(mapState, mapDispatch)
)(Estimator);
