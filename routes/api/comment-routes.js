const router = require('express').Router();
const { addComment, removeComment, addRepy, removeReply } = require('../../controllers/comment-controller');


router.route('/:pizzaId').post(addComment);

router.route('/:pizzaId/:commentId')
.put(addRepy)
.delete(removeComment);

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

 
module.exports = router;