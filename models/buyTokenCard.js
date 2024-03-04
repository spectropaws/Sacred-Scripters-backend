const mongoose = require("mongoose");

const buyTokenCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The card must have a name."],
  },
  price: {
    type: Number,
    require: [true, "The card must have a price"],
  },
  slug: {
    type: String,
  },
});

buyTokenCardSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const buyTokenCard = mongoose.model("buyTokenCard", buyTokenCardSchema);
module.exports = buyTokenCard;
