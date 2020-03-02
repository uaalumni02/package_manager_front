
const settings = {
  development: {
    api_key: "local",
    apiBaseUrl: "http://localhost:3000"
  },
  production: {
    api_key: "prodkey",
    apiBaseUrl: "https://tz-package-manager.herokuapp.com"
  }
};

const env = process.env.NODE_ENV || 'local';

export default settings[env]






