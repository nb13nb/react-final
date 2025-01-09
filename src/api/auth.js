const BASE_URL = 'https://academyofdigitalindustriesbackend.onrender.com/api/v1/auth';
export const signUp = async (userData) => {
  const resp = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.msg || 'Failed to register');
  }
  return data;
};

export const signIn = async (credentials) => {
  const resp = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  const data = await resp.json();
  if (!resp.ok) {
    throw new Error(data.msg || 'Failed to login');
  }
  return data;
};
