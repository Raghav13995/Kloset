import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validatePhone, validateName, validateOTP } from '../utility/validation';

const Register = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Initial form, 2: OTP verification
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        Contact: '',
        otp: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateInitialForm = () => {
        const newErrors = {};
        
        if (!formData.firstname) {
            newErrors.firstname = 'First name is required';
        } else if (!validateName(formData.firstname)) {
            newErrors.firstname = 'Please enter a valid first name';
        }

        if (!formData.lastname) {
            newErrors.lastname = 'Last name is required';
        } else if (!validateName(formData.lastname)) {
            newErrors.lastname = 'Please enter a valid last name';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters with one uppercase, one lowercase, and one number';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.Contact) {
            newErrors.Contact = 'Phone number is required';
        } else if (!validatePhone(formData.Contact)) {
            newErrors.Contact = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateOTPForm = () => {
        const newErrors = {};
        
        if (!formData.otp) {
            newErrors.otp = 'OTP is required';
        } else if (!validateOTP(formData.otp)) {
            newErrors.otp = 'Please enter a valid 6-digit OTP';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleGenerateOTP = async () => {
        console.log("heloo0");
        if (!validateInitialForm()) {
            return;
        }
        console.log("handleGenerateOTP");
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/generate-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: formData.email })
            });
            console.log("handleGenerateOTP2");
            const data = await response.json();
            console.log("printing data",data);
            if (data.success) {
                setStep(2);
            } else {
                setErrors({
                    submit: data.message || 'Failed to send OTP'
                });
            }
        } catch (error) {
            setErrors({
                submit: 'An error occurred. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("heloo");
        if (step === 1) {
            console.log("heloo1");
            handleGenerateOTP();
            console.log("heloo3");
            return;
        }
        console.log("heloo2");
        if (!validateOTPForm()) {
            return;
        }
        console.log("heloo4");
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            console.log("printing data2",data);
            if (data.success) {
                navigate('/login');
            } else {
                setErrors({
                    submit: data.message || 'Registration failed'
                });
            }
        } catch (error) {
            setErrors({
                submit: 'An error occurred. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? 'Create your account' : 'Verify your email'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {step === 1 ? (
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstname" className="sr-only">First name</label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        required
                                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                            errors.firstname ? 'border-red-500' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                        placeholder="First name"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                    />
                                    {errors.firstname && (
                                        <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="sr-only">Last name</label>
                                    <input
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        required
                                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                            errors.lastname ? 'border-red-500' : 'border-gray-300'
                                        } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                        placeholder="Last name"
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                    {errors.lastname && (
                                        <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="Contact" className="sr-only">Phone number</label>
                                <input
                                    id="Contact"
                                    name="Contact"
                                    type="tel"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        errors.Contact ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Phone number"
                                    value={formData.Contact}
                                    onChange={handleChange}
                                />
                                {errors.Contact && (
                                    <p className="text-red-500 text-xs mt-1">{errors.Contact}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        errors.password ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm password</label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                                    } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Confirm password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.otp ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Enter 6-digit OTP"
                                value={formData.otp}
                                onChange={handleChange}
                            />
                            {errors.otp && (
                                <p className="text-red-500 text-xs mt-1">{errors.otp}</p>
                            )}
                        </div>
                    )}

                    {errors.submit && (
                        <div className="text-red-500 text-sm text-center">
                            {errors.submit}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLoading 
                                ? (step === 1 ? 'Sending OTP...' : 'Registering...')
                                : (step === 1 ? 'Continue' : 'Register')}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Already have an account? Sign in
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register; 