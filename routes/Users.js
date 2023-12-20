 const express = require(`express`);
 const { fetchUsersById,updateUser } = require("../controller/User");

 const router = express.Router();
router.get(`/own`,fetchUsersById)
      .patch(`/:id`,updateUser)
exports.router =router;