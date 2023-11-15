const router = require('express').Router();
const productsController = require('../controllers/productsController');
const uploadFile = require('../middlewares/uploadImage');

router.get('/', productsController.listProducts);
router.get('/detail/:id', productsController.getDetailPage);
router.get('/create', productsController.getCreatePage);
router.post('/create', uploadFile.single('image'), productsController.createProduct);
router.get('/update/:id', productsController.getUpdatePage);
router.put('/update/:id', uploadFile.single('image'), productsController.updateProduct);
router.delete('/delete/:id', productsController.deleteProduct);

module.exports = router;