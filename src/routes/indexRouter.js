const router = require('express').Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.home);
router.get('/about-us', indexController.aboutUs);
router.get('/contact', indexController.contact);
router.post('/contact', indexController.contact);

module.exports = router;