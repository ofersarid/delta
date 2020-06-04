import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'greg_delta',
  USER_ID: 'user_G5XidPOIQwVxbe1dVDS1Q',
  TEMPLATE: 'delta_lead_from_website',
};

const send = (name, email, company, coupon, estimation) => {
  return sendEmail(CONFIG.SERVICE_ID, CONFIG.TEMPLATE, {
    email,
    name,
    company,
    couponId: coupon ? coupon.get('id') : '-',
    couponName: coupon ? coupon.get('name') : '-',
    couponMessage: coupon ? coupon.get('message') : '-',
    couponStatus: coupon ? coupon.get('active') ? 'active' : 'disabled' : '-',
    couponClaimed: coupon ? coupon.get('claimed') ? 'true' : 'false' : '-',
    estimationTotal: estimation ? estimation.total : '-',
    estimationIndustry: estimation ? estimation.industry : '-',
    estimationFunding: estimation ? estimation.funding : '-',
    estimationDevice: estimation ? estimation.device : '-',
    estimationBranding: estimation ? estimation.branding : '-',
    estimationStart: estimation ? estimation.start : '-',
  }, CONFIG.USER_ID);
};

export default {
  send,
};
