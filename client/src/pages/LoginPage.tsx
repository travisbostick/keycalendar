import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useUser } from '../contexts';
import { useLoginMutation } from '../generated/graphql';
import { Button, TextField } from '@mui/material';
import Header from '../components/Header';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  const { user, setUser } = useUser();
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  if (user) {
    return <Redirect to='/user' />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await login({
        variables: {
          email,
          password
        }
      });
      if (response && response.data) {
        setAccessToken(response.data.login.accessToken);
        setUser(response.data.login.user);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'could not find user') {
          setIncorrectLogin(true);
        }
        console.log(err.message);
      }
    }
  }

  return (
    <div>
      <Header
        sidebar={false}
        options={[{ text: 'sign up', link: '/register' }]}
      />
      <div className='text-center mt-3'>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              className='input-login'
              size='small'
              margin='dense'
              type='email'
              placeholder='Email'
              key='email2'
              required
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              className='input-login'
              size='small'
              margin='dense'
              type='password'
              key='password2'
              placeholder='Password'
              required
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <Button type='submit'>Log In</Button>
          </div>
          <div>
            <Button>Forgot Password</Button>
          </div>
        </form>
        {incorrectLogin && <p>Incorrect login</p>}
      </div>
    </div>
  );
};

export default LoginPage;
