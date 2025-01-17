const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
    // filename: (req, file, callback) => {
    //     const cleanedFileName = slugify(file.originalname, { lower: true });
    //     const extension = MIME_TYPES[file.mimetype];
    //     callback(null, cleanedFileName + '-' + Date.now() + '.' + extension);
    // }
});

module.exports = multer({ storage: storage }).single('image');