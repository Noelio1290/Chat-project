const router = require("express").Router();
const { addMessage, getAllMessages } = require(".././controllers/messageControllers.js");

router.post("/addmsg", addMessage);
router.post("/getmsg", getAllMessages);

module.exports = router;
