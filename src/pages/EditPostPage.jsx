/* eslint-disable react-hooks/exhaustive-deps */
import {
    Button,
    Container,
    TextField,
  } from '@mui/material';
  import React, { useEffect } from 'react';
  import { useState } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import { postContext } from '../contexts/PostContext';
  
  const EditPostPage = () => {
    const data = React.useContext(postContext);
    const { getPostToEdit, postToEdit, saveEditedPost } = data;
  
    const params = useParams();
    const navigate = useNavigate();
  
    const [editedPost, setEditedPost] = useState(postToEdit);
  
    const handleSubmit = event => {
      event.preventDefault();
      for (let key in editedPost) {
        let value = editedPost[key];
        if (typeof value === 'string') {
          if (!value.trim()) {
            alert('Заполните поля!');
            return;
          }
        }
      }
      saveEditedPost(editedPost);
      navigate('/');
    };
  
    useEffect(() => {
      getPostToEdit(params.id);
    }, []);
  
    useEffect(() => {
      setEditedPost(postToEdit);
    }, [postToEdit]);
  
    if (!editedPost) {
      return <h2>Loading...</h2>;
    }
  
    return (
      <Container>
        <div className="add-edit-page">
          <h2>Редактировать товар</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={e =>
                setEditedPost({ ...editedPost, title: e.target.value })
              }
              value={editedPost.title}
              label="Введите название"
              variant="standard"
            />
            <TextField
              onChange={e =>
                setEditedPost({ ...editedPost, body: e.target.value })
              }
              value={editedPost.body}
              label="Введите описание"
              variant="standard"
            />
  
            <Button type="submit" variant="outlined">
              Сохранить изменения
            </Button>
          </form>
        </div>
      </Container>
    );
  };
  
  export default EditPostPage;
  