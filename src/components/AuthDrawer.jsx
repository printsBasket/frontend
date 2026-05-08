import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, ArrowRight, Loader2, Mail, Key } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login, sendRegistrationOTP, verifyRegistrationOTP, forgotPassword, resetPassword } from '../redux/actions/userActions';
import { USER_AUTH_CLEAR_MESSAGES } from '../redux/constants/userConstants';

const AuthDrawer = ({ isOpen, onClose }) => {
    const [mode, setMode] = useState('login'); // 'login', 'signup', 'verify-otp', 'forgot-password', 'reset-password'
    const [showPassword, setShowPassword] = useState(false);

    // Form states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    // Messages
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const { loading, error, userInfo } = useSelector((state) => state.userLogin);
    const { loading: loadingSendOTP, error: errorSendOTP, success: successSendOTP } =
        useSelector((state) => state.userSendOTP);
    const { loading: loadingVerifyOTP, error: errorVerifyOTP, success: successVerifyOTP } =
        useSelector((state) => state.userVerifyOTP);
    const { loading: loadingForgot, error: errorForgot, success: successForgot } =
        useSelector((state) => state.userForgotPassword);
    const { loading: loadingReset, error: errorReset, success: successReset } =
        useSelector((state) => state.userResetPassword);

    const resetTransientState = (nextMode = 'login') => {
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setMode(nextMode);
        setShowPassword(false);
        setSuccessMessage(null);
        setErrorMessage(null);
        setOtp('');
    };

    const handleClose = () => {
        resetTransientState('login');
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
            setSuccessMessage(null);
            setErrorMessage(null);
        }
    }, [dispatch, isOpen]);

    /* ---------------- LOGIN SUCCESS ---------------- */
    useEffect(() => {
        if (userInfo) {
            setSuccessMessage('Login Successful! Redirecting...');
            const timer = setTimeout(() => {
                dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
                setMode('login');
                setShowPassword(false);
                setSuccessMessage(null);
                setErrorMessage(null);
                setOtp('');
                onClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [dispatch, onClose, userInfo]);

    /* ---------------- SUBMIT ---------------- */
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch({ type: USER_AUTH_CLEAR_MESSAGES });
        setErrorMessage(null);
        setSuccessMessage(null);

        if (mode === 'signup') {
            if (password.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (password !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(sendRegistrationOTP(firstName, lastName, email.trim(), password));
            }
        } else if (mode === 'verify-otp') {
            dispatch(verifyRegistrationOTP(email.trim(), otp));
        } else if (mode === 'forgot-password') {
            dispatch(forgotPassword(email.trim()));
        } else if (mode === 'reset-password') {
            if (newPassword.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else if (newPassword !== confirmPassword) {
                setErrorMessage('Passwords do not match');
            } else {
                dispatch(resetPassword(email.trim(), otp, newPassword));
            }
        } else {
            dispatch(login(email.trim(), password));
        }
    };

    /* ---------------- OTP SENT ---------------- */
    useEffect(() => {
        if (successSendOTP) {
            setMode('verify-otp');
            setSuccessMessage('OTP sent to your email.');
        }
    }, [successSendOTP]);

    /* ---------------- OTP VERIFIED ---------------- */
    useEffect(() => {
        if (successVerifyOTP) {
            setMode('login');
            setSuccessMessage('OTP verified successfully! Please login.');
            setOtp('');
        }
    }, [successVerifyOTP]);

    /* ---------------- FORGOT PASSWORD ---------------- */
    useEffect(() => {
        if (successForgot) {
            setMode('reset-password');
            setSuccessMessage('OTP sent to your email for password reset.');
        }
    }, [successForgot]);

    /* ---------------- PASSWORD RESET ---------------- */
    useEffect(() => {
        if (successReset) {
            setMode('login');
            setSuccessMessage('Password reset successfully! Please login.');
            setOtp('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [successReset]);

    /* ---------------- ERRORS ---------------- */
    useEffect(() => {
        if (error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset) {
            setErrorMessage(
                error || errorSendOTP || errorVerifyOTP || errorForgot || errorReset
            );
        }
    }, [error, errorSendOTP, errorVerifyOTP, errorForgot, errorReset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-md rounded-xl shadow-lg relative animate-in zoom-in-95 duration-200">
                <X
                    className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={handleClose}
                    size={24}
                />

                {/* HEADER WITH TABS */}
                <div className="flex border-b">
                    <button
                        onClick={() => resetTransientState('login')}
                        className={`flex-1 py-4 text-sm font-medium transition-all ${
                            mode === 'login' || mode === 'forgot-password'
                                ? 'border-b-2 border-blue-500 text-black'
                                : 'text-gray-400'
                        }`}
                    >
                        🔒 Login
                    </button>
                    <button
                        onClick={() => resetTransientState('signup')}
                        className={`flex-1 py-4 text-sm font-medium transition-all ${
                            mode === 'signup' || mode === 'verify-otp'
                                ? 'border-b-2 border-blue-500 text-black'
                                : 'text-gray-400'
                        }`}
                    >
                        👤 Register
                    </button>
                </div>

                {/* ERROR MESSAGE */}
                {errorMessage && (
                    <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                        {errorMessage}
                    </div>
                )}

                {/* SUCCESS MESSAGE */}
                {successMessage && (
                    <div className="mx-6 mt-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-lg text-sm font-medium">
                        {successMessage}
                    </div>
                )}

                <div className="p-6 space-y-4">
                    {mode === 'login' && (
                        /* Login Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-2 text-gray-500 hover:text-blue-500"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="flex justify-between text-sm">
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('forgot-password')}
                                    className="text-blue-500 cursor-pointer hover:text-blue-600 font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors disabled:opacity-70"
                            >
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    )}

                    {mode === 'signup' && (
                        /* Signup Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password (min 6 characters)"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingSendOTP}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
                            >
                                {loadingSendOTP ? 'Sending OTP...' : 'Register'}
                            </button>
                        </form>
                    )}

                    {mode === 'verify-otp' && (
                        /* OTP Verification Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Mail className="text-blue-500" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    We've sent a 6-digit OTP to <strong>{email}</strong>
                                </p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="000000"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors text-center text-lg font-mono"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingVerifyOTP || otp.length !== 6}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors disabled:opacity-70"
                            >
                                {loadingVerifyOTP ? 'Verifying...' : 'Verify & Create Account'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                Didn't receive OTP?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('signup')}
                                    className="text-blue-500 font-bold hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'forgot-password' && (
                        /* Forgot Password Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Mail className="text-blue-500" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Enter your email address and we'll send you a reset code
                                </p>
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingForgot}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors disabled:opacity-70"
                            >
                                {loadingForgot ? 'Sending...' : 'Send Reset Code'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                Remember your password?{' '}
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('login')}
                                    className="text-blue-500 font-bold hover:underline"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    {mode === 'reset-password' && (
                        /* Reset Password Form */
                        <form className="space-y-4" onSubmit={submitHandler}>
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Key className="text-blue-500" size={20} />
                                </div>
                                <p className="text-gray-600 text-sm">
                                    Enter the OTP sent to <strong>{email}</strong> and your new password
                                </p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="000000"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors text-center text-lg font-mono"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    className="w-full border-b py-2 outline-none focus:border-blue-500 transition-colors"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loadingReset || otp.length !== 6}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-colors disabled:opacity-70"
                            >
                                {loadingReset ? 'Resetting...' : 'Reset Password'}
                            </button>
                            <div className="text-center text-sm text-gray-500">
                                <button
                                    type="button"
                                    onClick={() => resetTransientState('forgot-password')}
                                    className="text-blue-500 font-bold hover:underline"
                                >
                                    Try different email
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <div className="absolute inset-0 -z-10" onClick={handleClose} onKeyDown={(e) => e.key === 'Escape' && handleClose()} role="button" tabIndex={-1} aria-label="Close dialog"></div>
        </div>
    );
};

export default AuthDrawer;
