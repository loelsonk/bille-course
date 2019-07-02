import { gql } from 'apollo-server-express';

export default gql`
  scalar JSON
  scalar EmailAddress
  
  directive @upper on FIELD_DEFINITION
  directive @auth(
    roles: [UserRole]
  ) on FIELD_DEFINITION
  
  enum UserRole {
    ADMIN
    OWNER
    PREMIUM
  }
  
  enum UserStatus {
    Active
    "Inactive"
    Banned
  }
  
  type Query {
    users: [User!] @auth(roles: [ADMIN])
    posts: [Post!]
    comments: [Comment!]
  }

  type Mutation {
    createUser(input: CreateUserInput): User!
  }

  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
  }

  type User {
    id: ID!
    username: String! @deprecated(reason: "Use firstName and lastName instead")
    firstName: String! @upper
    lastName: String!
    status: UserStatus!
    isAdmin: Boolean
    isPremium: Boolean
    email: EmailAddress!
    posts: [Post!]
    comments: [Comment!]
    log: JSON
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    content: String!
    date: String!
    comments: [Comment!]
    author: User!
  }

  type Comment {
    id: ID!
    content: String!
    date: String!
    post: Post!
    author: User!
  }
`;
