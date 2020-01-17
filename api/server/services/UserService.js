import database from "../src/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Utils from "../utils/Utils";

class UserService {
  static async authUser(user) {
    try {
      const userToAuth = await database.User.findOne({
        where: { login: user.login }
      });

      if (!userToAuth) return null;
      if ((await bcrypt.compare(user.password, userToAuth.password)) == false)
        return null;

      const token = jwt.sign(
        { id: userToAuth.id, role: userToAuth.role },
        Utils.getTokenSecret()
      );

      return token;
    } catch (error) {}
  }

  static async addUser(newUser) {
    try {
      const savedUser = await database.User.findOne({
        where: { login: newUser.login }
      });

      if (savedUser) return null;

      newUser.password = await bcrypt.hash(newUser.password, 10);

      return await database.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, newUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id }
      });

      if (userToUpdate) {
        await database.User.update(newUser, { where: { id } });

        return newUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAnUser(id) {
    try {
      const user = await database.User.findOne({
        where: { id }
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
