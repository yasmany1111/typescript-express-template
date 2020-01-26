import fs = require('fs');
import { IContext } from '../core/interfaces';
export function testRouteHandler(context: IContext) {

  context.handle('ss');

  return 'ss';
}
