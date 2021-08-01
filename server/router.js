const express=require("express")
const router=express.Router()
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const DB='mongodb+srv://Ayushmina:1234@cluster0.thczm.mongodb.net/Room?retryWrites=true&w=majority'
mongoose.connect(DB,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log('connection is successfull');
}).catch((err)=>{
    console.error('No connection');

});
const User= require('./model/userSchema');
router.use(express.json());
router.get("/",(req,res)=>{
    res.send("Server is running").status(200);
})
router.post('/login',async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz"});
        }

        const userLogin = await doctor.findOne({email:email});
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password);
        if(!isMatch){
            res.status(400).json({error:"user error"});
        }
        else{
            res.json({message:"user signed in"});
        }
        }
        else{
            res.json({message:"user not signed in"});
        }
        

    }
    catch(err){
        console.log(err);
    }
});
router.post('/signup',async(req ,res)=>{
    const{name,email,contact,password}=req.body;
    if(!name || !email || !contact || !password  ){
        res.status(422).json({error:"please fill up"});
    }
   /* res.json({msg:"success"});*/
    console.log(name);
    try{
        const userExist=await User.findOne({email:email});
        if(userExist){
            res.status(422).json({error:"please fill new email  up"});
        }
        const user=new User({name,email,contact,password});
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        // now we set user password to hashed password
         user.password = await bcrypt.hash(user.password, salt);
        const userRegister=await user.save();
        if(userRegister){
            res.status(201).json({message:"user saved"});
        }
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;