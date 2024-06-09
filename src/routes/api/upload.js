const router = require('express').Router();

const imagesController = require('../../controllers/upload.controller');
 const groupImageController = require('../../controllers/uploadGroupImage');

router.post('/userimage', imagesController.upload, imagesController.uploadImage);

router.get('/userimage/:id_user', imagesController.getImage);

router.post('/groupimage', groupImageController.upload, groupImageController.uploadImage);

router.get('/groupimage/:id_group', groupImageController.getGroupImage);


module.exports = router;
