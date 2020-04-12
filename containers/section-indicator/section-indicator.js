import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { ChevronDown as Down } from '@styled-icons/boxicons-regular/ChevronDown';
import styles from './styles.scss';
import { section } from '../../services';

const SectionIndicator = ({ seen }) => {
  const indexMap = ['hero', 'M.O.', 'crew', 'tools', 'products', 'contact'];
  const renderArrows = () => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      items.push(
        <li
          key={i}
          className={cx({
            [styles.highlight]: seen.toJS().includes(indexMap[i]),
          })} >
          <Down />
        </li >
      );
    }
    return items;
  };

  return (
    <ul className={cx(styles.sectionIndicator)} >
      {renderArrows()}
    </ul >
  );
};

SectionIndicator.propTypes = {};

const mapStateToProps = state => ({
  seen: section.selectors.seen(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(SectionIndicator);
