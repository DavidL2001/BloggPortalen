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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
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

// Uppdaterar username/bio/avatar. Skickas som FormData eftersom
// backend (multer) förväntar sig multipart/form-data för filuppladdning.
export const updateProfile = async (
  token: string,
  updates: { username?: string; bio?: string; avatar?: File }
) => {
  const formData = new FormData();

  if (updates.username !== undefined) {
    formData.append('username', updates.username);
  }
  if (updates.bio !== undefined) {
    formData.append('bio', updates.bio);
  }
  if (updates.avatar) {
    formData.append('avatar', updates.avatar);
  }

  const response = await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: {
      // OBS: Sätt INTE Content-Type manuellt här — browsern sätter
      // rätt multipart-boundary automatiskt när body är FormData.
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Kunde inte uppdatera profilen');
  }

  return data;
};

export const removeAvatar = async (token: string) => {
  const response = await fetch(`${API_URL}/profile/avatar`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Kunde inte ta bort profilbilden');
  }

  return data;
};
