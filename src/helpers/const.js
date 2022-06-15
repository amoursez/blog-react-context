export const API = 'https://bloggy-api.herokuapp.com/posts';

export const getCommentsAPI = id =>
  `https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`;
