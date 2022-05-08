const PLACEHOLDER = {
  email: "Email Address",
  forgotEmail: "Enter your email address",
  password: "Password",
  firstName: "First Name",
  lastName: "Last Name",
  phoneNumber: "Phone Number",
  licenseNumber: "License Number",
  name: "Name",
  currentPass: "Current Password",
  oldPass: "New Password",
  confirmPass: "Confirm New Password",
  personalDetail: "Driver Detail",
  carDetail: "Car Detail",
  networkInfo: "No Internet Connection",
  notification: "No notifications yet",
  noDataFound: "No data found"
};

const LABEL = {
  email: "Enter Email Address"
};

const VALIDATION = {
  cardImageValidation: "Insert image",
  driverImage: "Insert profile image",
  firstName: "First name required",
  lastName: "Last name required",
  phoneNumber: "Phone number required",
  email: "Enter email address",
  emailError: "Invalid email address",
  passwordField: "Password required",
  password: "Password should be 6 character",
  date: "Date required",
  licenseNumber: "License number required",
  insuranceNumber: "Insurance number required",
  socialSecurityNumber: "Social security number required",
  address: "Address required",
  state: "State required",
  city: "City required",

  // Car Detail
  carMake: "Car make required",
  carModalName: "Car model name required",
  carModalYear: "Car model year required",
  carColor: "Car color required",
  carTransmission: "Car transmission required",
  registrationNumber: "Registration number required",
  carInsuranseNumber: "Car insurance number required ",

  // Profile
  name: "Name required",
  // Change Password
  currentPassword: "Current Password required",
  newPassword: "New Password required",
  confirmPass: "Confirm Password required",
  passmatach: "Password do not matach"
};

const API_SUCCESS_MESSAGE = {
  forgotPassword: "Email has been Sent",
  passengerCancelRide: "Passenger has cancel ride",
  rideProgress: "Ride in progress you need complete ride"
};

export default {
  PLACEHOLDER,
  LABEL,
  VALIDATION,
  API_SUCCESS_MESSAGE
};
