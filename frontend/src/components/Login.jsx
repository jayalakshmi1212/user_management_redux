import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios'
import '../style/login.css';
import { useNavigate } from 'react-router-dom'; 

const LoginSignup = () => {
    const [isActive, setIsActive] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsActive(!isActive);
        setLoginError(''); 
    };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Required')
            .trim()
            .matches(/^[^\s]+(\s[^\s]+)*$/, 'Name must not contain leading or trailing spaces'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
            .required('Required'),
    });

    const formikSignup = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values)
                const response = await axios.post('http://localhost:8000/api/auth/register/', {
                    username: values.fullName,
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                console.log('Sign Up successful', response.data);

                navigate('/home');
            } catch (error) {
                console.error('Error signing up:', error.response.data);
            }
        },
    });
    
    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email format')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
                .required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:8000/api/auth/login/', {
                    email: values.email,
                    password: values.password,
                });
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                console.log('Login successful', response.data);
                navigate('/home');
            } catch (error) {
                
                if (error.response && error.response.status === 400) {
                    alert('User does not exist'); 
                } else {
                    setLoginError('Error logging in'); 
                }
                console.error('Error logging in:', error.response.data);
            }
        },
    });
   


    return (
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={formikSignup.handleSubmit}>
                    <h1>Create Account</h1>
                    {/* <div className="social-icons">
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGoogle} /></a>
                    </div> */}
                    <span>or use your email for register</span>
                    <input
                        type="text"
                        placeholder="Full Name"
                        {...formikSignup.getFieldProps('fullName')}
                    />
                    {formikSignup.touched.fullName && formikSignup.errors.fullName ? (
                        <div className="error">{formikSignup.errors.fullName}</div>
                    ) : null}
                    <input
                        type="email"
                        placeholder="Email"
                        {...formikSignup.getFieldProps('email')}
                    />
                    {formikSignup.touched.email && formikSignup.errors.email ? (
                        <div className="error">{formikSignup.errors.email}</div>
                    ) : null}
                    <input
                        type="password"
                        placeholder="Password"
                        {...formikSignup.getFieldProps('password')}
                    />
                    {formikSignup.touched.password && formikSignup.errors.password ? (
                        <div className="error">{formikSignup.errors.password}</div>
                    ) : null}
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={formikLogin.handleSubmit}>
                    <h1>Sign In</h1>
                    {/* <div className="social-icons">
                        <a href="#" className="icon"><FontAwesomeIcon icon={faGoogle} /></a>
                    </div> */}
                    <span>or use your email and password</span>
                    <input
                        type="email"
                        placeholder="Email"
                        {...formikLogin.getFieldProps('email')}
                    />
                    {formikLogin.touched.email && formikLogin.errors.email ? (
                        <div className="error">{formikLogin.errors.email}</div>
                    ) : null}
                    <input
                        type="password"
                        placeholder="Password"
                        {...formikLogin.getFieldProps('password')}
                    />
                    {formikLogin.touched.password && formikLogin.errors.password ? (
                        <div className="error">{formikLogin.errors.password}</div>
                    ) : null}
                    <a href="#">Forgot Password?</a>
                    <button type="submit">Log In</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all of site features.</p>
                        <button className="hidden" onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Subscriber!</h1>
                        <p>Register with your personal details to use all of site features.</p>
                        <button className="hidden" onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
