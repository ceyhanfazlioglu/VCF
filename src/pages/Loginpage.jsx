import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { loginUser } from '../store/actions/authActions';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const { email, password, remember_me } = data;

    const result = await dispatch(loginUser(
      { email, password },
      remember_me
    ));

    setLoading(false);

    if (result.success) {
      const from = history.location.state?.from || '/';
      history.push(from);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-[#252B42] mb-8 text-center">
            Login
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-[#252B42] mb-2">
                Email *
              </label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-[#252B42] mb-2">
                Password *
              </label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required'
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember_me"
                {...register('remember_me')}
                className="w-4 h-4 text-[#23A6F0] border-gray-300 rounded focus:ring-[#23A6F0]"
              />
              <label htmlFor="remember_me" className="ml-2 text-sm text-[#737373]">
                Remember Me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#23A6F0] text-white py-3 rounded font-bold hover:bg-[#1a8ad1] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#737373]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#23A6F0] hover:underline font-bold">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-center">
            <p className="text-xs font-bold text-[#23A6F0] mb-1">🧪 Test Account</p>
            <p className="text-xs text-[#737373]">Email: <span className="font-mono font-bold text-[#252B42]">customer@commerce.com</span></p>
            <p className="text-xs text-[#737373]">Password: <span className="font-mono font-bold text-[#252B42]">123456</span></p>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default LoginPage;