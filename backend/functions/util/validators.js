const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isEmpty = (string) => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

exports.validateSignUp = (newUser) => {
  let errors = {};
  console.log(newUser);
  if (isEmpty(newUser.email)) {
    errors.email = "Must must not be empty!";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address!";
  }

  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  else if (newUser.password !== newUser.confirmPassword)
    errors.password = "Passwords must Match";
  if (isEmpty(newUser.userName)) errors.userName = "Username cannot be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

const isEmail = (email) => {
  if (email.match(emailRegEx)) return true;
  else return false;
};

exports.validateLogin = (user) => {

  console.log(user.password)
  let errors = {};
  if (isEmpty(user.email)) {
    errors.email = "Must must not be empty!";
  } else if (!isEmail(user.email)) {
    errors.email = "Must be a valid email address!";
  }

  if (isEmpty(user.password)) {
    
    errors.password = "Must not be empty.";
  }

  // if (Object.keys(errors).length > 0) {
  //   return res.status(400).json(errors);
  // }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  console.log(data);

  if (!isEmpty(data.bio.trim())) {
    userDetails.bio = data.bio;
  }
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
};
