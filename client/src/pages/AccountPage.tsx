import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { useUser } from '../contexts';
import { useUpdateUserMutation } from '../generated/graphql';

export default function AccountPage() {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user ? user.name || '' : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [userUpdated, setUserUpdated] = useState(false);
  const [updateUser] = useUpdateUserMutation({
    variables: {
      input: {
        name,
        email
      }
    }
  });

  if (!user) {
    return <Redirect to='/login' />;
  }

  if (userUpdated) {
    return <Redirect to='/user' />;
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await updateUser();
      console.log(response);
      if (response && response.data) {
        setUser(response.data.updateUser);
        setUserUpdated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {}

  return (
    <div>
      <Header
        sidebar={true}
        sidebarOptions={[{ text: 'Create House', link: '/createHouse' }]}
      />
      <div className='container mt-2'>
        <Button onClick={() => setUserUpdated(true)}>Back to Calendar</Button>
        <div>
          <form onSubmit={handleUpdate}>
            <div>
              <label>Name</label>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label>Email Address</label>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button className='mt-2' type='submit'>
              Update Account
            </Button>
          </form>
          <Button color='error' className='mt-3' onClick={handleDelete}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
}
