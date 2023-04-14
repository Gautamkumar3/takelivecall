const mongoose = require("mongoose");

const sportsEventSchema = new mongoose.Schema({
  sport_name: {
    type: String,
    required: [true, "Please provide name of the sports"],
  },
  description: {
    type: String,
    required: [true, "Please provide the event description"],
  },
  date: {
    type: Date,
    required: [true, "Please provide the event date"],
  },
  start_time: {
    type: String,
    required: [true, "Please provide the event start time"],
  },
  total_players: {
    type: Number,
    required: [true, "Please provide the number of players for this event."],
  },
  location: {
    type: String,
    required: [true, "Please provide the event location"],
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
