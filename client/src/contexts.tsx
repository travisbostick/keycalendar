import { createContext, useContext, useEffect, useState } from 'react';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  // ApolloQueryResult,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  Observable
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, setAccessToken } from './accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { useAccessHouseMutation, useHousesQuery } from './generated/graphql';
// import { Exact, HousesQuery, useHousesQuery } from './generated/graphql';

type Props = {
  children: React.ReactNode;
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle: any;
      Promise.resolve(operation)
        .then(operation => {
          const accessToken = getAccessToken();
          if (accessToken) {
            operation.setContext({
              headers: {
                authorization: `bearer ${accessToken}`
              }
            });
          }
        })
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const tokenRefreshLink: any = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken();

    if (!token) {
      return true;
    }

    try {
      const { expiration }: any = jwtDecode(token);
      if (Date.now() >= expiration * 1000) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    });
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : ''
    }
  };
});

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([tokenRefreshLink, authLink, requestLink, httpLink])
});

type ClientContextInterface = {
  client: ApolloClient<NormalizedCacheObject>;
};

const initialClientContext: ClientContextInterface = {
  client: apolloClient
};

export const ClientContext =
  createContext<ClientContextInterface>(initialClientContext);

export const useClient = () => useContext(ClientContext);

export const ClientWrapper = ({ children }: Props) => {
  const [client] = useState(apolloClient);

  return (
    <ClientContext.Provider value={{ client }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ClientContext.Provider>
  );
};

type User = {
  id: string;
  name?: string | null;
  email: string;
};

type UserContextInterface = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const initialUserContext: UserContextInterface = {
  user: null,
  setUser: (): void => {
    throw new Error('setUser function must be overriden');
  }
};

export const UserContext =
  createContext<UserContextInterface>(initialUserContext);

export const useUser = () => useContext(UserContext);

export const UserWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(getAccessToken());
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async x => {
      const res = await x.json();
      setAccessToken(res.accessToken);
      setUser(res.user);
      setLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {loading ? null : children}
    </UserContext.Provider>
  );
};

type House = {
  id: string;
  name: string;
};

type HouseContextInterface = {
  houses: House[] | null;
  setHouses: React.Dispatch<React.SetStateAction<House[] | null>>;
  house: House | null;
  setHouse: React.Dispatch<React.SetStateAction<House | null>>;
};

const initialHouseContext: HouseContextInterface = {
  houses: null,
  setHouses: (): void => {
    throw new Error('setHouses function must be overriden');
  },
  house: null,
  setHouse: (): void => {
    throw new Error('setHouse function must be overriden');
  }
};

export const HouseContext =
  createContext<HouseContextInterface>(initialHouseContext);

export const useHouse = () => useContext(HouseContext);

export const HousesWrapper = ({ children }: Props) => {
  const [houses, setHouses] = useState<House[] | null>(null);
  const [house, setHouse] = useState<House | null>(null);
  const { data } = useHousesQuery();
  const [accessHouse] = useAccessHouseMutation();
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
    }
  }, []);

  return (
    <HouseContext.Provider value={{ houses, setHouses, house, setHouse }}>
      {children}
    </HouseContext.Provider>
  );
};

// type House = {
//   __typename?: 'House' | undefined;
//   id: string;
//   name: string;
// };

// type HousesContextInterface = {
//   houses: House[] | undefined;
//   client?: ApolloClient<any> | undefined;
//   refetch: (
//     variables?:
//       | Partial<
//           Exact<{
//             [key: string]: never;
//           }>
//         >
//       | undefined
//   ) => Promise<ApolloQueryResult<HousesQuery>>;
//   setHouses: React.Dispatch<React.SetStateAction<House[] | undefined>>;
// };

// const initialHousesContext: HousesContextInterface = {
//   houses: undefined,
//   setHouses: (): void => {
//     throw new Error('setUser function must be overriden');
//   },
//   refetch: (): Promise<ApolloQueryResult<HousesQuery>> => {
//     throw new Error('override refetch');
//   }
// };

// export const HousesContext =
//   createContext<HousesContextInterface>(initialHousesContext);

// export const useHouses = () => useContext(HousesContext);

// export const HousesWrapper = ({ children }: Props) => {
//   const [houses, setHouses] = useState<House[] | undefined>([]);
//   const { data, loading, client, refetch } = useHousesQuery({
//     onCompleted() {
//       console.log('getting houses');
//       data && setHouses(data.houses);
//     }
//   });
//   const { user } = useUser();

//   if (user && loading) {
//     return null;
//   }

//   if (data && data.houses && houses) {
//     return (
//       <HousesContext.Provider value={{ houses, setHouses, client, refetch }}>
//         {children}
//       </HousesContext.Provider>
//     );
//   }

//   return (
//     <HousesContext.Provider value={{ houses, setHouses, reetch }}>
//       {children}
//     </HousesContext.Provider>
//   );
// };
