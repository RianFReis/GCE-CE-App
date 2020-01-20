import database from "../src/models";

class DocumentService {
  static async getAllDocuments() {
    try {
      return await database.Documents.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async addDocument(newDoc) {
    try {
      return await database.Documents.create(newDoc);
    } catch (error) {
      throw error;
    }
  }

  static async updateDocument(id, newDoc) {
    try {
      const docToUpdate = await database.Documents.findOne({
        where: { id }
      });

      if (docToUpdate) {
        await database.Documents.update(newDoc, { where: { id } });

        return newDoc;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getADoc(id) {
    try {
      const doc = await database.Documents.findOne({
        where: { id }
      });

      return doc;
    } catch (error) {
      throw error;
    }
  }

  static async deleteDoc(id) {
    try {
      const docToDelete = await database.Documents.findOne({ where: { id } });

      if (docToDelete) {
        const deletedDoc = await database.Documents.destroy({
          where: { id }
        });
        return deletedDoc;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default DocumentService;
