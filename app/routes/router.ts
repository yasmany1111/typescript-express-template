import { testRouteHandler } from "./test";

const routes = [
  {
    level: 0,
    route: '/api/test',
    handler: (privateContext: any) => {
      testRouteHandler(privateContext);
    }
  }
];

export function mainRouter(context: any) {
  for (const route of routes) {
    if (route.route === context.route) {
      if (route.level !== 0) {
        if (context.userData.level < route.level) {
          context.log('Route forbidden ' + context.userData.level);
          context.handle({
            errorCode: 401,
            data:
              'Access to this route is protected, needed level ' +
              route.level
          });
          return 'forbidden';
        } else {
          // User has access to this route
          route.handler(context);
          return 'passed';
        }
      } else {
        // User has access to this route
        route.handler(context);
        return 'passed';
      }
    }
  }
  return undefined;
}