/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import AdminTable from '../components/AdminTable';
import { postContext } from '../contexts/PostContext';

const AdminPage = () => {
  const data = React.useContext(postContext);
  const { getPosts, posts } = data;

  console.log(posts);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <div>
        <h1>Админ панель</h1>
        <AdminTable posts={posts} />
      </div>
    </Container>
  );
};

export default AdminPage;
