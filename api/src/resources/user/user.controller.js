import { User } from "./user.model";
import jwtDecode from "jwt-decode";
import { saltPassword, createToken, checkPassword } from "../../utils";

export async function registerUser(req, res) {
  try {
    const requestUser = req.body;
    const { name, email } = requestUser;
    const existUser = await User.findOne({ email }).exec();

    if (existUser) {
      res.status(400).send({ message: "email already exists" });
    }
    const { password } = requestUser;
    const hashPassword = await saltPassword(password);
    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const createUser = new User(userData);
    const user = await createUser.save();
    const token = createToken(user._id);
    const jwtResponse = jwtDecode(token);
    res.status(200).send({
      userInfo: user,
      token,
      expiresAt: jwtResponse.exp,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e && e.message });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send({ message: "email or password is wrong" });
    }
    if (!(await checkPassword(password, user.password))) {
      return res.status(400).send({ message: "email or password is wrong" });
    }
    const token = createToken(user._id);
    const jwtResponse = jwtDecode(token);
    return res.status(200).send({
      userInfo: user,
      token,
      expiresAt: jwtResponse.exp,
    });
  } catch (e) {
    return res.status(500).send({ message: e && e.message });
  }
}
