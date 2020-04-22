import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'greg_delta',
  USER_ID: 'user_G5XidPOIQwVxbe1dVDS1Q',
  TEMPLATE: 'delta_lead_from_website',
};

const send = (name, email, company) => {
  return sendEmail(CONFIG.SERVICE_ID, CONFIG.TEMPLATE, {
    email,
    name,
    company,
  }, CONFIG.USER_ID);
};

const sendWithCoupon = (name, email, company, coupon) => {
  return sendEmail(CONFIG.SERVICE_ID, CONFIG.TEMPLATE, {
    email,
    name,
    company,
    couponId: coupon.get('id'),
    couponName: coupon.get('name'),
    couponMessage: coupon.get('message'),
    couponStatus: coupon.get('active') ? 'active' : 'disabled',
    couponClaimed: coupon.get('claimed') ? 'true' : 'false',
  }, CONFIG.USER_ID);
};

export default {
  send,
  sendWithCoupon
};
