import database from "../src/models";

class GalleryService {
  static async getAllGalleryPics() {
    try {
      return await database.GalleryPics.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addGalleryPic(newPic) {
    try {
      return await database.GalleryPics.create(newPic);
    } catch (error) {
      throw error;
    }
  }

  static async updateGalleryPic(id, newPic) {
    try {
      const picToUpdate = await database.GalleryPics.findOne({
        where: { id }
      });

      if (picToUpdate) {
        await database.GalleryPics.update(newPic, { where: { id } });

        return newPic;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAPic(id) {
    try {
      const pic = await database.GalleryPics.findOne({
        where: { id }
      });

      return pic;
    } catch (error) {
      throw error;
    }
  }

  static async deletePic(id) {
    try {
      const picToDelete = await database.GalleryPics.findOne({ where: { id } });

      if (picToDelete) {
        const deletedPic = await database.GalleryPics.destroy({
          where: { id }
        });
        return deletedPic;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default GalleryService;
