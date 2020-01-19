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
}

export default S3Service;
