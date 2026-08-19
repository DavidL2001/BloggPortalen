const API_URL = "http://localhost:5000/api/posts";

export interface CreatePostData {
  title: string;
  content: string;
  categoryId: string;
  image?: File;
  altText?: string;
}

export interface PostResponse {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  altText: string;
  authorId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListItem {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  altText: string;
  authorId: {
    _id: string;
    username: string;
  };
  categoryId: {
    _id: string;
    name: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PostsPagination {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  limit: number;
}

export interface PostsResponse {
  posts: PostListItem[];
  pagination: PostsPagination;
}

// Skapa ett nytt inlägg
export const createPost = async (
  token: string,
  postData: CreatePostData
): Promise<PostResponse> => {
  const formData = new FormData();

  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("categoryId", postData.categoryId);

  if (postData.altText) {
    formData.append("altText", postData.altText);
  }

  if (postData.image) {
    formData.append("image", postData.image);
  }

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte skapa inlägget");
  }

  return data;
};

// Hämta alla inlägg med filtrering, sortering och pagination
export const getPosts = async (
  page = 1,
  limit = 10,
  search?: string,
  category?: string,
  sort?: string,
  author?: string
): Promise<PostsResponse> => {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (search) {
    params.append("search", search);
  }

  if (category) {
    params.append("category", category);
  }

  if (sort) {
    params.append("sort", sort);
  }

  if (author) {
  params.append("author", author);
}

  const response = await fetch(`${API_URL}?${params.toString()}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte hämta inläggen");
  }

  return data;
};

// Hämta ett inlägg med ID, för detaljer och för att bli skickad till inlägget efter skapand
export interface PostDetailsResponse {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  altText: string;
  authorId: {
    _id: string;
    username: string;
  };
  categoryId: {
    _id: string;
    name: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const getPostById = async (
  postId: string
): Promise<PostDetailsResponse> => {
  const response = await fetch(`${API_URL}/${postId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte hämta inlägget");
  }

  return data;
};

// Uppdatera ett inlägg
export interface UpdatePostData {
  title: string;
  content: string;
  categoryId: string;
  altText?: string;
  image?: File;
}

export const updatePost = async (
  token: string,
  postId: string,
  postData: UpdatePostData
) => {
  const formData = new FormData();

  formData.append("title", postData.title);
  formData.append("content", postData.content);
  formData.append("categoryId", postData.categoryId);

  if (postData.altText !== undefined) {
    formData.append("altText", postData.altText);
  }

  if (postData.image) {
    formData.append("image", postData.image);
  }

  const response = await fetch(`${API_URL}/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte uppdatera inlägget");
  }

  return data;
};

// Ta bort ett inlägg
export const deletePost = async (
  token: string,
  postId: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Kunde inte ta bort inlägget");
  }
};