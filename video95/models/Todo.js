const kittySchema = new mongoose.Schema({
  name: String,
  desc: String,
  isDone: Boolean
});

const Kitten = mongoose.model('Kitten', kittySchema);