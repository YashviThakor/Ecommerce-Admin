export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data.posts;
};

export const fetchComments = async () => {
  const response = await axios.get(`${API_BASE_URL}/comments`);
  return response.data.comments;
};

export const addComment = async (comment) => {
  const response = await axios.post(`${API_BASE_URL}/comments/add`, comment);
  return response.data;
};