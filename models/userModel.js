const  mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

let UserModelSchema=new mongoose.Schema({
    name:String,
    password:{
        type:String,
        select:false
    },
    email:String

});

UserModelSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('UserModel',UserModelSchema);