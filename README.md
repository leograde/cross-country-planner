# Cross Country Planner

The application lets you create waypoints by clicking on the map in order to create a route. You can rearrange the waypoints by dragging and dropping or you can also delete any waypoint you no longer need.

After you are satisfied with the route that was planned, you can download it in the `.gpx` format by clicking `Download your Route`.

You can check the application live on https://quizzical-bartik-c9242f.netlify.app/.

### How to run the application

- `yarn start` - runs the applications in development mode with Hot Module Replacement (HMR).
- `yarn build` - will build the bundle so it can be deployed.

### Learnings

- I hadn't worked so much with maps before and when I did I used Google Maps mostly to create simple routes and predict how much time the route would take. Therefore, I learned a lot about the different tile servers you can use and also how the [Leaflet](https://leafletjs.com/) library works with markers, custom icons and polylines.

- Not using a library such as [react-leaflet](https://react-leaflet.js.org/) was quite interesting, because you need to use certain React features such as refs to have access to the `div` where the map is mounted. Therefore, you have to manage the integration of a more imperative JS library into the functional React world.
