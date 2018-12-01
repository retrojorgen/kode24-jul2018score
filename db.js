const mongoose = require("mongoose");
const moment = require("moment");
mongoose.connect(
  "mongodb://" +
    process.env.DBUSER +
    ":" +
    process.env.DBPASSWORD +
    "@ds123753.mlab.com:23753/kode24-julebase"
);

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, lowercase: true},
  username: { type: String, unique: true, lowercase: true },
  aggregatedAnswerCount: { type: Number, default: 0 },
  answersInFolders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Folder" }]
});

const FolderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullpath: { type: String },
  parent: { type: String },
  name: { type: String },
  availableFrom: { type: Date, default: Date.now },
  passphrase: { type: String },
  points: { type: Number, default: 1 },
	answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	global: { type: Boolean },
  files: [
    {
      name: { type: String },
      type: { type: String },
      size: { type: Number },
      content: [{ type: String }],
      path: { type: String }
    }
  ]
});

const Folder = mongoose.model("Folder", FolderSchema);
const User = mongoose.model("User", UserSchema);

async function getUsersByScore() {
  try {
    return await User.find({}).sort("-aggregatedAnswerCount").exec();
  } catch (error) {
		console.log('dataerror',error);
    return false;
  }
}

async function getUsersScoreByFolder() {
  try {
    return await Folder.find({passphrase: { $exists: true}, "answers.0": { "$exists": true }}).sort({"answers.length": -1}).populate("answers").exec();
  } catch (error) {
		console.log('dataerror',error);
    return false;
  }
}


module.exports = {
  getUsersByScore:getUsersByScore,
  getUsersScoreByFolder: getUsersScoreByFolder
};
