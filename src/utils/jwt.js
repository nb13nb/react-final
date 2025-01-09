
export const isTokenValid = (token) => {
    if (!token) return false;
  
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return false;
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedPayload = JSON.parse(window.atob(base64));
      const exp = decodedPayload.exp;
      if (!exp) return false;
  
      const now = Math.floor(Date.now() / 1000);
      return exp > now;
    } catch (error) {
      return false;
    }
  };
  