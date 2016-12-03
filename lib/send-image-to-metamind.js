const readFile              = require('./read-file');
const cloudinaryResizeImage = require('./cloudinary-resize-image');
const queryMetamind         = require('./query-metamind');
const Episode7 = require('episode-7');

function* sendImageToMetamind(filePath,
                              fileExt,
                              metamindModelId,
                              metamindAccountId,
                              metamindPrivateKey,
                              metamindJwtToken) {
  
  let fileData = yield Episode7.call(
    readFile,
    filePath
  );
  console.log('1');

  let resizedImgUrl = yield Episode7.call(
    cloudinaryResizeImage,
    fileExt,
    fileData,
    500
  );
  console.log('2');

  let metamindResult = yield Episode7.call(
    queryMetamind,
    resizedImgUrl,
    metamindModelId,
    metamindAccountId,
    metamindPrivateKey,
    metamindJwtToken
  );
  console.log('3');
  
  return metamindResult;
}

module.exports = sendImageToMetamind;