import React from 'react';
import Head from 'next/head';
import Button from '@material-ui/core/Button';
import withLayout from '../lib/withLayout';

const Index = () => (
  <div style={{ padding: '10px 16px' }}>
    <Head>
      <title>Rockwell Guestbook</title>
      <meta name="description" content="Log In, Register, or Sign the Guest Book" />
    </Head>
    <p> Index Page </p>
    <Button variant="raised"> A Material UI Button!</Button>
  </div>
);

export default withLayout(Index);
