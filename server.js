const express = require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const app = express()
const port = process.env.PORT ||5000

// connection to mongodb database
mongoose.connect(require('./keys/config')
.mongoseURL,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(console.log('mongoose database connected successfully'))
.catch(err=>console.log(err))


require('./models/User')
require('./models/post')
require('./models/edit')


// middleware
app.use(cors());
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/edit'))
app.use(require('./routes/User'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// port listing to the server
app.listen(port, () => console.log(`Example app listening on port ${port}`))