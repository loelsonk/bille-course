import express from 'express';
import { gql, ApolloServer } from 'apollo-server-express';
import { users, comments, posts } from './mock';
import moment from "moment";
import faker from "faker";

const port = 8888;
const app = express();

const typeDefs = gql`
    type Query {
        users: [User!]
        posts: [Post!]
        comments: [Comment!]
    }
    
    type Mutation {
        createUser(input: CreateUserInput): User!
    }
    
    input CreateUserInput {
        firstName: String!
        lastName: String!
        email: String!
    }
    
    type User {
        id: ID!
        username: String!
        email: String!
        posts: [Post!]
        comments: [Comment!]
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

const formatDateResolver = (parent) => moment(parent.date).format();

const resolvers = {
    Query: {
        users: () => users,
        posts: () => posts,
        comments: () => comments,
    },
    Mutation: {
      createUser: (_, args) => {
          const { input } = args;

          users.push({ ...input, id: faker.random.uuid() });
          return users[users.length - 1];
      }
    },
    Post: {
        date: formatDateResolver,
        author: (parent) => users.find(user => user.id === parent.authorId),
        comments: (parent) => comments.filter(comment => comment.postId === parent.id)
    },
    User: {
        username: (parent) => {
            return `${parent.firstName} ${parent.lastName}`;
        },
        posts: (parent) => {
            return posts.filter(post => post.authorId === parent.id)
        },
        comments: (parent) => {
            return comments.filter(comment => comment.authorId === parent.id)
        }
    },
    Comment: {
        post: (parent) => posts.find(post => post.id === parent.postId),
        author: (parent) => users.find(user => user.id === parent.authorId),
        date: formatDateResolver,
    }
}

const server = new ApolloServer({
   typeDefs,
   resolvers,
});

server.applyMiddleware({ app, path: '/graphql' })

app.get('/test', (req, res) => {
    res.json({ hello: 'warsztaty' });
});

app.get('/graphql-voyager', (req, res) => {
   res.sendFile(`${__dirname}/graphql-voyager/index.html`);
});

app.listen({ port }, () => {
    console.log(`Listening on port: ${port}`);
});
