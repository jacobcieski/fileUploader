# React-S3-fileuploads
An easy way to upload files to AWS S3 from a React App
Thumbnails are generated via AWS Lambda and stored into another bucket


# Set UP

Inside backend create a file called .env <br/>
In that file include: <br/>

AWSAccessKeyId=??? 
<br/>
AWSSecretKey=???
<br/>
Bucket=s3SrcBucket
<br/>

Make sure to create another s3 bucket with "resize" at the end of the name:<br/>
s3SrcBucketresize <br/>
<br/>
This is where the thumbnails are stored. <br/>
<br/>
--Backend-- <br/>
npm install <br/>
npm start <br/>
<br/>
Inside frontend/fileuploader <br/>
npm install <br/>
npm start <br/>

<br/>
Next Steps: <br/>
Reduce amount of AWS bucket calls: <br/>
change onerror img tag, to continuously try and use the bucket link as a src and if not get it as the loading image, until the proper image is loaded, if not then it will stay as the loading image?? <br/>
Potentially create a Lambda function that is triggered during the create of the thumbnail image that sends the link information to the local server to use for the thumbnail instead of having to request the calls from the client side?? <br/>
Improving thumbnail img lambda function:<br/>
Look into potentially using Imgix or Cloudinary, or look into another node package that uses less memory to perform the thumbnail compression. <br/>
