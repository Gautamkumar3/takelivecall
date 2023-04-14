const EventModal = require("../modal/sportsEvent");

const createEvent = async (req, res) => {
  const user_id = req.userId;
  try {
    const eventData = new EventModal({ ...req.body, organizer: user_id });
    await eventData.save();
    return res.status(200).send({
      status: "success",
      messsage: "Event created successfully",
      data: eventData,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const allEvent = await EventModal.find();
    return res.status(200).send({
      status: "success",
      messsage: "All events get successfully",
      data: allEvent,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};

const sendRequestToJoin = async (req, res) => {
  const eventId = req.params.id;
  const userId = req.userId;
  try {
    const event = await EventModal.findById(eventId);

    if (event.players.length >= event.max_players) {
      return res
        .status(400)
        .send({ status: "error", message: "Event is full" });
    }

    const alreadyJoined = event.players.find((player) => {
      return player.user.toString() === userId;
    });

    if (alreadyJoined) {
      return res.status(400).send({
        status: "error",
        message: "User has already joined the event",
      });
    }

    event.players.push({ user: userId, status: "requested" });
    await event.save();
    return res.status(200).send({
      status: "success",
      messsage: "Request send to the organizer",
      data: event,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};



const organiserCheckRequest = async (req, res) => {
  const { eventId, playerId } = req.params;
  const { status } = req.body;
  try {
    if (!status) {
      return res
        .status(400)
        .send({ status: "error", message: "Please provide the status" });
    }

    const event = await EventModal.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .send({ status: "error", message: "Event not found" });
    }
    const request = event.players.find(
      (player) => player._id.toString() === playerId
    );

    if (!request) {
      return res
        .status(404)
        .send({ status: "error", message: "Request not found" });
    }

    if (request.status === "accepted" || request.status === "rejected") {
      return res
        .status(400)
        .send({ status: "error", message: "Request already processed" });
    }

    request.status = status;
    await event.save();
    return res.status(200).send({
      status: "success",
      messsage: `Your request is ${status} by the orgainzer`,
      data: request,
    });
  } catch (er) {
    return res.status(500).send({ status: "error", message: er.message });
  }
};




module.exports = {
  createEvent,
  getAllEvent,
  sendRequestToJoin,
  organiserCheckRequest,
};
