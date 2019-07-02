import {
  SchemaDirectiveVisitor,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

const isAuthorized = (user, roles, data) => {
  if (!user) {
    throw new AuthenticationError('User not authenticated');
  }

  if (user.status === 'Banned') {
    throw new ForbiddenError('User not authorized');
  }

  if (user.isAdmin) {
    return true;
  }

  if (!roles || !roles.length) {
    return true;
  }

  if (user.isPremium && roles.includes('PREMIUM')) {
    return true;
  }

  const isOwner = data && data.authorId === user.id;

  if (isOwner && roles.includes('OWNER')) {
    return true;
  }

  throw new ForbiddenError('User not authorized');
};

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    const { roles } = this.args;

    field.resolve = async function(...args) {
      const [data,,ctx] = args;

      // Check if user is authenticated / authorized
      isAuthorized(ctx.user, roles, data);

      return resolve.apply(this, args);
    }
  }
}
