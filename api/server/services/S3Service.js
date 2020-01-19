class S3Service {
  constructor() {
    this.s3 = null;
  }

  static async initialize(s3) {
    this.s3 = s3;
  }

  static async uploadFile(filename, fileContent) {
    var params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: fileContent,
      ACL: "public-read"
    };

    this.s3.upload(params, function(err, data) {
      if (err) throw err;
    });
  }
}

export default S3Service;
