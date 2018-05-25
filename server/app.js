import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv';
import path from 'path';

import routes from './routes';

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, token');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

const env = process.env.NODE_ENV || 'development';
if (env === 'production') {
  // for serving static react client app on heroku
  app.use('/', express.static(path.resolve(__dirname, '../../client/dist')));
} else {
  // for serving static react client app on server localhost:port
  app.use('/', express.static(path.resolve(__dirname, '../client/dist')));
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(app);

app.use(express.static('build'));

app.listen(port);
console.log(`server has started on port: ${port}`);


export default app;
