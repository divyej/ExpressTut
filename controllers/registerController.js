const userDB={
    users: require('../models/users.json'),
    setUsers: function (data){this.users=data}
} 
const fsPromises= require('fs').promises
const path= require('path')
const bcrypt=require('bcrypt')

const handleNewUser= async(req,res)=>{
    const {user,pwd}= req.body;
    if(!user||!pwd) return res.status(400).json({'message':'username and password are requrired'})
    //check for duplicate username in daabase 
    const duplicate=userDB.users.find(person=>person.username==user);
    if(duplicate) return res.sendStatus(409);//confict
    try{
        //encrypt the password 
        const hashedPwd= await bcrypt.hash(pwd,10)
        //store the new user
        const newUser={"username":user, "password":hashedPwd}
        userDB.setUsers([...userDB.users,newUser])
    await fsPromises.writeFile(path.join(__dirname,'..','models','users.json'),
    JSON.stringify(userDB.users)
    )
    console.log(userDB.users)
    res.status(201).json({'success':`new user ${user} created`})
    }
    catch(err){
        res.status(500).json({'message':err.message})


    }
}
module.exports ={handleNewUser}