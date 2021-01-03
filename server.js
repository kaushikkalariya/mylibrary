if(process.env.NODE_EN !== 'production'){
    const dotenv = require('dotenv');
    dotenv.config({path: './config.env'});
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require ('method-override')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors') 
const bookRouter = require('./routes/books') 

app.set('view engine','ejs')
app.set('views', __dirname+'/views')
app.set('layouts','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended:false }))

const mongoose = require('mongoose');
console.log(process.env.DATABASE);

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
); 

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => {
        //console.log(con.connections);
        console.log('DB connection successfully')
    });

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)

 
app.listen(process.env.PORT || 3000)