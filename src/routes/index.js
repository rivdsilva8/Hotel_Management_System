import adminRoutes from './adminRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import roomRoutes from './roomRoutes.js';

const constructorMethod = (app) =>{
    app.use('/', adminRoutes);
    app.use('/', bookingRoutes);
    app.use('/', paymentRoutes);
    app.use('/', roomRoutes);
    app.use('*', (req, res) => {
        res.status(404).render(`error`,{title:"Error",code:404, description: 'Page Not found'});
      });
};
export default constructorMethod;