const Ajv = require('ajv');

const ajv = new Ajv();

exports.validate = (schema, data = null) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors;
  }
};
