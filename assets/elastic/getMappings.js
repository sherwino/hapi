var client = require('./connection.js');

client.indices.getMapping({  
    index: 'gov',
    type: 'constituencies',
  },
function (error,response) {  
    if (error){
      console.log(error.message);
    }
    else {
      console.log("Mappings:\n",response.gov.mappings.constituencies.properties);
    }
});