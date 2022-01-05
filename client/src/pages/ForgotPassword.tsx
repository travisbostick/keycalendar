import React, { useState } from 'react';
// import { Redirect } from 'react-router';
import { setAccessToken } from '../accessToken';
import { useUser } from '../contexts';

interface Props {
  token: string;
}

export const ForgotPassword: React.FC<Props> = ({ token }) => {
  const { setUser } = useUser();
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`http://localhost:4000/forgot-password/${token}`, {
      method: 'POST'
    })
      .then(async x => {
        const res = await x.json();
        setAccessToken(res.accessToken);
        setUser(res.user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Password</label>
        <input
          type='text'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
