import * as bcrypt from "bcryptjs";

export const hashPassword = (plainText: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(plainText);
};

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
