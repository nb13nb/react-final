import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/cocktails.module.css';
import { fetchCocktails } from '../api/cocktails';
import FavoriteButton from '../components/FavoriteButton';
import { useAuthContext } from '../context/auth/AuthContextProvider';

function Cocktails() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchCocktails()
      .then((data) => {
        setCocktails(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  const filteredCocktails = cocktails.filter((cocktail) => {
    const matchesSearch = cocktail.strDrink
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === 'All' ? true : cocktail.strCategory === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCocktails.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCocktails.slice(indexOfFirstItem, indexOfLastItem);

  const handleViewDetails = (id) => {
    navigate(`/cocktail/${id}`);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Explore Our Cocktails</h1>

      <div className={styles.controlsRow}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search cocktails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className={styles.selectCategory}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Ordinary Drink">Ordinary Drink</option>
          <option value="Cocktail">Cocktail</option>
        </select>
      </div>

      <div className={styles.cocktailGrid}>
        {currentItems.map((cocktail) => (
          <div className={styles.cocktailCard} key={cocktail.idDrink}>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className={styles.cocktailImg}
            />
            <div className={styles.cocktailInfo}>
              <h2 className={styles.cocktailName}>{cocktail.strDrink}</h2>
              <div className={styles.cocktailCategory}>{cocktail.strCategory}</div>

              <div className={styles.cardButtons}>
                <button
                  className={styles.viewBtn}
                  onClick={() => handleViewDetails(cocktail.idDrink)}
                >
                  Details
                </button>

                <FavoriteButton item={cocktail} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabledBtn : ''
              }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.disabledBtn : ''
              }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Cocktails;
