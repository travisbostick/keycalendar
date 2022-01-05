import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useUser } from '../contexts';
import { useHousesQuery } from '../generated/graphql';

export default function UserPage() {
  const { user } = useUser();
  const { data, loading, refetch } = useHousesQuery();

  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.key]); // eslint-disable-line

  if (loading) {
    return null;
  }

  if (!user) {
    return <Redirect to='/login' />;
  }

  if (!user.name) {
    return <Redirect to='/name' />;
  }

  if (data && data.houses.length === 1) {
    return <Redirect to={`/calendar/${data.houses[0].id}`} />;
  }

  return (
    <div>
      <Header
        sidebar={true}
        sidebarOptions={[{ text: 'Create House', link: '/createHouse' }]}
      />
      <div className='text-center'>
        <h1>{user.name && user.name}</h1>
        {data &&
          data.houses.map((house, i) => {
            return (
              <div key={i}>
                <Link to={`calendar/${house.id}`}>{house.name}</Link>
              </div>
            );
          })}
        {/* <div>
          <Link to='/createHouse'>Create House</Link>
        </div>
        <div>
          <Link to='/my-account'>My Account</Link>
        </div> */}
      </div>
    </div>
  );
}
