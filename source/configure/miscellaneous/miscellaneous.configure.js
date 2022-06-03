export const createOffset = (date) => {
  var sign = date.getTimezoneOffset() > 0 ? '-' : '+';
  var offset = Math.abs(date.getTimezoneOffset());
  var hours = pad(Math.floor(offset / 60));
  var minutes = pad(offset % 60);
  return sign + hours + ':' + minutes;
};

const pad = (value) => {
  return value < 10 ? '0' + value : value;
};

export const verifyEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === true) {
    return false;
  }
  return false;
};

export const verifyPassword = (password) => {
  let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
  if (reg.test(password) === false) {
    return true;
  }
  return false;
};
