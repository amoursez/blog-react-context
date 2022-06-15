import {
    Button,
    Container,
    TextField,
  } from '@mui/material';
  import React from 'react';
  import { useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { postContext } from '../contexts/PostContext';
  
  const AddpostPage = () => {
    const data = React.useContext(postContext);
    const { addPost } = data;
    const navigate = useNavigate();
  
    const [newPost, setNewPost] = useState({
      title: '',
      body: '',
    });
  
    const handleSubmit = event => {
      event.preventDefault();
      for (let key in newPost) {
        let value = newPost[key];
        if (typeof value === 'string') {
          if (!value.trim()) {
            alert('Заполните поля!');
            return;
          }
        }
      }
  
      addPost(newPost);
      setNewPost({
        title: '',
        body: '',
      });
  
      navigate('/');
    };
  
    return (
      <Container>
        <div className="add-edit-page">
          <h2>Добавить пост</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              value={newPost.title}
              label="Введите название"
              variant="standard"
            />
            <TextField
              onChange={e => setNewPost({ ...newPost, body: e.target.value })}
              value={newPost.body}
              label="Введите описание"
              variant="standard"
            />
  
            <Button type="submit" variant="outlined">
              Добавить
            </Button>
          </form>
        </div>
      </Container>
    );
  };
  
  export default AddpostPage;
  