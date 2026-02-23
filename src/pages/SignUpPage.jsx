import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const SignUpPage = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      role_id: '2' // Customer default
    }
  });

  const selectedRole = watch('role_id');
  const password = watch('password');
  const isStoreRole = roles.find(r => r.id === selectedRole)?.name === 'Store';

  // Fetch roles on mount
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get('/roles');
        setRoles(response.data);
      } catch (err) {
        setError('Failed to load roles');
      }
    };
    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Prepare data based on role
      let submitData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: data.role_id
      };

      // Add store data if Store role
      if (isStoreRole) {
        submitData.store = {
          name: data.store_name,
          phone: data.store_phone,
          tax_no: data.store_tax_id,
          bank_account: data.store_bank_account
        };
      }

      await axiosInstance.post('/signup', submitData);

      // Success - redirect with message
      alert('You need to click link in email to activate your account!');
      history.push('/'); // Redirect to homepage
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-[#252B42] mb-8 text-center">
            Sign Up
          </h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-[#252B42] mb-2">
                Name *
              </label>
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name must be at least 3 characters'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

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
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must include uppercase, lowercase, number and special character'
                  }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-[#252B42] mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-bold text-[#252B42] mb-2">
                Role *
              </label>
              <select
                {...register('role_id', { required: 'Role is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              {errors.role_id && (
                <p className="text-red-500 text-sm mt-1">{errors.role_id.message}</p>
              )}
            </div>

            {/* Store Fields - Conditional */}
            {isStoreRole && (
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-bold text-[#252B42] mb-4">
                  Store Information
                </h2>

                {/* Store Name */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#252B42] mb-2">
                    Store Name *
                  </label>
                  <input
                    {...register('store_name', {
                      required: isStoreRole ? 'Store name is required' : false,
                      minLength: {
                        value: 3,
                        message: 'Store name must be at least 3 characters'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    placeholder="Enter store name"
                  />
                  {errors.store_name && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_name.message}</p>
                  )}
                </div>

                {/* Store Phone */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#252B42] mb-2">
                    Store Phone *
                  </label>
                  <input
                    {...register('store_phone', {
                      required: isStoreRole ? 'Store phone is required' : false,
                      pattern: {
                        value: /^(\+90|0)?5\d{9}$/,
                        message: 'Please enter a valid Turkish phone number (e.g., +905551234567)'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    placeholder="+905551234567"
                  />
                  {errors.store_phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_phone.message}</p>
                  )}
                </div>

                {/* Store Tax ID */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#252B42] mb-2">
                    Store Tax ID *
                  </label>
                  <input
                    {...register('store_tax_id', {
                      required: isStoreRole ? 'Store tax ID is required' : false,
                      pattern: {
                        value: /^T\d{4}V\d{6}$/,
                        message: 'Tax ID must match pattern TXXXXVXXXXXX (e.g., T1234V567890)'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    placeholder="T1234V567890"
                  />
                  {errors.store_tax_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_tax_id.message}</p>
                  )}
                </div>

                {/* Store Bank Account (IBAN) */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-[#252B42] mb-2">
                    Store Bank Account (IBAN) *
                  </label>
                  <input
                    {...register('store_bank_account', {
                      required: isStoreRole ? 'Store bank account is required' : false,
                      pattern: {
                        value: /^TR\d{24}$/,
                        message: 'Please enter a valid Turkish IBAN (e.g., TR330006100519786457841326)'
                      }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#23A6F0]"
                    placeholder="TR330006100519786457841326"
                  />
                  {errors.store_bank_account && (
                    <p className="text-red-500 text-sm mt-1">{errors.store_bank_account.message}</p>
                  )}
                </div>
              </div>
            )}

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
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;