import express = require('express');

export function handler(
  data: any,
  req: express.Request,
  res: express.Response
) {
  switch (typeof data) {
    case 'string':
      switch (req.query.format) {
        case 'raw':
          // Requesting plain string, whaterver it is
          res.end(data);
          break;
        default:
        case 'json':
          // Requesting as json, the string,
          // checking if callback has been called
          const resObj = data;
          if (req.query.callback === undefined) {
            res.end(JSON.stringify(resObj));
          } else {
            res.end(req.query.callback + '(' + JSON.stringify(resObj) + ');');
          }
          break;
      }

      break;
    default:
      if (req.query.callback === undefined) {
        if (req.query.format === 'raw' && data.data !== undefined) {
          res.end(data.data);
        } else {
          res.end(JSON.stringify(data));
        }
      } else {
        res.end(req.query.callback + '(' + JSON.stringify(data) + ');');
      }
      break;
  }
  // deleteFolderRecursive('tmp/');
}
