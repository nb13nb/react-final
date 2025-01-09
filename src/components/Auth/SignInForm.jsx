import React, { useState } from 'react';
import styles from '../../styles/signInForm.module.css';
import { signIn } from '../../api/auth';
import { useAuthContext } from '../../context/auth/AuthContextProvider';
import { logInAction } from '../../context/auth/actions';
import { Link, useNavigate } from 'react-router-dom';

function SignInForm() {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [info, setInfo] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setError('');

    signIn(info)
      .then((data) => {
        dispatch(logInAction(data));
        navigate('/cocktails');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className={styles.signInWrapper}>
      <div className={styles.signInCard}>
        <h2 className={styles.signInTitle}>Sign In</h2>
        
        {error && <p className={styles.errorMessage}>{error}</p>}

        <form className={styles.signInForm} onSubmit={handleSignIn}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email</label>
            <input
              type="email"
              className={styles.formInput}
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <input
              type="password"
              className={styles.formInput}
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Sign In
          </button>
        </form>

        <div className={styles.altOption}>
          <span>Don't have an account? </span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
