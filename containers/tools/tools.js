import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import styles from './styles.scss';
import data from './tools-data';

const Tools = () => (
  <div className={cx(styles.tools)} >
    <h1 >OUR TOOLS</h1 >
    <div className={styles.lists}>
      <section >
        <h2 className={styles.blue} >Tech</h2 >
        <ul >
          {data.tech.map(itm => (
            <li key={itm.title} >
              <img src={itm.thumb} alt="tool icon" />
              <div className={styles.title} >{itm.title}</div >
            </li >
          ))}
        </ul >
      </section >
      <section >
        <h2 className={styles.blue} >UX/UI</h2 >
        <ul >
          {data.uxUi.map(itm => (
            <li key={itm.title} >
              <img src={itm.thumb} alt="tool icon" />
              <div className={styles.title} >{itm.title}</div >
            </li >
          ))}
        </ul >
      </section >
      <section >
        <h2 className={styles.blue} >Visual</h2 >
        <ul >
          {data.visual.map(itm => (
            <li key={itm.title} >
              <img src={itm.thumb} alt="tool icon" />
              <div className={styles.title} >{itm.title}</div >
            </li >
          ))}
        </ul >
      </section >
      <section >
        <h2 className={styles.blue} >Code</h2 >
        <ul >
          {data.code.map(itm => (
            <li key={itm.title} >
              <img src={itm.thumb} alt="tool icon" />
              <div className={styles.title} >{itm.title}</div >
            </li >
          ))}
        </ul >
      </section >
      <section >
        <h2 className={styles.blue} >Workflow</h2 >
        <ul className={styles.last} >
          {data.workflow.map(itm => (
            <li key={itm.title} >
              <img src={itm.thumb} alt="tool icon" />
              <div className={styles.title} >{itm.title}</div >
            </li >
          ))}
        </ul >
      </section >
    </div >
  </div >
);

Tools.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Tools);
