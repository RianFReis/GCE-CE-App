import GalleryService from "../services/GalleryService";
import Util from "../utils/Utils";

const util = new Util();

class GalleryController {
  static async getAllPics(req, res) {
    try {
      const allPics = await GalleryService.getAllGalleryPics();
      if (allPics.length > 0) {
        util.setSuccess(200, "Books retrieved", allPics);
      } else {
        util.setSuccess(200, "No book found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addPic(req, res) {
    if (!req.body.title || !req.body.imageUrl || !req.body.description) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newPic = req.body;
    try {
      const createdPic = await GalleryService.addGalleryPic(newPic);
      util.setSuccess(201, "Pic Added!", createdPic);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updatePic(req, res) {
    const alteredPic = req.body;
    const { id } = req.params;
    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }
    try {
      const updatePic = await GalleryService.updateGalleryPic(id, alteredPic);
      if (!updatePic) {
        util.setError(404, `Cannot find book with the id: ${id}`);
      } else {
        util.setSuccess(200, "Book updated", updatePic);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAPic(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }

    try {
      const thePic = await GalleryService.getAPic(id);

      if (!thePic) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Book", thePic);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deletePic(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, "Please provide an id");
      return util.send(res);
    }

    try {
      const picToDelete = await GalleryService.deletePic(id);

      if (picToDelete) {
        util.setSuccess(200, "Pic deleted");
      } else {
        util.setError(404, `Pic with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default GalleryController;
