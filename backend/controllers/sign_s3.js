var aws = require('aws-sdk');
require('dotenv').config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})

const S3_BUCKET = process.env.Bucket

function encode(data){
  let str = data.reduce(function(a,b){
    return a+String.fromCharCode(b) }, '');
  return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
  }
// Now lets export this function so we can call it from somewhere else
exports.sign_s3 = (req,res) => {

  const s3 = new aws.S3();  // Create a new instance of S3
  const fileName = req.body.fileName + '.' + req.body.fileType;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 50,
    ContentType: fileType
  };
// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json({success:true, data:{returnData}});
  });
};

//Make a get request to list all the files in the S3 bucket
exports.get_s3 = (req,res) =>{
  const s3 = new aws.S3(); 
  const getParams = {
    Bucket: S3_BUCKET
  }
  
  s3.listObjects(getParams, function(err, data) {
    if(err){
      console.log(err, err.stack);
    }
    const returnData = {
      fileList: data.Contents
    };
    return res.json({data:{returnData}});
  });
  
}

//Request the thumbnail bucket in order to get the image thumbnails
exports.get_tn = (req, res) =>{
  const s3 = new aws.S3();
  const getParams = {
    Bucket: S3_BUCKET + "resize",
    Key: "resize-" + req.body.fileName
  }
  s3.getSignedUrl('getObject', getParams, function(err, url){
    const returnUrl = `https://${S3_BUCKET + "resize"}.s3.amazonaws.com/${"resize-" + req.body.fileName}`;
    console.log(err);
    console.log(url);
    res.json({data:{returnUrl}, bucket: S3_BUCKET + "resize", key: req.body.fileName});
  });
}
