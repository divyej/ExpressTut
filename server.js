const path = require('path');
const PORT = process.env.PORT || 3500;
const cors = require('cors')
const {logger}= require('./middlware/logEvents.js')
const errorHandler=require ('./middlware/errorHandler.js')
const express = require('express');
const { Console } = require('console');
const app =express()
//custom middleware
app.use(logger)

//Cross origin resource sharing 
const whitelist=['https://www.google.com','http://localhost:3500']; 
const corsOptions={
    origin :(origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true)
        }
        else{
            callback(new Error('not allowed by cors'))
        }
    },
    optionsSuccessStatus:200
}


app.use(cors(corsOptions))    


//built in middleware hadle urlencoded data 
//in other words  , form data 
app.use(express.urlencoded({extended:false}))

//built in middleware for json
app.use(express.json())

//serve static file 
app.use('/',express.static(path.join(__dirname,'/public')))
app.use('/subdir',express.static(path.join(__dirname,'/public')))

app.use('/',require('./routes/root.js'))

app.use('/subdir',require('./routes/subdir.js'))

app.use('/employees',require('./routes/api/employees.js'))



app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
       res.sendFile( './views/404.html',{root:__dirname})
    }
    else if(req.accepts('json'))
    {
      res.json({error:"error 404 not found"})  
    }
    else {
        res.type('txt').send("404 not found")
    }
})
//error handler 
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));