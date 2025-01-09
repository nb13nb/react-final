import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './favoriteButton.module.css';

function FavoriteButton({ item }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];
    const found = stored.find((fav) => fav.idDrink === item.idDrink);
    setIsFavorite(!!found);
  }, [item]);

  const handleFavoriteClick = () => {
    const stored = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updated = stored.filter((fav) => fav.idDrink !== item.idDrink);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      stored.push(item);
      localStorage.setItem('favorites', JSON.stringify(stored));
      setIsFavorite(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }
  };

  return (
    <>
      <FaStar
        className={`${styles.favoriteIcon} ${isFavorite ? styles.activeStar : ''}`}
        onClick={handleFavoriteClick}
      />

      {showToast && (
        <div className={styles.toastMessage}>
          Product has been added to favorites
        </div>
      )}
    </>
  );
}

export default FavoriteButton;
