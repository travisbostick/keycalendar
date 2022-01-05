import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import {
  useHouseDetailsQuery,
  useInviteUserMutation
} from '../generated/graphql';

interface Props {
  houseId: string;
}

export const HouseUsersPage: React.FC<Props> = ({ houseId }) => {
  const history = useHistory();
  const { data, loading, error } = useHouseDetailsQuery({
    variables: {
      houseId
    }
  });
  const [inviteUser] = useInviteUserMutation();
  const [email, setEmail] = useState('');
  const [userInvited, setUserInvited] = useState(false);

  async function handleInviteUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email !== '') {
      try {
        const response = await inviteUser({
          variables: {
            email,
            houseId
          }
        });
        if (response) {
          console.log(response);
          setEmail('');
          setUserInvited(true);
        }
      } catch (err) {
        console.log(err);
      }
      console.log(email);
    }
  }

  const header = (
    <Header
      sidebar={true}
      sidebarOptions={[
        { text: 'Create House', link: '/createHouse' },
        { text: 'Edit House', link: `/house-details/${houseId}` },
        { text: 'House Users', link: `/house-users/${houseId}` }
      ]}
    />
  );

  if (loading) {
    return header;
  }

  return (
    <div>
      {header}
      <div className='container mt-2'>
        <Button onClick={() => history.push(`/calendar/${houseId}`)}>
          Back to Calendar
        </Button>
        <h3>Users:</h3>
        {data &&
          data.house.users.map((user, i) => <div key={i}>{user.name}</div>)}
        <form className='mt-3' onSubmit={handleInviteUser}>
          <h5 className='mb-3'>Invite Users:</h5>
          <div>
            <TextField
              className='input-login'
              size='small'
              type='email'
              placeholder="New user's email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <Button className='mt-2' type='submit'>
            Invite User
          </Button>
          {userInvited && <div>User has been invited!</div>}
        </form>
      </div>
    </div>
  );
};
