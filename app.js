import express from 'express';
const app = express();
import configRoutes from './src/routes/index.js';
import {fileURLToPath} from 'url';
import path, {dirname} from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + '/public');
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    if (req.body && req.body._method) {
      req.method = req.body._method;
      delete req.body._method;
    }
    next();
  };
  
  app.use('/public', staticDir);
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use(rewriteUnsupportedBrowserMethods);
  
  app.engine('handlebars', exphbs.engine({defaultLayout: 'main',
layoutsDir:path.join(__dirname,'src/views/layouts')}));
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname,'src/views/layouts'));
  
  configRoutes(app);
  
  app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
  });