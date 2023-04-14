const express = require("express");
const {
  getAllEvent,
  createEvent,
  sendRequestToJoin,
  organiserCheckRequest,
} = require("../controller/event");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const EventRouter = express.Router();

EventRouter.get("/", getAllEvent);
EventRouter.post("/create", AuthMiddleware, createEvent);
EventRouter.post("/request/:id", AuthMiddleware, sendRequestToJoin);
EventRouter.post(
  "/request/:eventId/:playerId",
  AuthMiddleware,
  organiserCheckRequest
);

module.exports = EventRouter;
