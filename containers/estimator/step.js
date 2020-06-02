import React, { useEffect, useState } from 'react'; // eslint-disable-line
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import styles from './styles.scss';
import { device } from '../../services';

const Step = ({ device, options, focus, index }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  return device === 'mobile' ? null : (
    <div className={cx(styles.step, { [styles.focused]: focus })}>
      <div className={styles.top}>
        <div className={styles.slider}>
          <div className={styles.ball} style={{
            top: `${selectedOption * 49}px`,
          }} />
        </div>
        {focus && (
          <ul className={styles.options}>
            {options.map((itm, i) => (
              <li
                key={itm}
                className={cx({ [styles.selected]: i === selectedOption })}
                onClick={() => {
                  setSelectedOption(i);
                }}
              >
                {itm}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.index}>{index}</div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

const mapState = state => ({
  device: device.selectors.type(state)
});

export default compose(
  connect(mapState)
)(Step);
