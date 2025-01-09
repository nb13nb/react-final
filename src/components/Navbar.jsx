import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import styles from '../styles/navbar.module.css';

import { useAuthContext } from '../context/auth/AuthContextProvider';
import { logOutAction } from '../context/auth/actions';

function Navbar() {
  const { state, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOutAction());
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.navbarContent}>
        <Link to="/" className={styles.navbarBrand}>
          Cocktail Launge
        </Link>

        <FaBars className={styles.hamburger} onClick={toggleMobileMenu} />

        <div className={styles.navMenu}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/cocktails" className={styles.navLink}>Cocktails</Link>
          <Link to="/favorites" className={styles.navLink}>Favorites</Link>

          {state.isAuthenticated ? (
            <button className={styles.navButton} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/signin" className={styles.navLink}>Sign In</Link>
              <Link to="/signup" className={styles.navButton}>Sign Up</Link>
            </>
          )}
        </div>
      </div>

      <div
        className={
          mobileOpen
            ? `${styles.navMenuMobile} ${styles.navMenuMobileOpen}`
            : styles.navMenuMobile
        }
      >
        <Link to="/" className={styles.navLink} onClick={() => setMobileOpen(false)}>
          Home
        </Link>
        <Link to="/cocktails" className={styles.navLink} onClick={() => setMobileOpen(false)}>
          Cocktails
        </Link>
        <Link to="/favorites" className={styles.navLink} onClick={() => setMobileOpen(false)}>
          Favorites
        </Link>

        {state.isAuthenticated ? (
          <button
            className={styles.navButton}
            onClick={() => {
              handleLogout();
              setMobileOpen(false);
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin" className={styles.navLink} onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
            <Link to="/signup" className={styles.navButton} onClick={() => setMobileOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
