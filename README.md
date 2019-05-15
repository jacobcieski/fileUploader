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
This is where the thumbnails are stored. <br/>

--Backend-- <br/>
npm install <br/>
npm start <br/>

Inside frontend/fileuploader <br/>
npm install <br/>
npm start <br/>
