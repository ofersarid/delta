import React, { PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import { Whatsapp } from '@styled-icons/remix-fill/Whatsapp';
import { ScLinkedin } from '@styled-icons/evil/ScLinkedin';
// import PropTypes from 'prop-types';
import styles from './styles.scss';
import { validateEmail } from '../../utils';
import { emailJS, GA, referrer, section } from '../../services';

class Contact extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: '',
      email: '',
      company: '',
      sent: false,
      working: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { sent, name, email, company } = this.state;
    if (sent && (name !== prevState.name || email !== prevState.email || company !== prevState.company)) {
      this.setState({
        sent: false,
        name: '',
        email: '',
        company: ''
      });
    }
  }

  isValid() {
    const { name, email, company } = this.state;
    return validateEmail(email) && name.length > 1 && company.length > 1;
  }

  async send() {
    const { name, email, company, sent } = this.state;
    const { coupon } = this.props;
    if (sent) return;
    this.setState({ working: true });
    GA.send();
    let resp;
    if (coupon.get('active') && coupon.get('claimed')) {
      resp = await emailJS.sendWithCoupon(name, email, company, coupon);
    } else {
      resp = await emailJS.send(name, email, company);
    }
    this.setState({ working: false });
    if (resp.status === 200) {
      this.setState({ sent: true });
    }
  }

  chat() {
    const win = window.open('https://api.whatsapp.com/send?phone=972547643525', '_blank');
    win.focus();
  }

  render() {
    const { name, email, company, working, sent } = this.state;
    const { coupon } = this.props;
    const btnPosition = { transform: `translateX(${working ? -100 : sent ? -200 : 0}%)` };
    return (
      <div className={cx(styles.contact)} id="contactSection" >
        <div className={styles.left} >
          <h1 >Get In Touch
            {(coupon.get('claimed') && coupon.get('active')) ? (<div className={styles.coupon} >
              {`Coupon Claimed "${coupon.get('name')}": ${coupon.get('message')}`}
            </div >) : null}
          </h1 >
          <input
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            className={cx({ [styles.valid]: name.length > 1 })}
            autoComplete="new-password"
            placeholder="Name" />
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            className={cx({ [styles.valid]: validateEmail(email) })}
            autoComplete="new-password"
            placeholder="Email" />
          <input
            value={company}
            onChange={e => this.setState({ company: e.target.value })}
            className={cx({ [styles.valid]: company.length > 1 })}
            autoComplete="new-password"
            placeholder="Company" />
          <section className={styles.btns} >
            <button className={cx({
              [styles.disable]: !this.isValid(),
              [styles.gotIt]: sent
            })} onClick={this.send} >
              <ul >
                <li style={btnPosition} >Send Details</li >
                <li style={btnPosition} >Sending...</li >
                <li style={btnPosition} >Got It!</li >
              </ul >
            </button >
            <Whatsapp onClick={this.chat} />
          </section >
        </div >
        <p className={styles.right} >
          Weizman 70 Kfar-Sava, Israel<br />
          <a href="tel:+972-52-689-1380" >+972 52 689 1380</a ><br />
          <a href="mailto:desk@delta.band" target="_blank" rel="noopener noreferrer" >desk@delta.band</a ><br />
          <a href="https://www.linkedin.com/company/deltafront/" target="_blank" rel="noopener noreferrer" >
            <ScLinkedin />
            LinkedIn
          </a >
        </p >
      </div >
    );
  }
}

Contact.propTypes = {};

const mapStateToProps = state => ({
  coupon: referrer.selectors.coupon(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default section.HOC(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Contact), 'contact');
