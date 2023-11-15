const router = require('express').Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/create', categoriesController.getCreatePage);
router.post('/create', categoriesController.createCategory);
router.get('/update', categoriesController.getUpdatePage);
router.put('/update', categoriesController.updateCategory);
router.get('/delete', categoriesController.getDeletePage);
router.delete('/delete/:id', categoriesController.deleteCategory);

module.exports = router;