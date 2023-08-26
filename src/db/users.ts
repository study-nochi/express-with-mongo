import mongoos from "mongoose";

const UserSchema = new mongoos.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  authentication: {
    password: { type: String, require: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const UserModal = mongoos.model("User", UserSchema);

export const getUsers = () => UserModal.find();
export const getUserByEmail = (email: string) => UserModal.findOne({ email });
export const getUserBySeesionToken = (sessionToken: string) =>
  UserModal.findOne({
    "authentication.sessionToken": sessionToken,
  });

export const getUserById = (id: string) => UserModal.findById(id);
export const createUser = (values: Record<string, any>) =>
  new UserModal(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModal.findOneAndDelete({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModal.findByIdAndUpdate(id, values);
