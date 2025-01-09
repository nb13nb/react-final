import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCocktailDetail } from '../api/cocktails';
import styles from '../styles/cocktailDetail.module.css';
import FavoriteButton from '../components/FavoriteButton'; 

function CocktailDetail() {
  const { cocktailId } = useParams();
  const [cocktail, setCocktail] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCocktailDetail(cocktailId)
      .then((data) => {
        setCocktail(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [cocktailId]);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }
  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>{error}</p>;
  }
  if (!cocktail) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No cocktail found.</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }

  return (
    <div className={styles.pageContainer}>
      <Link to="/cocktails" className={styles.backLink}>&larr; Back to Cocktails</Link>

      <div className={styles.detailsWrapper}>
        <div>
          <img
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            className={styles.cocktailImage}
          />
        </div>

        <div className={styles.infoSection}>
          <h2 className={styles.cocktailTitle}>{cocktail.strDrink}</h2>
          <div className={styles.category}>{cocktail.strCategory}</div>
          <p className={styles.description}>{cocktail.strInstructions}</p>

          <ul className={styles.ingredientList}>
            <h4>Ingredients</h4>
            {ingredients.map((ing) => (
              <li key={ing} className={styles.ingredientItem}>{ing}</li>
            ))}
          </ul>

          <div className={styles.actionsRow}>
            <FavoriteButton item={cocktail} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CocktailDetail;
