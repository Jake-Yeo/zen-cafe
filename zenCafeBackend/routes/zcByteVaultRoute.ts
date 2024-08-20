const express = require("express");
const zcByteVaultRouter = express.Router();
const controller = require('../controllers/zcByteVaultController.ts');

// create a chatroom
zcByteVaultRouter.get('/fetchRadioJson', controller.fetchRadioJson);

export default zcByteVaultRouter;