import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const pokeUserSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      minLength: 2,
      required: true,
    },
    last_name: {
      type: String,
      minLength: 2,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

pokeUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

pokeUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model("PokeUser", pokeUserSchema);

export default UserModel;
