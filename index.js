//gcloud functions deploy helloHttp --runtime nodejs12 --trigger-http --allow-unauthenticated

const escapeHtml = require('escape-html');

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloEnv = (req, res) => {
    res.send(
        `<h3>Hello ${escapeHtml(req.query.name || req.body.name || 'World')}!<h3>`
        + `<h1>Env Variable: ${escapeHtml(process.env.ENV_KEY)}</h1>`
    );
}

/**
 * Responds to a GET request with "Hello World!". Forbids a PUT request.
 *
 * @example
 * gcloud functions call helloHttp
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloHttp = (req, res) => {
    switch (req.method) {
      case 'GET':
        res.status(200).send('Hello Http World!');
        break;
      case 'PUT':
        res.status(403).send('Forbidden!');
        break;
      default:
        res.status(405).send({error: 'Something blew up!'});
        break;
    }
  };

/**
 * Responds to an HTTP request using data from the request body parsed according
 * to the "content-type" header.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloContent = (req, res) => {
    let name;
  
    switch (req.get('content-type')) {
      // '{"name":"John"}'
      case 'application/json':
        ({name} = req.body);
        break;
  
      // 'John', stored in a Buffer
      case 'application/octet-stream':
        name = req.body.toString(); // Convert buffer to a string
        break;
  
      // 'John'
      case 'text/plain':
        name = req.body;
        break;
  
      // 'name=John' in the body of a POST request (not the URL)
      case 'application/x-www-form-urlencoded':
        ({name} = req.body);
        break;
    }
  
    res.status(200).send(`Hello ${escapeHtml(name || 'World')}!`);
  };

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.helloGet = (req, res) => {
    result.status(200).send('Hello GET World!');
  };