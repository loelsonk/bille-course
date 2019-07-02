import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export default class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args) {
      const result = await resolve.apply(this, args);

      if (typeof result === 'string') {
        return result.toUpperCase();
      }

      return result;
    }
  }
}
