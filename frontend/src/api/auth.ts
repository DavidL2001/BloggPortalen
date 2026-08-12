const API_URL = 'http://localhost:5000/api/auth';



export interface AuthResponse {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: string;
  token: string;
}


export const register = async (
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registrering misslyckades');
  }

  return data;

};

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {

      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {

    throw new Error(data.message || 'Inloggning misslyckades');
  }

  return data;
};

export const getMe = async (token: string) => {
  const response = await fetch(`${API_URL}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Kunde inte hämta profil');
  }

  return data;
};


export const updateProfile = async (
  token: string,
  updates: { username?: string; bio?: string; avatar?: string }
) => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
    
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Kunde inte uppdatera profilen');
  }

  return data;
};
