import DocumentService from "../services/DocumentService";
import Util from "../utils/Utils";
import S3Service from "../services/S3Service";

const util = new Util();

class DocumentController {
  static async getAllDocs(req, res) {
    try {
      const allDocs = await DocumentService.getAllDocuments();
      if (allDocs.length > 0) {
        util.setSuccess(200, "Docs retrieved", allDocs);
      } else {
        util.setSuccess(200, "No document found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addDoc(req, res) {
    if (!req.body.title || !req.body.description || !req.body.type) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newDoc = req.body;
    try {
      const file = req.file;
      const userId = req.user.id;
      const filename = file.originalname.split(".")[0];
      const fileExt = file.originalname.split(".")[1];
      const finalFileName = `${userId}_${filename}_${new Date()
        .getTime()
        .toString()}`;

      newDoc.fileName = finalFileName;
      newDoc.fileUrl = await S3Service.uploadDoc(
        `${finalFileName}.${fileExt}`,
        file.buffer
      ).then(v => {
        return v.Location;
      });

      const createdDoc = await DocumentService.addDocument(newDoc);

      util.setSuccess(201, "Doc Added!", createdDoc);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.message);
      return util.send(res);
    }
  }

  static async updateDoc(req, res) {
    const alteredDoc = req.body;
    const { id } = req.params;
    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }
    try {
      const file = req.file;
      const userId = req.user.id;
      const filename = file.originalname.split(".")[0];
      const fileExt = file.originalname.split(".")[1];
      const finalFileName = `${userId}_${filename}_${new Date()
        .getTime()
        .toString()}`;

      alteredDoc.fileName = finalFileName;
      alteredDoc.fileUrl = await S3Service.uploadDoc(
        `${finalFileName}.${fileExt}`,
        file.buffer
      ).then(v => {
        return v.Location;
      });

      const updateDoc = await DocumentService.updateDocument(id, alteredDoc);
      if (!updateDoc) {
        util.setError(404, `Cannot find document with the id: ${id}`);
      } else {
        util.setSuccess(200, "Doc updated", updateDoc);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getADoc(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, "Please input a valid id");
      return util.send(res);
    }

    try {
      const theDoc = await DocumentService.getADoc(id);

      if (!theDoc) {
        util.setError(404, `Cannot find book with the id ${id}`);
      } else {
        util.setSuccess(200, "Found Book", theDoc);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteDoc(req, res) {
    const { id } = req.params;

    if (!id) {
      util.setError(400, "Please provide an id");
      return util.send(res);
    }

    try {
      const theDoc = await DocumentService.getADoc(id);
      if (!theDoc) util.setError(404, `Cannot find book with the id ${id}`);

      S3Service.deleteDoc(theDoc.fileName);
      const DocToDelete = await DocumentService.deleteDoc(id);

      if (DocToDelete) {
        util.setSuccess(200, "Doc deleted");
      } else {
        util.setError(404, `Doc with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default DocumentController;
