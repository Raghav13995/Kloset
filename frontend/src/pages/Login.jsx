import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../utility/validation';
import { useDispatch ,useSelector} from 'react-redux';
import { setToken } from '../slices/authslice';
import { setUser } from '../slices/profileslice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user' // Default role is "user"
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useSelector(state => state.profile);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            console.log("Hi")
            const response = await fetch(formData.role==="user" ? 'http://localhost:8000/api/v1/auth/login':'http://localhost:8000/api/v1/renterAuth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            console.log("hi2");
            console.log("Res - ",response);
            const data = await response.json();
            console.log("Data ",data);
            console.log("hi3");
            if (data.success) {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.user));

                dispatch(setToken(data.token));
                dispatch(setUser(data.user));

                // console.log("User", user);
                console.log("role",formData.role);
                // Redirect based on role
                // if (formData.role === 'renter') {
                    // navigate('/renter-dashboard'); // Redirect to Renter's dashboard
                // } else {
                    navigate('/'); // Redirect to User's homepage
                // }
            } else {
                setErrors({ submit: data.message || 'Login failed' });
            }
        } catch (error) {
            setErrors({ submit: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="sr-only">Email address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    errors.email ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
                                } placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded ${
                                formData.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setFormData((prev) => ({ ...prev, role: 'user' }))}
                        >
                            Login as User
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded ${
                                formData.role === 'renter' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                            onClick={() => setFormData((prev) => ({ ...prev, role: 'renter' }))}
                        >
                            Login as Renter
                        </button>
                    </div>

                    {errors.submit && (
                        <div className="text-red-500 text-sm text-center">{errors.submit}</div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                                isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    <div className="text-sm text-center">
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Don't have an account? Sign up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
