import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/favorites.module.css';
import { FaStar } from 'react-icons/fa';

function Favorites() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(stored);
  }, []);

  const removeFavorite = (idDrink) => {
    const updated = favorites.filter((fav) => fav.idDrink !== idDrink);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleViewIngredients = (idDrink) => {
    navigate(`/cocktail/${idDrink}`);
  };

  if (favorites.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Your Favorites</h1>
        <p className={styles.noFavorites}>
          You have no favorites yet. Start adding cocktails!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Your Favorites</h1>
      <div className={styles.favoritesGrid}>
        {favorites.map((fav) => (
          <div className={styles.favoriteCard} key={fav.idDrink}>
            <img
              src={fav.strDrinkThumb}
              alt={fav.strDrink}
              className={styles.favImg}
            />

            <FaStar
              className={styles.favoriteIcon}
              onClick={() => removeFavorite(fav.idDrink)}
            />

            <div className={styles.favInfo}>
              <h2 className={styles.favName}>{fav.strDrink}</h2>
              <div className={styles.favCategory}>{fav.strCategory}</div>

              <button
                className={styles.ingredientsBtn}
                onClick={() => handleViewIngredients(fav.idDrink)}
              >
                See Ingredients
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;