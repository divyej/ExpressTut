const path = require('path');
const PORT = process.env.PORT || 3500;
const express = require('express');
const { Console } = require('console');
const app =express()
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));