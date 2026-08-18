const API_URL = "http://localhost:5000/api/posts";

export interface PostLikesResponse {
  count: number;
  likedByUser: boolean;
}

export const getPostLikes = async (
  postId: string,
  token?: string | null,
): Promise<PostLikesResponse> => {
  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${postId}/likes`, {
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte hämta gilla-markeringar");
  }

  return data;
};

export const likePost = async (
  token: string,
  postId: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}/like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte gilla inlägget");
  }
};

export const unlikePost = async (
  token: string,
  postId: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}/like`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte ta bort gilla-markeringen");
  }
};
