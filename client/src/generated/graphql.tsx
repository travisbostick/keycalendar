import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateHouseInput = {
  name: Scalars['String'];
};

export type House = {
  __typename?: 'House';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  reservations: Array<Reservation>;
  state?: Maybe<Scalars['String']>;
  users: Array<User>;
  zipcode?: Maybe<Scalars['String']>;
};

export type HouseDetails = {
  __typename?: 'HouseDetails';
  house: House;
  users: Array<User>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: ReturnUser;
};

export type Mutation = {
  __typename?: 'Mutation';
  accessHouse: Scalars['Boolean'];
  addAdminHouse: Scalars['Boolean'];
  addUserHouse: Scalars['Boolean'];
  changePassword?: Maybe<User>;
  createHouse: House;
  createReservation: Scalars['Boolean'];
  deleteHouse: Scalars['Boolean'];
  deleteReservation: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  setUserName: User;
  updateHouseAddress: Scalars['Boolean'];
  updateHouseName: Scalars['Boolean'];
  updateReservation: Scalars['Boolean'];
  updateUser: User;
};


export type MutationAccessHouseArgs = {
  houseId: Scalars['String'];
};


export type MutationAddAdminHouseArgs = {
  houseId: Scalars['String'];
};


export type MutationAddUserHouseArgs = {
  houseId: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateHouseArgs = {
  input: CreateHouseInput;
};


export type MutationCreateReservationArgs = {
  houseId: Scalars['String'];
  input: ReservationInput;
};


export type MutationDeleteHouseArgs = {
  houseId: Scalars['String'];
};


export type MutationDeleteReservationArgs = {
  id: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationInviteUserArgs = {
  email: Scalars['String'];
  houseId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSetUserNameArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateHouseAddressArgs = {
  id: Scalars['String'];
  input: UpdateHouseAddressInput;
};


export type MutationUpdateHouseNameArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateReservationArgs = {
  id: Scalars['String'];
  input: ReservationUpdateInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  house: HouseDetails;
  houses: Array<House>;
};


export type QueryHouseArgs = {
  houseId: Scalars['String'];
};

export type Reservation = {
  __typename?: 'Reservation';
  author: User;
  createdAt: Scalars['DateTime'];
  end: Scalars['String'];
  house: House;
  id: Scalars['ID'];
  start: Scalars['String'];
  title: Scalars['String'];
};

export type ReservationInput = {
  end: Scalars['String'];
  start: Scalars['String'];
  title: Scalars['String'];
};

export type ReservationUpdateInput = {
  end: Scalars['String'];
  start: Scalars['String'];
  title: Scalars['String'];
};

export type ReturnUser = {
  __typename?: 'ReturnUser';
  email: Scalars['String'];
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateHouseAddressInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  state: Scalars['String'];
  zipcode: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  adminHouses: Array<House>;
  confirmed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  houses: Array<House>;
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  reservations: Array<Reservation>;
};

export type AccessHouseMutationVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type AccessHouseMutation = { __typename?: 'Mutation', accessHouse: boolean };

export type AddUserHouseMutationVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type AddUserHouseMutation = { __typename?: 'Mutation', addAdminHouse: boolean };

export type AddAdminHouseMutationVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type AddAdminHouseMutation = { __typename?: 'Mutation', addUserHouse: boolean };

export type CreateHouseMutationVariables = Exact<{
  input: CreateHouseInput;
}>;


export type CreateHouseMutation = { __typename?: 'Mutation', createHouse: { __typename?: 'House', id: string } };

export type CreateReservationMutationVariables = Exact<{
  input: ReservationInput;
  houseId: Scalars['String'];
}>;


export type CreateReservationMutation = { __typename?: 'Mutation', createReservation: boolean };

export type DeleteHouseMutationVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type DeleteHouseMutation = { __typename?: 'Mutation', deleteHouse: boolean };

export type DeleteReservationMutationVariables = Exact<{
  reservationId: Scalars['String'];
}>;


export type DeleteReservationMutation = { __typename?: 'Mutation', deleteReservation: boolean };

export type HouseDetailsQueryVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type HouseDetailsQuery = { __typename?: 'Query', house: { __typename?: 'HouseDetails', house: { __typename?: 'House', id: string, name: string, address?: Maybe<string>, city?: Maybe<string>, state?: Maybe<string>, country?: Maybe<string>, zipcode?: Maybe<string> }, users: Array<{ __typename?: 'User', name: string }> } };

export type HouseReservationsQueryVariables = Exact<{
  houseId: Scalars['String'];
}>;


export type HouseReservationsQuery = { __typename?: 'Query', house: { __typename?: 'HouseDetails', house: { __typename?: 'House', name: string, reservations: Array<{ __typename?: 'Reservation', id: string, title: string, start: string, end: string }> } } };

export type HousesQueryVariables = Exact<{ [key: string]: never; }>;


export type HousesQuery = { __typename?: 'Query', houses: Array<{ __typename?: 'House', id: string, name: string }> };

export type InviteUserMutationVariables = Exact<{
  email: Scalars['String'];
  houseId: Scalars['String'];
}>;


export type InviteUserMutation = { __typename?: 'Mutation', inviteUser: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'ReturnUser', id: string, email: string, name?: Maybe<string> } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type SetUserNameMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['String'];
}>;


export type SetUserNameMutation = { __typename?: 'Mutation', setUserName: { __typename?: 'User', id: string, email: string, name: string } };

export type UpdateHouseAddressMutationVariables = Exact<{
  input: UpdateHouseAddressInput;
  houseId: Scalars['String'];
}>;


export type UpdateHouseAddressMutation = { __typename?: 'Mutation', updateHouseAddress: boolean };

export type UpdateHouseNameMutationVariables = Exact<{
  name: Scalars['String'];
  houseId: Scalars['String'];
}>;


export type UpdateHouseNameMutation = { __typename?: 'Mutation', updateHouseName: boolean };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string } };


