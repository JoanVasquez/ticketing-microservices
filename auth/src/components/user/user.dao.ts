import { BadRequestError } from "@jvtickets22/common";
import User from "./user.model";
import bcrypt from "bcrypt";

export const signUpDao = async (data: any) => {
  const { email } = data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in used");
  }

  const user = User.build(data);
  await user.save();
  return user;
};

export const signInDao = async (data: any) => {
  const { email, password } = data;
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials");
  }

  const isPassword = await bcrypt.compare(password, existingUser.password);

  if (!isPassword) {
    throw new BadRequestError("Invalid credentials");
  }

  return existingUser;
};
