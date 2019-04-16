const mongoose = require("mongoose");
const moment = require("moment");
mongoose.connect(
  "mongodb://" +
    process.env.DBUSER +
    ":" +
    process.env.DBPASSWORD +
    "@ds119606.mlab.com:19606/kode24-paaskebase"
);

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, unique: true, lowercase: true },
  username: { type: String, unique: true, lowercase: true },
  aggregatedAnswerCount: { type: Number, default: 0 },
  answersInFolders: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FileSystemUser" }
  ]
});

const FileSystemUserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, unique: true, lowercase: true },
  password: { type: String }
});

const FolderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "FileSystemUser" },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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

const FileSystemUser = mongoose.model("FileSystemUser", FileSystemUserSchema);
const Folder = mongoose.model("Folder", FolderSchema);
const User = mongoose.model("User", UserSchema);

async function getPublicUsersByScore() {
  try {
    return await User.find({})
      .select("-_id username aggregatedAnswerCount")
      .sort("-aggregatedAnswerCount")
      .exec();
  } catch (error) {
    console.log("dataerror", error);
    return false;
  }
}

async function getPublicUsersScoreByFolder() {
  try {
    return await Folder.find({
      "answers.0": { $exists: true }
    })
      .select("-_id name")
      .sort({ "answers.length": -1 })
      .populate("answers", "-_id username")
      .exec();
  } catch (error) {
    console.log("dataerror", error);
    return false;
  }
}

module.exports = {
  getPublicUsersByScore: getPublicUsersByScore,
  getPublicUsersScoreByFolder: getPublicUsersScoreByFolder
};
