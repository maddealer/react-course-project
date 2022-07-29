const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

export const regFormValidator = (email, name, password) => {
  if (!email.match(emailRegex)) {
    return { status: false, msg: "Enter Valid Email!" };
  }

  if (name === "") {
    return { status: false, msg: "Enter Name!" };
  }

  if (password.length < 6) {
    return { status: false, msg: "Password Must be at Least 6 Characters!" };
  }

  return { status: true };
};

export const logFormValidator = (email, password) => {
  if (!emailRegex.test(email)) {
    return { status: false, msg: "Enter Valid Email!" };
  }

  if (password.length < 6) {
    return { status: false, msg: "Password Must be at Least 6 Characters!" };
  }

  return { status: true };
};

export const claimFormValidator = (card, email, agreeGDPR, phone) => {
  if (card === "") {
    return { status: false, msg: "Enter Casino Card Number!" };
  }
  if (!emailRegex.test(email)) {
    return { status: false, msg: "Enter Valid Email!" };
  }
  if (phone === "") {
    return { status: false, msg: "Enter Phone Number!" };
  }

  if (agreeGDPR === false) {
    return { status: false, msg: "Please Agree with Terms & Conditions!" };
  }

  return { status: true };
};
