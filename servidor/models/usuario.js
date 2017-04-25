const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bcrypt = require("bcrypt-nodejs")


const UsuarioSchema = Schema({
  correo: {
    type: String,
    unique: true,
    lowercase:true
  },
  nombre:String,
  password: {
    type:String,
    select:false
  },
  signupDate:{
    type:Date,
    default:Date.now()
  },
  lastLogin:Date
})


//encryptamos la password
UsuarioSchema.pre('save',function (next){
  let usuario = this
  
  if(!usuario.isModified("password")){
    return next()
  }
  bcrypt.genSalt(10,(err,salt)=>{
    if(err){
      return next()
    }else{
      bcrypt.hash(usuario.password,salt,null,(err,hash)=>{
        if(err){
          return next(err)
        }else{
          usuario.password = hash
          next()
        }
      })
    }
  })
})

module.exports = mongoose.model("Usuario", UsuarioSchema)
