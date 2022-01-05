import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { useUser } from '../contexts';

interface Props {
  token: string;
}

export const InvitePage: React.FC<Props> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:4000/invite/${user.id}/${token}`, {
        method: 'POST'
      })
        .then(async x => {
          const res = await x.json();
          console.log(res);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    return <div>Please log in or sign up first</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }
  return <Redirect to='/login' />;
};

export default InvitePage;
