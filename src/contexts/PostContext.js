import axios from 'axios';
import React, {useReducer} from 'react';

import { API, getCommentsAPI } from '../helpers/const';

export const postContext = React.createContext();

const initState = {
  posts: [],
  post: null,
  postDetails: null,
  comments: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      return { ...state, posts: action.payload };
    case 'GET_POST_DETAILS':
      return { ...state, postDetails: action.payload };
    case 'GET_POST_TO_EDIT':
      return { ...state, postToEdit: action.payload };
    case 'GET_COMMENTS':
      return { ...state, comments: action.payload };

    default:
      return state;
  }
};

const PostContext = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  const getPosts = async () => {
    const response = await axios(`${API}${window.location.search}`);
    const action = {
      type: 'GET_POSTS',
      payload: response.data,
    };
    dispatch(action);
  };
  const addPost = async newPost => {
    await axios.post(API, newPost);
  };
  const getPostToEdit = async id => {
    const response = await axios(`${API}/${id}`);
    const action = {
      type: 'GET_POST_TO_EDIT',
      payload: response.data,
    };
    dispatch(action);
  };

  const saveEditedPost = async editedpost => {
    await axios.patch(`${API}/${editedpost.id}`, editedpost);
    getPosts();
  };

  const deletepost = async id => {
    await axios.delete(`${API}/${id}`);
    getPosts();
  };

  const getPostDetails = async id => {
    console.log(getCommentsAPI(id));
    const response = await axios(getCommentsAPI(id));
    const action = {
      type: 'GET_POST_DETAILS',
      payload: response.data,
    };
    dispatch(action);
  };

  const addСomment = async newcomment => {
    try {
      await axios.post(
        `https://bloggy-api.herokuapp.com/comments
      `,
        newcomment
      );
      getPostDetails(newcomment.postId);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <postContext.Provider
      value={{
        getPosts: getPosts,
        getPostDetails,
        addСomment: addСomment,
        getPostToEdit: getPostToEdit,
        saveEditedPost: saveEditedPost,
        deletepost: deletepost,
        addPost: addPost,
        posts: state.posts,
        postDetails: state.postDetails,
        postToEdit: state.postToEdit,
      }}
    >
      {props.children}
    </postContext.Provider>
  );
};

export default PostContext;
