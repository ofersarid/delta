import React, { PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import LinkedInTag from 'react-linkedin-insight';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import { Whatsapp } from '@styled-icons/remix-fill/Whatsapp';
import { ScLinkedin } from '@styled-icons/evil/ScLinkedin';
import conversion from '../../linkedin-marketing';
import EstimationSummary from './estimation-summary';
import styles from './styles.scss';
import { validateEmail } from '../../utils';
import { emailJS, GA, coupon, section, estimator } from '../../services';

class Contact extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      name: '',
      email: '',
      company: '',
      sent: false,
      couponId: null,
      error: false,
      working: false
    };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    this.setState({ couponId: searchParams.get('coupon') });
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

  attachTypingClass() {
    document.getElementsByTagName('body')[0].classList.add('typing');
  }

  removeTypingClass() {
    document.getElementsByTagName('body')[0].classList.remove('typing');
  }

  async send() {
    const { coupons, estimation } = this.props;
    const { name, email, company, sent, couponId } = this.state;
    const { claimed } = this.props;
    if (sent) return;
    this.setState({ working: true });
    try {
      GA.send();
      if (claimed) {
        LinkedInTag.track(conversion.linkedIn.sendDetailsWithCoupon.id);
        const _coupon = coupons.find(c => c.get('id') === couponId);
        await emailJS.send(name, email, company, _coupon, estimation);
      } else {
        await emailJS.send(name, email, company, null, estimation);
      }
      this.setState({ sent: true });
      this.setState({ working: false });
    } catch (err) {
      this.setState({ working: false });
      this.setState({ error: true });
    }
  }

  chat() {
    const win = window.open('https://api.whatsapp.com/send?phone=972547643525', '_blank');
    win.focus();
  }

  render() {
    const { name, email, company, working, sent, couponId, error } = this.state;
    const { coupons, claimed } = this.props;
    const _coupon = coupons.find(c => c.get('id') === couponId);
    const btnPosition = { left: `${working ? -100 : sent ? -200 : 0}%` };
    return (
      <div className={cx(styles.contact)} id="contactSection" >
        <div className={styles.left} >
          <h1 >Get In Touch
            {_coupon && claimed ? (
              <div className={styles.coupon} >
                CLAIMED - {_coupon.get('header')}
              </div >) : null
            }
            <EstimationSummary />
          </h1 >
          <input
            id="contact-form-name"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            className={cx({ [styles.valid]: name.length > 1 })}
            onFocus={this.attachTypingClass}
            onBlur={this.removeTypingClass}
            autoComplete="new-password" // disable auto complete
            placeholder="Name" />
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            className={cx({ [styles.valid]: validateEmail(email) })}
            onFocus={this.attachTypingClass}
            onBlur={this.removeTypingClass}
            autoComplete="new-password" // disable auto complete
            placeholder="Email" />
          <input
            value={company}
            onChange={e => this.setState({ company: e.target.value })}
            className={cx({ [styles.valid]: company.length > 1 })}
            onFocus={this.attachTypingClass}
            onBlur={this.removeTypingClass}
            autoComplete="new-password" // disable auto complete
            placeholder="Company" />
          <section className={styles.btns} >
            <button className={cx({
              [styles.disable]: !this.isValid(),
              [styles.gotIt]: sent,
            })} onClick={this.send} >
              <ul style={btnPosition} >
                <li>Send Details</li >
                <li>Sending...</li >
                <li>Got It!</li >
              </ul >
              {error && <div className={styles.error} >Oops - service unavailable</div >}
            </button >
          </section >
        </div >
        <p className={styles.right} >
          <span>Weizman 70 Kfar-Sava, Israel</span><br />
          <a href="tel:+972-52-689-1380" >+972 52 689 1380</a >
          <a href="mailto:desk@delta.band" target="_blank" rel="noopener noreferrer" >desk@delta.band</a >
          <a href="https://www.linkedin.com/company/deltafront/" target="_blank" rel="noopener noreferrer" >
            <ScLinkedin />
            LinkedIn
          </a >
          <Whatsapp className={styles.whatsAppIcon} onClick={this.chat} />
        </p >
      </div >
    );
  }
}

Contact.propTypes = {};

const mapStateToProps = state => ({
  claimed: coupon.selectors.claimed(state),
  coupons: coupon.selectors.coupons(state),
  estimation: estimator.selectors.composeEstimation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default section.HOC(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Contact), 'contact');
