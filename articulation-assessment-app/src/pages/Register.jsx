import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Register.Module.css";
import { RegisterApi } from '../api';

const RegisterPage = () => { 
    const navigate = useNavigate();

    useEffect(() => {
        const token = document.cookie.includes('token');

        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const [isRegistered, setIsRegistered] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // State for password criteria
    const [criteria, setCriteria] = useState({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumbers: false,
        hasSpecialChars: false,
        passwordsMatch: false
    });

    const isFormValid = () => {
        return password.trim() !== '' && email.trim() !== '' && passwordAgain.trim() !== '' && firstName.trim() !== '' && lastName.trim() !== '';
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePassword = (password, passwordAgain) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        setCriteria({
            minLength: password.length >= minLength,
            hasUpperCase: hasUpperCase,
            hasLowerCase: hasLowerCase,
            hasNumbers: hasNumbers,
            hasSpecialChars: hasSpecialChars,
            passwordsMatch: password === passwordAgain
        });

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars && password === passwordAgain;
    };

    const handleRegister = async () => {
        try {
            const formValid = isFormValid();
            const emailValid = validateEmail(email);
            const passwordValid = validatePassword(password, passwordAgain);
        
            const errorElement = document.getElementById('errorRegister');
            
            if (!formValid) {
                errorElement.innerText = "Please fill in your information";
                return;
            }

            if (!emailValid) {
              errorElement.innerText = "Invalid email format";
              return;
            }

            if (!passwordValid) {
              errorElement.innerText = "Password does not meet the criteria, check the 'i' to see the criteria";
              return;
            }
        
            const registerCredentials = {
                firstName, 
                lastName,
                email,
                password
            };

            const registerResponse = await RegisterApi(registerCredentials);

            if (registerResponse.success) {
                setIsRegistered(true);
            } else {
                errorElement.innerText = registerResponse.error;
            }
            
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <div className='register'>
            <h1>Register</h1>
            {!isRegistered ? (
                <>
                    <p>Welcome to the articulation assessment platform, here you can sign up to use the platform as a speech therapist.</p>
                    <div className='registerContainer'>
                        <div className='box'>
                            <div className='inputGroup'>
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    className='registerInput'
                                    type="email" 
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='inputGroup'>
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                    id="firstName"
                                    className='registerInput'
                                    type="text" 
                                    placeholder="First name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className='inputGroup'>
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                    id="lastName"
                                    className='registerInput'
                                    type="text" 
                                    placeholder="Last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='box'>
                            <div className='inputGroup'>
                                <label htmlFor="password">Password 
                                    <span className="tooltip">i
                                        <div className="tooltiptext">
                                            <p>Password must contain:</p>
                                            <ul>
                                                <li className={criteria.minLength ? 'valid' : 'invalid'}>At least 8 characters</li>
                                                <li className={criteria.hasUpperCase ? 'valid' : 'invalid'}>An uppercase letter</li>
                                                <li className={criteria.hasLowerCase ? 'valid' : 'invalid'}>A lowercase letter</li>
                                                <li className={criteria.hasNumbers ? 'valid' : 'invalid'}>A number</li>
                                                <li className={criteria.hasSpecialChars ? 'valid' : 'invalid'}>A special character</li>
                                                <li className={criteria.passwordsMatch ? 'valid' : 'invalid'}>Passwords match</li>
                                            </ul>
                                        </div>
                                    </span>
                                </label>
                                <input 
                                    id="password"
                                    className='registerInput'
                                    type="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        validatePassword(e.target.value, passwordAgain);
                                    }}
                                />
                            </div>
                            <div className='inputGroup'>
                                <label htmlFor="passwordAgain">Password Again</label>
                                <input 
                                    id="passwordAgain"
                                    className='registerInput'
                                    type="password" 
                                    placeholder="Password again"
                                    value={passwordAgain}
                                    onChange={(e) => {
                                        setPasswordAgain(e.target.value);
                                        validatePassword(password, e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className='error' id='errorRegister'></p>
                    <button className='registerButton' onClick={handleRegister}>Register</button>
                </>
            ) : (
                <p>You have registered successfully, try logging in now.</p>
            )}
        </div>
    );
};

export default RegisterPage;
