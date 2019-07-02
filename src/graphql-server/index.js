import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';
import UppercaseDirective from './directives/Uppercase';
import AuthDirective from './directives/Auth';
import { users } from '../mock';

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return {
      user: { ...users[0] },
    }
  },
  schemaDirectives: {
    upper: UppercaseDirective,
    auth: AuthDirective,
  }
});
