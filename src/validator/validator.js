const Ajv = require('ajv');

ajv = new Ajv();

exports.validate = (schema, data = null) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors;
  }else{
    const { properties } =  schema;
    for(let key in properties){
      if(properties[key].validate){
         const fn = properties[key].validate;
         if(!fn(data,key)){
          return true;
         } 
      }
    }
  }
};
