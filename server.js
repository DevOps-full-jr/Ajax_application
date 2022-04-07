const bodyParser=require('body-parser')
const  express = require('express')
const morgan = require('morgan')
const path= require("path")
const app = express()

app.use(express.static('.'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(require("./routes"))

const port =8080
const multer = require('multer')



const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './upload')
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage, }).single('arquivo')

const uploadPI = multer({
	storage: storage,
	fileFilter: (req,file,cb)=> {
		console.log('In File Filter');
			let ext = path.extname(file.originalname);
			if(ext == '.jpg' || ext == '.png' || ext == '.gif' || ext == '.jpeg') {
				console.log('Extension Check');
				cb(null,true);
			}
			else {
				cb('Only Images Are Allow', false);
			}
	}
}).single('biplab');



app.post('/upload',upload, (req, res) => {
    upload(req, res, err => {
        if (err) {
            console.log(err)
            return res.end('Ocorreu um erro.')

        }
        
        res.end('Concluído com sucesso.')
    })
})
app.post('/uploads', (req, res) => {
   
    uploadPI(req, res, err => {
        if (err) {
            console.log(err)
            return res.end('Ocorreu "uuns" erro.')

        }
 
        res.end('Concluído com sucesso.')
    })
})

app.post('/ajax/formulario', (req, res) => {
    res.send({
        ...req.body,
        id: 1000
    })
})

app.get('/ajax/parOUImpar',(req,res)=>{
    // req.body
    // req.query
    // req.params
    const par = parseInt(req.query.numero)%2===0
    res.send({
        resultado:par? 'par':'impar'
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
