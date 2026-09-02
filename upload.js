const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.fieldname === "imagem_curso") {
            cb(null, "uploads/img");
        }

        else if (file.fieldname === "grade_curso") {
            cb(null, "uploads/grades");
        }

        else {
            cb(new Error("Campo de arquivo inválido"));
        }
    },

    filename: (req, file, cb) => {

        const nomeUnico =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, nomeUnico);
    }

});

const upload = multer({
    storage: storage
});

module.exports = upload;