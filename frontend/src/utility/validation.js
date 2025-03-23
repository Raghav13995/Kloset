// Email validation
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password validation (minimum 8 characters, at least one uppercase, one lowercase, one number)
export const validatePassword = (password) => {
    // This regular expression checks if the password contains at least one lowercase letter, one uppercase letter, one digit, and is at least 8 characters long.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

// Phone number validation (10 digits)
export const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
};

// Name validation (only letters and spaces, minimum 2 characters)
export const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
};

// Pincode validation (6 digits)
export const validatePincode = (pincode) => {
    const pincodeRegex = /^\d{6}$/;
    return pincodeRegex.test(pincode);
};

// Date of birth validation (must be in the past and user must be at least 13 years old)
export const validateDOB = (dob) => {
    const date = new Date(dob);
    const today = new Date();
    const minAge = 13;
    const age = today.getFullYear() - date.getFullYear();
    return age >= minAge && date < today;
};

// Gender validation
export const validateGender = (gender) => {
    const validGenders = ['male', 'female', 'other', 'prefer not to say'];
    return validGenders.includes(gender.toLowerCase());
};

// OTP validation (6 digits)
export const validateOTP = (otp) => {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
}; 