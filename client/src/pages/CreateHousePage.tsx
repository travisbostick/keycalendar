import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { useUser } from '../contexts';
import { useCreateHouseMutation } from '../generated/graphql';

export const CreateHousePage: React.FC = () => {
  const { user } = useUser();
  const [name, setName] = useState('');
  const [createHouse] = useCreateHouseMutation();
  const [houseCreated, setHouseCreated] = useState(false);

  if (!user) {
    return <Redirect to='/' />;
  }

  if (houseCreated) {
    return <Redirect to='/user' />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user) {
      try {
        const houseResponse = await createHouse({
          variables: { input: { name: name } }
        });
        if (houseResponse && houseResponse.data) {
          setHouseCreated(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Header sidebar={false} />
      <div className='container mt-2'>
        <form onSubmit={handleSubmit}>
          <Button onClick={() => setHouseCreated(true)}>
            Back to Calendar
          </Button>
          <h1>Enter House Details</h1>
          <div>
            <TextField
              className='input-login'
              size='small'
              margin='dense'
              type='text'
              placeholder='House Name'
              onChange={e => setName(e.target.value)}
            />
          </div>
          <Button className='btn btn-dark' type='submit'>
            Create House
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateHousePage;
