import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { setAccessToken } from '../accessToken';
import { useUser } from '../contexts';

interface Props {
  token: string;
}

export const ConfirmPage: React.FC<Props> = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const { setUser } = useUser();

  useEffect(() => {
    fetch(`http://localhost:4000/confirmation/${token}`, {
      method: 'POST'
    })
      .then(async x => {
        const res = await x.json();
        console.log(res);
        setAccessToken(res.accessToken);
        setUser(res.user);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>loading...</div>;
  } else {
    return <Redirect to='/login' />;
  }
};

export default ConfirmPage;
