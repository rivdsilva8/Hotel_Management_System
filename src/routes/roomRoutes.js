import {Router} from 'express';
const router = Router();

router.route('/').get(async (req, res) => {
    res.render('room/addRoom', {title:"Add Room"});
  });

export default router;