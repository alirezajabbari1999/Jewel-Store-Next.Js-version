import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};

const generateToken = (data) => {
  const token = sign({ ...data }, process.env.privateKey, {
    expiresIn: "24h",
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const validationResult = verify(token, process.env.privateKey);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Error =>", err);
    return false;
  }
};

const generateRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.refreshTokenPrivateKey, {
    expiresIn: "15d",
  });
  return token;
};

const validatePhone = (phone) => {
  const patern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
  return patern.test(phone);
};

const validatePassword = (password) => {
  const patern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return patern.test(password);
};

const validateEmail = (email) => {
  //اول دو تا اسلش مینویسم بعدش کد رجکس رو بینش کپی میکنم و بعد از اسلش آخر هم یدونه جی میذارم
  const patern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return patern.test(email);
};

export {
  hashPassword,
  generateToken,
  verifyPassword,
  verifyToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
};
