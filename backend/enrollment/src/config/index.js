const dotEnv = require("dotenv");
<<<<<<< HEAD

=======
dotEnv.config();
>>>>>>> e0ea9a542f53af21b54bc36f6918ec78c7019b26
if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}
<<<<<<< HEAD
module.exports = {
  ENROLLMENT_SERVICE_PORT: process.env.PORT,
=======

module.exports = {
  PORT: process.env.PORT,
>>>>>>> e0ea9a542f53af21b54bc36f6918ec78c7019b26
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
<<<<<<< HEAD
  DB_PORT: process.env.DB_PORT,
=======
>>>>>>> e0ea9a542f53af21b54bc36f6918ec78c7019b26
  APP_SECRET: process.env.APP_SECRET,
};
