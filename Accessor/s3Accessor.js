const {S3Client, GetObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({region: 'ap-south-1'});
function findPresignedUrl(key, expiresInSeconds){
    const command = new GetObjectCommand( { Key: key, Bucket: 'netflix-backend-demo'} );
    return getSignedUrl(client, command, {expiresIn: expiresInSeconds});
};

module.exports={
    findPresignedUrl
};