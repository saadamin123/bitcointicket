const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  tickets: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      autopopulate: true,
    },
  ],
});

ticketSchema.plugin(require("mongoose-autopopulate"));
let Tickets = mongoose.model("tickets", ticketSchema); // mongoose.models.Shop ||

module.exports = Tickets;
