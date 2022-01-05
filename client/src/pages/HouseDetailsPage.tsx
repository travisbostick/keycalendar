import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import {
  useDeleteHouseMutation,
  useHouseDetailsQuery,
  useUpdateHouseAddressMutation,
  useUpdateHouseNameMutation
} from '../generated/graphql';

interface Props {
  houseId: string;
}

export const HouseDetailsPage: React.FC<Props> = ({ houseId }) => {
  const { data, loading, error } = useHouseDetailsQuery({
    variables: {
      houseId
    },
    onCompleted() {
      if (data) {
        console.log(data.house);
        setName(data.house.house.name);
        setAddress(data.house.house.address || '');
        setCity(data.house.house.city || '');
        setState(data.house.house.state || '');
        setZipcode(data.house.house.zipcode || '');
        setCountry(data.house.house.country || '');
      }
    },
    onError(err) {
      console.log(err);
    }
  });
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [deleteHouse] = useDeleteHouseMutation({
    variables: {
      houseId: houseId
    }
  });
  const [houseDeleted, setHouseDeleted] = useState(false);
  const [houseUpdated, setHouseUpdated] = useState(false);
  const [updateHouseAddress] = useUpdateHouseAddressMutation({
    variables: {
      input: {
        address,
        city,
        state,
        zipcode,
        country
      },
      houseId
    }
  });
  const [updateHouseName] = useUpdateHouseNameMutation({
    variables: {
      name,
      houseId
    }
  });

  if (houseDeleted) {
    return <Redirect to='/user' />;
  }

  if (houseUpdated) {
    return <Redirect to={`/calendar/${houseId}`} />;
  }

  if (error) {
    return <div>error</div>;
  }

  if (loading) {
    return null;
  }

  async function handleUpdateAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await updateHouseAddress();
      if (response) {
        setHouseUpdated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateName(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await updateHouseName();
      if (response) {
        setHouseUpdated(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this house?')) {
      try {
        const response = await deleteHouse();
        if (response) {
          setHouseDeleted(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <Header
        sidebar={true}
        sidebarOptions={[
          { text: 'Create House', link: '/createHouse' },
          { text: 'Edit House', link: `/house-details/${houseId}` },
          { text: 'House Users', link: `/house-users/${houseId}` }
        ]}
      />
      <div className='container mt-2'>
        <Button onClick={() => setHouseUpdated(true)}>Back to Calendar</Button>
        <div className='row mt-2'>
          <div className='col-sm'>
            <form onSubmit={handleUpdateAddress}>
              <h4>House Address:</h4>
              <div>
                <label>Street</label>
              </div>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label>City</label>
              </div>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div>
                <label>State</label>
              </div>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
              </div>
              <div>
                <label>Zip Code</label>
              </div>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  value={zipcode}
                  onChange={e => setZipcode(e.target.value)}
                />
              </div>
              <div>
                <label>Country</label>
              </div>
              <div>
                <TextField
                  className='input-login'
                  size='small'
                  margin='dense'
                  type='text'
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </div>
              <Button className='mt-1 mb-4' type='submit'>
                Update Address
              </Button>
            </form>
          </div>
          <div className='col-sm'>
            <form onSubmit={handleUpdateName}>
              <h4>House Name:</h4>
              <div>
                <label>Name</label>
              </div>
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
              <Button className='mt-1 mb-4' type='submit'>
                Update Name
              </Button>
            </form>
          </div>
          <div className='col-sm'></div>
        </div>
        <div>
          <Button color='error' onClick={handleDelete}>
            Delete House
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HouseDetailsPage;
