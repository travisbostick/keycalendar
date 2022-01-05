import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from '../contexts';
import { useSetUserNameMutation } from '../generated/graphql';

export const NamePage: React.FC = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState('');
  const [setUserName] = useSetUserNameMutation();

  if (!user) {
    return <Redirect to='/' />;
  }

  if (user.name) {
    return <Redirect to='/user' />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await setUserName({
        variables: {
          name: name,
          id: user!.id
        }
      });
      if (response && response.data) {
        console.log(response.data);
        setUser(response.data.setUserName);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <Header sidebar={false} />
      <div className='text-center mt-3'>
        <form onSubmit={handleSubmit}>
          <h2>What is your name?</h2>
          <div>
            <TextField
              className='input-login'
              size='small'
              type='text'
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <Button className='btn btn-dark mt-2' type='submit'>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NamePage;
