/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { postContext } from '../contexts/PostContext';

const PostDetailsPage = () => {
  const data = useContext(postContext);
  const { getPostDetails, postDetails, addСomment } = data;
  const params = useParams();
  const [commentBody, setCommentBody] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(postDetails.id);
    const newComment = {
      body: commentBody.trim(),
      postId: postDetails.id,
    };
    for (let key in newComment) {
      if (!newComment[key]) {
        alert('Заполните поля!');
        return;
      }
    }
    addСomment(newComment);
    setCommentBody('');
  };

  useEffect(() => {
    getPostDetails(params.id);
  }, []);

  if (!postDetails) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <Container>
        <div className="post-details">
          <div>
            <h2>{postDetails.title}</h2>
          </div>
        </div>
        <div className="post-details-comment">
          <h3>Отзывы:</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ marginBottom: 15 }}
              body={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              label="Введите ваш отзыв"
              type="text"
              multiline
              minRows={3}
              maxRows={5}
            />
            <Button type="submit" variant="outlined">
              Оставить отзыв
            </Button>
          </form>
          <div>
            {postDetails.comments?.map((item, index) => (
              <div key={index} className="comment">
                <h5>{item.body}</h5>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PostDetailsPage;
