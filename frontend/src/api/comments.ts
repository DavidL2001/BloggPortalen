const API_URL = "http://localhost:5000/api/posts";

export interface CommentUser {
  _id: string;
  username: string;
}

export interface CommentResponse {
  _id: string;
  content: string;
  userId: CommentUser;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
}

export const getPostComments = async (
  postId: string,
): Promise<CommentResponse[]> => {
  const response = await fetch(`${API_URL}/${postId}/comments`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte hämta kommentarerna");
  }

  return data;
};

export const createComment = async (
  token: string,
  postId: string,
  commentData: CreateCommentData,
): Promise<CommentResponse> => {
  const response = await fetch(`${API_URL}/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte skapa kommentaren");
  }

  return data;
};

export const updateComment = async (
  token: string,
  commentId: string,
  content: string,
): Promise<CommentResponse> => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte uppdatera kommentaren");
  }

  return data;
};

export const deleteComment = async (
  token: string,
  commentId: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte ta bort kommentaren");
  }
};
