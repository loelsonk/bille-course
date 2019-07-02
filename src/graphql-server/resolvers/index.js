import moment from 'moment';
import { comments, posts, users } from '../../mock';
import faker from 'faker';
import JSON from 'graphql-type-json';
import EmailAddress from '../scalars/EmailAddress';
import logJson from '../../random.json';

const formatDateResolver = parent => moment(parent.date).format();

export default {
  JSON,
  EmailAddress,
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
    },
  },
  Post: {
    date: formatDateResolver,
    author: parent => users.find(user => user.id === parent.authorId),
    comments: parent =>
      comments.filter(comment => comment.postId === parent.id),
  },
  User: {
    username: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    posts: parent => {
      return posts.filter(post => post.authorId === parent.id);
    },
    comments: parent => {
      return comments.filter(comment => comment.authorId === parent.id);
    },
    log: () => logJson,
  },
  Comment: {
    post: parent => posts.find(post => post.id === parent.postId),
    author: parent => users.find(user => user.id === parent.authorId),
    date: formatDateResolver,
  },
};
