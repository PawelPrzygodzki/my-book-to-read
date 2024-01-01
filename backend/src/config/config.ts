// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as process from 'process';

require('dotenv').config({ path: `${__dirname}/../../.env` });

export default {
  db: {
    url: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
