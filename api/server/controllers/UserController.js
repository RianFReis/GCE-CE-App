import UserService from "../services/UserService";
import Util from "../utils/Utils";

const util = new Util();

class UserController {
  static async authUser(req, res) {
    if (!req.body.login || !req.body.password) {
      util.setError(400, "Please provide complete credentials");
      return util.send(res);
    }
    const user = req.body;
    try {
      const token = await UserService.authUser(user);

      if (token) util.setSuccess(201, "Authenticated succesfully!", token);
      else util.setError(400, "Login or password incorrect");

      return util.send(res);
    } catch (error) {}
  }

  static async addUser(req, res) {
    if (!req.body.login || !req.body.password || !req.body.name) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newUser = req.body;
    try {
      const createdUser = await UserService.addUser(newUser);

      if (createdUser) util.setSuccess(201, "User Added!", createdUser);
      else util.setError(400, "Login already used");

      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;
    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }
    try {
      const updateUser = await UserService.updateUser(id, alteredUser);
      if (!updateUser) {
        util.setError(404, `Cannot find user with the id: ${id}`);
      } else {
        util.setSuccess(200, "User updated", updateUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAnUser(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }

    try {
      const theUser = await UserService.getAnUser(id);

      if (!theUser) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, "Found User", theUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }
}

export default UserController;
