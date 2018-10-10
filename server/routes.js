// const controller = require('./controller.js');
const router = require('express').Router();
const controller = require('./controller.js')

router.get('/:homeId/images', controller.get); /*controller.get*/
router.post('/:homeId/images', controller.post);
router.patch('/:homeId/images', controller.patch);
router.delete('/:homeId/images', controller.delete);

module.exports = router;