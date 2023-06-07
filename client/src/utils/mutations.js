import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;
export const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_ENTRY = gql`
  mutation SaveEntry($thoughtData: JournalInput) {
    saveEntry(thoughtData: $thoughtData) {
        _id
        username
        entryCount
        savedEntries {
          entryId
          title
          thoughts
        }
      }
    }
  
`;

export const REMOVE_ENTRY = gql`
mutation RemoveEntry($entryId: ID) {
    removeEntry(entryId: $entryId) {
      _id
      username
    }
  }
`;