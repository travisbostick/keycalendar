import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from '../contexts';
import { useRegisterMutation } from '../generated/graphql';

export const RegisterPage: React.FC<RouteComponentProps> = () => {
  const { user } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [register] = useRegisterMutation();
  const [registered, setRegistered] = useState(false);
  const [userExists, setUserExists] = useState(false);

  if (registered) {
    return (
      <div>
        <div>Confirmation email sent!</div>
      </div>
    );
  }

  if (user) {
    return <Redirect to='/user' />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      const response = await register({
        variables: {
          email,
          password
        }
      });
      console.log(response);
      if (response && response.data) {
        if (response.data.register === true) {
          setRegistered(true);
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        if (err.message === 'User already exists') {
          setUserExists(true);
        }
      }
    }
  }

  return (
    <div>
      <Header sidebar={false} options={[{ text: 'login', link: '/login' }]} />
      <div className='text-center mt-3'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div>
            <TextField
              className='input-login'
              size='small'
              margin='dense'
              type='email'
              placeholder='Email'
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
              placeholder='Password'
              required
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              className='input-login'
              size='small'
              margin='dense'
              type='password'
              placeholder='Confirm Password'
              required
              value={confirmPassword}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <Button className='btn btn-dark' type='submit'>
              Sign Up
            </Button>
          </div>
          {userExists && (
            <p>An account already exists with this email address</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
