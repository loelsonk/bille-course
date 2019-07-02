import { GraphQLScalarType } from 'graphql';
import isEmail from 'isemail';

function validate(value) {
  const isValid = isEmail.validate(value);

  if (!isValid) {
    throw new TypeError(`[${this.name}] given value is not valid email address`);
  }

  return value;
};

export default new GraphQLScalarType({
  name: 'EmailAddress',
  description: 'EmailAddress Scalar Type desc.',
  serialize: validate,
  parseValue: validate,
  parseLiteral({ value }) {
    return validate.call(this, value);
  }
});
