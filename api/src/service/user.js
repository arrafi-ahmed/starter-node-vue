const jwt = require("jsonwebtoken");
const CustomError = require("../model/CustomError");
const { sql } = require("../db");
const { hash, compare } = require("bcrypt");

const generateAuthData = (result) => {
  let token = "";
  let currentUser = {};
  if (result) {
    currentUser = {
      id: result.id,
      role: result.role === 10 ? "admin" : "user",
      name: result.fullName,
      image: result.image,
    };
    token = jwt.sign({ currentUser }, process.env.TOKEN_SECRET);
  }
  return { token, currentUser };
};
// role 10 = admin, 20 = manager
exports.save = async ({ payload }) => {
  const hashedPassword = await hash(payload.password, 10);
  const user = {
    ...payload,
    password: hashedPassword,
    role: 20,
    createdAt: new Date(),
  };
  let savedUser = null;
  try {
    [savedUser] = await sql`
            insert into users ${sql(user)} on conflict(id) do
            update set ${sql(user)} returning *`;
  } catch (err) {
    if (err.code === "23505")
      throw new CustomError("Email already taken!", 409);
    else throw err;
  }
  return savedUser;
};

exports.signin = async ({ payload: { email, password } }) => {
  const result = await sql`
        select *
        from users
        where email = ${email}`;
  if (result.length === 0) {
    throw new CustomError("Incorrect email/password!", 401);
  }
  const user = result[0];
  const isPasswordValid = await compare(password, user.password); // Compare hashed password
  if (!isPasswordValid) {
    throw new CustomError("Incorrect email/password!", 401);
  }
  return generateAuthData(user);
};
