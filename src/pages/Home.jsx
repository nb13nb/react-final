import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/home.module.css';
import { fetchCocktails } from '../api/cocktails';

function Home() {
  const [cocktails, setCocktails] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCocktails()
      .then((data) => {
        setCocktails(data.slice(0, 4));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleReadRecipe = (id) => {
    navigate(`/cocktail/${id}`);
  };

  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Elevate Your Cocktail Experience</h1>
          <p className={styles.heroSubtitle}>
            Explore new flavors, learn classic recipes, and become your own mixologist.
          </p>
          <Link to="/cocktails" className={styles.heroBtn}>Explore Cocktails</Link>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <h2 className={styles.aboutTitle}>Welcome to Cocktail Haven</h2>
        <p className={styles.aboutParagraph}>
          From timeless classics like the Old Fashioned and the Manhattan, 
          to modern twists and exotic blends, we've curated a selection of cocktails 
          to delight every palate. Our mission? To bring the art of mixology 
          into your home. Shake, stir, and sip on the best flavors from around the world.
        </p>
      </section>

      <section className={styles.cocktailsSection}>
        <h2 className={styles.sectionTitle}>Featured Cocktails</h2>
        
        {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}

        <div className={styles.cocktailGrid}>
          {!loading && !error && cocktails.map((cocktail) => (
            <div className={styles.card} key={cocktail.idDrink}>
              <img
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
                className={styles.cardImg}
              />
              <div className={styles.cardInfo}>
                <h4 className={styles.cardName}>{cocktail.strDrink}</h4>
                <p className={styles.cardCategory}>{cocktail.strCategory}</p>
                
                <button
                  className={styles.readBtn}
                  onClick={() => handleReadRecipe(cocktail.idDrink)}
                >
                  Read Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
