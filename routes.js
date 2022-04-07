const routes= require('express').Router();
const multer=require('multer')
const multerConfig= require('./config/multer')

routes.post("/posts",multer(multerConfig).single('file'),(req,res)=>{
    console.log(req.file)
    return res.json({ helo:"Rocket" });

})

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})
//const upload = multer({ storage: storage, }).single('arquivo')
const upload = multer({ storage }).single('arquivo')

routes.post('/upload',upload, (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.end('Ocorreu um erro.')

        }
        
        res.end('Concluído com sucesso.')
    })
})
module.exports=routes