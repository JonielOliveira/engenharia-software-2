const mongoose = require('mongoose');

// process.env.MONGO_URI

mongoose.connect("mongodb://localhost:27017/feirao", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

module.exports = mongoose;
