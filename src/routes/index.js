import adminRoutes from './adminRoutes.js';
import bookingRoutes from './bookingRoutes.js';
import paymentRoutes from './paymentRoutes.js';
import roomRoutes from './roomRoutes.js';

const constructorMethod = (app) =>{
    app.use('/adminRoutes', adminRoutes);
    app.use('/bookingRoutes', bookingRoutes);
    app.use('/paymentRoutes', paymentRoutes);
    app.use('/roomRoutes', roomRoutes);
    app.use('*', (req, res) => {
        res.status(404).render(`layouts/error`,{title:"Error",code:404, description: 'Page Not found'});
      });
};
export default constructorMethod;