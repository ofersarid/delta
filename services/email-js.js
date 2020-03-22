import { send as sendEmail } from 'emailjs-com';

const CONFIG = {
  SERVICE_ID: 'change-me',
  USER_ID: 'change-me',
  TEMPLATE: 'change-me',
};

const send = (name, email, phone) => {
  return sendEmail(CONFIG.SERVICE_ID, CONFIG.TEMPLATE, {
    'email': email,
    'name': name,
    'phone': phone.toString()
  }, CONFIG.USER_ID);
};

export default {
  send
};
