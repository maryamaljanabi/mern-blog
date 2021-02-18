import User from "./../models/user";

export const getAllUsers = async () => {
  return await User.find({});
};

export const getOneUser = async (id) => {
  return await User.findById(id);
};

export const addUser = async (user) => {
  return await User.create(user);
};

export const updateUser = async (user) => {
  return await User.findByIdAndUpdate(user.id, user);
};

export const deleteUser = async (id) => {
  return await User.findOneAndRemove({ _id: id });
};
