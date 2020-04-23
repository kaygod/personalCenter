const Ajv = require('ajv');
const { Fail } = require('../models/Response');

ajv = new Ajv();

exports.validate = (schema, data = null, ctx) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors;
  } else {
    const { properties, required } = schema;
    for (let key of required) {
      if (properties[key].validate) {
        const fn = properties[key].validate;
        const result = fn(data, key, ctx);
        if (!result) {
          return true;
        } else if (result instanceof Fail) {
          return result;
        }
      }
    }
  }
};
