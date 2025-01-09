const BASE_URL = 'https://the-cocktail-db.p.rapidapi.com';
const HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': '3239d8ea38msh5acc6b680c84ce5p15c95ejsna656a1564b05',
  'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
};

export const fetchCocktails = async () => {
  const resp = await fetch(`${BASE_URL}/popular.php`, {
    method: 'GET',
    headers: HEADERS,
  });
  if (!resp.ok) {
    throw new Error('Failed to fetch cocktails');
  }
  const data = await resp.json();
  return data.drinks;
};

export const fetchCocktailDetail = async (id) => {
  const resp = await fetch(`${BASE_URL}/lookup.php?i=${id}`, {
    method: 'GET',
    headers: HEADERS,
  });
  if (!resp.ok) {
    throw new Error('Failed to fetch cocktail details');
  }
  const data = await resp.json();
  return data.drinks[0];
};
