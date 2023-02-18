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
app.use(express.static(path.join(__dirname,'/public')))

app.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile( './views/index.html',{root:__dirname})
})
app.get('/newpage(.html)?',(req,res)=>{
    res.sendFile( './views/new-page.html',{root:__dirname})
})
app.get('/oldpage(.html)?',(req,res)=>{
    res.redirect( './new-page.html')
}) 

//Routers
app.get('/hello(.html)?',(req,res,next)=>{
   console.log("attempted to call hello" )
   next()}
   ,(req,res)=>{
     res.send("hello woprld!")
   } 
)
//chain route handlers 
const one = (req,res,next)=>{
    console.log("one")
    next()
}
const two = (req,res,next)=>{
    console.log("two ")
    next()
}
const three = (req,res,next)=>{
    console.log("three")
    res.send("finished")
}
app.get('/chain(.html)?',[one,two,three])

app.get('/*',(req,res)=>{
    res.status(404).sendFile( './views/404.html',{root:__dirname})
})
//error handler 
app.use(errorHandler)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));