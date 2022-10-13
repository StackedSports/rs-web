export const fileTypes = [
    {
        type: "file_type",
        label: "Image",
    },
    {
        type: "file_type",
        label: "Video",
    },
    {
        type: "file_type",
        label: "GIF",
    },
    {
        type: "file_type",
        label: "PDF",
    },
];


export const getExtension = (filename) => {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

export const isImage = (filename) => {
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

export const isVideo = (filename) => {
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

export const isFileValid = (file) => {
    const { type, size } = file
    const PERMITTED_IMAGES_TYPES = ["png", "jpeg", "jpg", "gif", "webp"]
    const MAX_IMAGE_SIZE = 5000000 // 5MB
    const isImageValid = PERMITTED_IMAGES_TYPES.some(extension => type.toLowerCase().includes(extension)) && size < MAX_IMAGE_SIZE

    const PERMITTED_OTHER_TYPES = ["pdf", "mp4", "avi"]
    const MAX_OTHER_FILES_SIZE = 15000000 // 15MB
    const isOtherFilesValid = PERMITTED_OTHER_TYPES.some(extension => type.toLowerCase().includes(extension)) && size < MAX_OTHER_FILES_SIZE
    return isImageValid || isOtherFilesValid
}
