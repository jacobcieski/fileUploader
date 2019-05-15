# React-S3-fileuploads
An easy way to upload files to AWS S3 from a React App
Thumbnails are generated via AWS Lambda and stored into another bucket


# Set UP

Inside backend create a file called .env
In that file include:

AWSAccessKeyId=???
AWSSecretKey=???
Bucket=s3SrcBucket

Make sure to create another s3 bucket with "resize" at the end of the name:
s3SrcBucketresize
This is where the thumbnails are stored.

--Backend--
npm install
npm start

Inside frontend/fileuploader
npm install
npm start
