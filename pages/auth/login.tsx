import { useEffect, useState } from 'react';
import styles from '../../styles/auth/Auth.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '../../components/dashboard';
import { loginAdmin } from '../../services/restService';
import {
  saveToken,
  saveCredentials,
  removeCred,
  redirectTo
} from '../../services/localService';
import { setAdmin } from '../../redux/actions/admin';
import { MoonLoader } from 'react-spinners';

const Login = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { admin } = useSelector((state: any) => state.adminReducer);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFields, setInputFields] = useState({
    user_email_phone: 'guest@guest.com',
    password: 'guest@guest.com'
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: any) => {
    setError(false);
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    removeCred();

    if (Object.keys(admin).length > 0) {
      setInputFields({ ...inputFields, user_email_phone: admin?.email });
      dispatch(setAdmin({}));
    }
  }, []);

  const handlelogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const { data } = await loginAdmin(inputFields);
      // const path: any = redirectTo();

      saveToken('eyJhbGcMiOiIzcmQzYiLCest_5H3MFYc');
      saveCredentials(inputFields.user_email_phone, inputFields.password);
      dispatch(
        setAdmin({
          access_token: 'eyJhbGcMiOiIzcmQzYiLCest_5H3MFYc',
          address: '3rd street',
          admin_id: '1UuHpaL4U',
          email: 'guest@guest.com',
          name_of_institution: 'Guest Health',
          permission_flag: 2,
          phone_number: '23312344444',
          registration_number: '56756754354',
          stream_user_id: '945e06a9792387e0376f6',
          stream_user_token: 'eyJhU77jGB5fqgTU',
          subscription_permission_flag: 1,
          _id: '62f8c6e2746d59ed2afc537a'
        })
      );
      // setInputFields({ user_email_phone: '', password: '' });

      // if (path) {
      // push(path);
      // } else {
      push('/dashboard/EHR');
      // }
    } catch (err: any) {
      console.log(err);
      setError(true);
      const errors = err?.response?.data?.errors;
      const error = err?.response?.data?.error;

      if (errors && errors[0].toLowerCase().includes('invalid email')) {
        setErrorMessage('Incorrect email or password');
      } else if (error && error.toLowerCase().includes('password')) {
        setErrorMessage('Incorrect email or password');
      } else {
        setErrorMessage('Connection timeout. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <form className={styles.form}>
          <h1>Login</h1>

          <div className={styles.input_container}>
            {error && errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <div>
              <label className={styles.label} htmlFor='email'>
                Email
              </label>
              <Input
                autoComplete='on'
                id='email'
                name='user_email_phone'
                required={true}
                placeholder='Enter your email'
                type='email'
                styles='input_primary'
                error={error}
                onChange={handleChange}
                value={inputFields.user_email_phone}
              />
            </div>

            <div>
              <label className={styles.label} htmlFor='password'>
                Password
              </label>
              <Input
                // allow auto fill'
                name='password'
                required
                id='password'
                autoComplete='on'
                placeholder='Enter your password'
                type={showPassword ? 'text' : 'password'}
                styles='input_primary'
                error={error}
                onChange={handleChange}
                value={inputFields.password}
                img='/assets/login/eye.svg'
                width='22px'
                height='15px'
                layout='fixed'
                handleImageChange={handleShowPassword}
              />

              <Link href={'/auth/forgot-password'}>
                <a className={styles.forgot_password}>Forgot password?</a>
              </Link>
            </div>
          </div>

          <>
            {isLoading ? (
              <div className={styles.isLoading}>
                <MoonLoader color='#0055d2' size={30} />
              </div>
            ) : (
              <>
                {' '}
                <div>
                  <Button
                    onClick={handlelogin}
                    disabled={
                      inputFields.user_email_phone === '' ||
                      inputFields.password === '' ||
                      isLoading ||
                      error
                    }
                    className='btn_primary w-full'
                  >
                    Log in
                  </Button>
                </div>
                <div className={styles.sign_up}>
                  <p>
                    Don't have an account?{' '}
                    <Link href={'/auth/signup'}>
                      <a className={styles.sign_up_link}>Sign up</a>
                    </Link>
                  </p>
                </div>
              </>
            )}
          </>
        </form>
      </div>
    </div>
  );
};

export default Login;
