import React, { useState } from 'react';
import styles from '../../styles/signUpForm.module.css';
import { signUp } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';

function SignUpForm() {
  const [info, setInfo] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');

    signUp(info)
      .then(() => {
        navigate('/signin');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.signUpCard}>
        <h2 className={styles.signUpTitle}>Create an Account</h2>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <form className={styles.signUpForm} onSubmit={handleSignUp}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Username</label>
            <input
              type="text"
              className={styles.formInput}
              value={info.userName}
              onChange={(e) =>
                setInfo({ ...info, userName: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              className={styles.formInput}
              value={info.email}
              onChange={(e) =>
                setInfo({ ...info, email: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.formInput}
              value={info.password}
              onChange={(e) =>
                setInfo({ ...info, password: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign Up
          </button>
        </form>

        <div className={styles.altOption}>
          <span>Already have an account? </span>
          <Link to="/signin">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
