import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        // to decrease the chances of overwriting if two files are uplaoded with the same name.
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.filename + '-' + uniqueSuffix)
    }
})

export const uplaod = multer(
    {
        storage,
    }
)