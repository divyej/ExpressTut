const path = require('path');
const PORT = process.env.PORT || 3500;
const express = require('express')
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
app.get('/*',(req,res)=>{
    res.status(404).sendFile( './views/404.html',{root:__dirname})
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));