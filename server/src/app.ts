require('dotenv').config();
require('@babel/register')({ extensions: ['.js', '.ts'] });

import express, { Application } from 'express';
import { AddressInfo } from 'net';
import graphqlHTTP, { Options } from 'express-graphql';
import cors from 'cors';
import schema from 'db/schemas/schema';

const PORT = process.env.PORT || 4200;

const app: Application = express();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  } as Options)
);

const server = app
  .listen(PORT, () => {
    console.log('Listening on port: ', PORT);
    const { port, address } = server?.address() as AddressInfo;
    console.log('Server running at http://' + address + ':' + port);
    console.log('Server running...');
  })
  .on('error', (e) => {
    console.log('Error happened: ', e.message);
  });
