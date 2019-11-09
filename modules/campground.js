const mongoose= require('mongoose');

const campgroundSchema = new mongoose.Schema({
  name:String,
  image:String,
  description: String,
  author:{
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments:[{
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
const Campground = new mongoose.model('Campground',campgroundSchema);

module.exports = Campground;
