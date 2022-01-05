import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from '../contexts';

export default function LandingPage() {
  const { user } = useUser();

  if (user) {
    return <Redirect to='/user' />;
  }

  return (
    <div>
      <Header
        sidebar={false}
        options={[
          { text: 'login', link: '/login' },
          { text: 'sign up', link: '/register' }
        ]}
      />
    </div>
  );
}