export const AccessHouseDocument = gql`
    mutation AccessHouse($houseId: String!) {
  accessHouse(houseId: $houseId)
}
    `;
export type AccessHouseMutationFn = Apollo.MutationFunction<AccessHouseMutation, AccessHouseMutationVariables>;

/**
 * __useAccessHouseMutation__
 *
 * To run a mutation, you first call `useAccessHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAccessHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [accessHouseMutation, { data, loading, error }] = useAccessHouseMutation({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useAccessHouseMutation(baseOptions?: Apollo.MutationHookOptions<AccessHouseMutation, AccessHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AccessHouseMutation, AccessHouseMutationVariables>(AccessHouseDocument, options);
      }
export type AccessHouseMutationHookResult = ReturnType<typeof useAccessHouseMutation>;
export type AccessHouseMutationResult = Apollo.MutationResult<AccessHouseMutation>;
export type AccessHouseMutationOptions = Apollo.BaseMutationOptions<AccessHouseMutation, AccessHouseMutationVariables>;
export const AddUserHouseDocument = gql`
    mutation AddUserHouse($houseId: String!) {
  addAdminHouse(houseId: $houseId)
}
    `;
export type AddUserHouseMutationFn = Apollo.MutationFunction<AddUserHouseMutation, AddUserHouseMutationVariables>;

/**
 * __useAddUserHouseMutation__
 *
 * To run a mutation, you first call `useAddUserHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserHouseMutation, { data, loading, error }] = useAddUserHouseMutation({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useAddUserHouseMutation(baseOptions?: Apollo.MutationHookOptions<AddUserHouseMutation, AddUserHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserHouseMutation, AddUserHouseMutationVariables>(AddUserHouseDocument, options);
      }
export type AddUserHouseMutationHookResult = ReturnType<typeof useAddUserHouseMutation>;
export type AddUserHouseMutationResult = Apollo.MutationResult<AddUserHouseMutation>;
export type AddUserHouseMutationOptions = Apollo.BaseMutationOptions<AddUserHouseMutation, AddUserHouseMutationVariables>;
export const AddAdminHouseDocument = gql`
    mutation AddAdminHouse($houseId: String!) {
  addUserHouse(houseId: $houseId)
}
    `;
export type AddAdminHouseMutationFn = Apollo.MutationFunction<AddAdminHouseMutation, AddAdminHouseMutationVariables>;

/**
 * __useAddAdminHouseMutation__
 *
 * To run a mutation, you first call `useAddAdminHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdminHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdminHouseMutation, { data, loading, error }] = useAddAdminHouseMutation({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useAddAdminHouseMutation(baseOptions?: Apollo.MutationHookOptions<AddAdminHouseMutation, AddAdminHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddAdminHouseMutation, AddAdminHouseMutationVariables>(AddAdminHouseDocument, options);
      }
export type AddAdminHouseMutationHookResult = ReturnType<typeof useAddAdminHouseMutation>;
export type AddAdminHouseMutationResult = Apollo.MutationResult<AddAdminHouseMutation>;
export type AddAdminHouseMutationOptions = Apollo.BaseMutationOptions<AddAdminHouseMutation, AddAdminHouseMutationVariables>;
export const CreateHouseDocument = gql`
    mutation CreateHouse($input: CreateHouseInput!) {
  createHouse(input: $input) {
    id
  }
}
    `;
export type CreateHouseMutationFn = Apollo.MutationFunction<CreateHouseMutation, CreateHouseMutationVariables>;

/**
 * __useCreateHouseMutation__
 *
 * To run a mutation, you first call `useCreateHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHouseMutation, { data, loading, error }] = useCreateHouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateHouseMutation, CreateHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHouseMutation, CreateHouseMutationVariables>(CreateHouseDocument, options);
      }
export type CreateHouseMutationHookResult = ReturnType<typeof useCreateHouseMutation>;
export type CreateHouseMutationResult = Apollo.MutationResult<CreateHouseMutation>;
export type CreateHouseMutationOptions = Apollo.BaseMutationOptions<CreateHouseMutation, CreateHouseMutationVariables>;
export const CreateReservationDocument = gql`
    mutation CreateReservation($input: ReservationInput!, $houseId: String!) {
  createReservation(input: $input, houseId: $houseId)
}
    `;
export type CreateReservationMutationFn = Apollo.MutationFunction<CreateReservationMutation, CreateReservationMutationVariables>;

/**
 * __useCreateReservationMutation__
 *
 * To run a mutation, you first call `useCreateReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReservationMutation, { data, loading, error }] = useCreateReservationMutation({
 *   variables: {
 *      input: // value for 'input'
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useCreateReservationMutation(baseOptions?: Apollo.MutationHookOptions<CreateReservationMutation, CreateReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReservationMutation, CreateReservationMutationVariables>(CreateReservationDocument, options);
      }
export type CreateReservationMutationHookResult = ReturnType<typeof useCreateReservationMutation>;
export type CreateReservationMutationResult = Apollo.MutationResult<CreateReservationMutation>;
export type CreateReservationMutationOptions = Apollo.BaseMutationOptions<CreateReservationMutation, CreateReservationMutationVariables>;
export const DeleteHouseDocument = gql`
    mutation DeleteHouse($houseId: String!) {
  deleteHouse(houseId: $houseId)
}
    `;
export type DeleteHouseMutationFn = Apollo.MutationFunction<DeleteHouseMutation, DeleteHouseMutationVariables>;

/**
 * __useDeleteHouseMutation__
 *
 * To run a mutation, you first call `useDeleteHouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHouseMutation, { data, loading, error }] = useDeleteHouseMutation({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useDeleteHouseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHouseMutation, DeleteHouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHouseMutation, DeleteHouseMutationVariables>(DeleteHouseDocument, options);
      }
export type DeleteHouseMutationHookResult = ReturnType<typeof useDeleteHouseMutation>;
export type DeleteHouseMutationResult = Apollo.MutationResult<DeleteHouseMutation>;
export type DeleteHouseMutationOptions = Apollo.BaseMutationOptions<DeleteHouseMutation, DeleteHouseMutationVariables>;
export const DeleteReservationDocument = gql`
    mutation DeleteReservation($reservationId: String!) {
  deleteReservation(id: $reservationId)
}
    `;
export type DeleteReservationMutationFn = Apollo.MutationFunction<DeleteReservationMutation, DeleteReservationMutationVariables>;

/**
 * __useDeleteReservationMutation__
 *
 * To run a mutation, you first call `useDeleteReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReservationMutation, { data, loading, error }] = useDeleteReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useDeleteReservationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReservationMutation, DeleteReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReservationMutation, DeleteReservationMutationVariables>(DeleteReservationDocument, options);
      }
export type DeleteReservationMutationHookResult = ReturnType<typeof useDeleteReservationMutation>;
export type DeleteReservationMutationResult = Apollo.MutationResult<DeleteReservationMutation>;
export type DeleteReservationMutationOptions = Apollo.BaseMutationOptions<DeleteReservationMutation, DeleteReservationMutationVariables>;
export const HouseDetailsDocument = gql`
    query HouseDetails($houseId: String!) {
  house(houseId: $houseId) {
    house {
      id
      name
      address
      city
      state
      country
      zipcode
    }
    users {
      name
    }
  }
}
    `;

/**
 * __useHouseDetailsQuery__
 *
 * To run a query within a React component, call `useHouseDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHouseDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHouseDetailsQuery({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useHouseDetailsQuery(baseOptions: Apollo.QueryHookOptions<HouseDetailsQuery, HouseDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HouseDetailsQuery, HouseDetailsQueryVariables>(HouseDetailsDocument, options);
      }
export function useHouseDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HouseDetailsQuery, HouseDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HouseDetailsQuery, HouseDetailsQueryVariables>(HouseDetailsDocument, options);
        }
export type HouseDetailsQueryHookResult = ReturnType<typeof useHouseDetailsQuery>;
export type HouseDetailsLazyQueryHookResult = ReturnType<typeof useHouseDetailsLazyQuery>;
export type HouseDetailsQueryResult = Apollo.QueryResult<HouseDetailsQuery, HouseDetailsQueryVariables>;
export const HouseReservationsDocument = gql`
    query HouseReservations($houseId: String!) {
  house(houseId: $houseId) {
    house {
      name
      reservations {
        id
        title
        start
        end
      }
    }
  }
}
    `;

/**
 * __useHouseReservationsQuery__
 *
 * To run a query within a React component, call `useHouseReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHouseReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHouseReservationsQuery({
 *   variables: {
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useHouseReservationsQuery(baseOptions: Apollo.QueryHookOptions<HouseReservationsQuery, HouseReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HouseReservationsQuery, HouseReservationsQueryVariables>(HouseReservationsDocument, options);
      }
export function useHouseReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HouseReservationsQuery, HouseReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HouseReservationsQuery, HouseReservationsQueryVariables>(HouseReservationsDocument, options);
        }
export type HouseReservationsQueryHookResult = ReturnType<typeof useHouseReservationsQuery>;
export type HouseReservationsLazyQueryHookResult = ReturnType<typeof useHouseReservationsLazyQuery>;
export type HouseReservationsQueryResult = Apollo.QueryResult<HouseReservationsQuery, HouseReservationsQueryVariables>;
export const HousesDocument = gql`
    query Houses {
  houses {
    id
    name
  }
}
    `;

/**
 * __useHousesQuery__
 *
 * To run a query within a React component, call `useHousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHousesQuery(baseOptions?: Apollo.QueryHookOptions<HousesQuery, HousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
      }
export function useHousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HousesQuery, HousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HousesQuery, HousesQueryVariables>(HousesDocument, options);
        }
export type HousesQueryHookResult = ReturnType<typeof useHousesQuery>;
export type HousesLazyQueryHookResult = ReturnType<typeof useHousesLazyQuery>;
export type HousesQueryResult = Apollo.QueryResult<HousesQuery, HousesQueryVariables>;
export const InviteUserDocument = gql`
    mutation InviteUser($email: String!, $houseId: String!) {
  inviteUser(email: $email, houseId: $houseId)
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, options);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<InviteUserMutation, InviteUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      name
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(email: $email, password: $password)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SetUserNameDocument = gql`
    mutation SetUserName($name: String!, $id: String!) {
  setUserName(name: $name, id: $id) {
    id
    email
    name
  }
}
    `;
export type SetUserNameMutationFn = Apollo.MutationFunction<SetUserNameMutation, SetUserNameMutationVariables>;

/**
 * __useSetUserNameMutation__
 *
 * To run a mutation, you first call `useSetUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserNameMutation, { data, loading, error }] = useSetUserNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetUserNameMutation(baseOptions?: Apollo.MutationHookOptions<SetUserNameMutation, SetUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserNameMutation, SetUserNameMutationVariables>(SetUserNameDocument, options);
      }
export type SetUserNameMutationHookResult = ReturnType<typeof useSetUserNameMutation>;
export type SetUserNameMutationResult = Apollo.MutationResult<SetUserNameMutation>;
export type SetUserNameMutationOptions = Apollo.BaseMutationOptions<SetUserNameMutation, SetUserNameMutationVariables>;
export const UpdateHouseAddressDocument = gql`
    mutation UpdateHouseAddress($input: UpdateHouseAddressInput!, $houseId: String!) {
  updateHouseAddress(input: $input, id: $houseId)
}
    `;
export type UpdateHouseAddressMutationFn = Apollo.MutationFunction<UpdateHouseAddressMutation, UpdateHouseAddressMutationVariables>;

/**
 * __useUpdateHouseAddressMutation__
 *
 * To run a mutation, you first call `useUpdateHouseAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHouseAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHouseAddressMutation, { data, loading, error }] = useUpdateHouseAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useUpdateHouseAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHouseAddressMutation, UpdateHouseAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHouseAddressMutation, UpdateHouseAddressMutationVariables>(UpdateHouseAddressDocument, options);
      }
export type UpdateHouseAddressMutationHookResult = ReturnType<typeof useUpdateHouseAddressMutation>;
export type UpdateHouseAddressMutationResult = Apollo.MutationResult<UpdateHouseAddressMutation>;
export type UpdateHouseAddressMutationOptions = Apollo.BaseMutationOptions<UpdateHouseAddressMutation, UpdateHouseAddressMutationVariables>;
export const UpdateHouseNameDocument = gql`
    mutation UpdateHouseName($name: String!, $houseId: String!) {
  updateHouseName(name: $name, id: $houseId)
}
    `;
export type UpdateHouseNameMutationFn = Apollo.MutationFunction<UpdateHouseNameMutation, UpdateHouseNameMutationVariables>;

/**
 * __useUpdateHouseNameMutation__
 *
 * To run a mutation, you first call `useUpdateHouseNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHouseNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHouseNameMutation, { data, loading, error }] = useUpdateHouseNameMutation({
 *   variables: {
 *      name: // value for 'name'
 *      houseId: // value for 'houseId'
 *   },
 * });
 */
export function useUpdateHouseNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHouseNameMutation, UpdateHouseNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHouseNameMutation, UpdateHouseNameMutationVariables>(UpdateHouseNameDocument, options);
      }
export type UpdateHouseNameMutationHookResult = ReturnType<typeof useUpdateHouseNameMutation>;
export type UpdateHouseNameMutationResult = Apollo.MutationResult<UpdateHouseNameMutation>;
export type UpdateHouseNameMutationOptions = Apollo.BaseMutationOptions<UpdateHouseNameMutation, UpdateHouseNameMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    name
    email
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;