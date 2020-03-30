import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'greg_delta',
  USER_ID: 'user_G5XidPOIQwVxbe1dVDS1Q',
  TEMPLATE: 'delta_lead_from_website',
};

const send = (name, email, company) => {
  return sendEmail(CONFIG.SERVICE_ID, CONFIG.TEMPLATE, {
    'email': email,
    'name': name,
    'company': company,
  }, CONFIG.USER_ID);
};

export default {
  send
};
