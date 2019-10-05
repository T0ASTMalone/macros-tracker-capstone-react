try{
  require('dotenv').config();
}
catch(e){
  console.log(e)
}

export default {
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
  API_KEY: process.env.REACT_APP_API_KEY
};

