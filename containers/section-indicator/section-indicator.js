import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
// import PropTypes from 'prop-types';
import { ChevronDown as Down } from '@styled-icons/boxicons-regular/ChevronDown';
import styles from './styles.scss';

const SectionIndicator = () => {
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setReverse(currPos.y > prevPos.y);
      switch (true) {
        case currPos.y < -3756:
          setHighlightIndex(5);
          return;
        case currPos.y < -2968:
          setHighlightIndex(4);
          return;
        case currPos.y < -2020:
          setHighlightIndex(3);
          return;
        case currPos.y < -1090:
          setHighlightIndex(2);
          return;
        case currPos.y < -492:
          setHighlightIndex(1);
          return;
        default:
          setHighlightIndex(0);
      }
    },
    [highlightIndex, reverse],
    false,
    false,
    300
  );

  const renderArrows = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      items.push(
        <li
          key={i}
          className={cx({
            [styles.highlight]: highlightIndex === i,
            [styles.reverse]: reverse,
          })} >
          <Down />
        </li >
      );
    }
    return items;
  };

  return useMemo(() => (
    <ul className={cx(styles.sectionIndicator)} >
      {renderArrows()}
    </ul >
  ), [highlightIndex, reverse]);
};

SectionIndicator.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SectionIndicator);
