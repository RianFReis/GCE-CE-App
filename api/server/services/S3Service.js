class S3Service {
  constructor() {
    this.s3 = null;
  }

  static async initialize(s3) {
    this.s3 = s3;
  }

  static async uploadPicture(filename, fileContent) {
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `gallery/${filename}`,
      Body: fileContent,
      ACL: "public-read"
    };

    let link = await this.s3
      .upload(params)
      .promise()
      .then(v => {
        return v;
      });

    return link;
  }

  static async deletePicture(filename) {
    this.s3.deleteObject({ Key: `gallery/${filename}` });
  }

  static async uploadDoc(filename, fileContent) {
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `docs/${filename}`,
      Body: fileContent,
      ACL: "public-read"
    };

    let link = await this.s3
      .upload(params)
      .promise()
      .then(v => {
        return v;
      });

    return link;
  }

  static async deleteDoc(filename) {
    this.s3.deleteObject({ Key: `docs/${filename}` });
  }
}

export default S3Service;
