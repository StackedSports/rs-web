const  getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

const isImage = (filename)=> {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'bmp':
        case 'png':
            return true;
    }
    return false;
}

const isVideo= (filename)=> {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'm4v':
        case 'avi':
        case 'mpg':
        case 'mp4':
            return true;
    }
    return false;
}

exports.isImage=isImage;
exports.isVideo=isVideo