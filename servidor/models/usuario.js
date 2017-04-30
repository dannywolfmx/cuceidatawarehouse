const mongoose = require("mongoose");
const Schema = mongoose.Schema

const bcrypt = require("bcrypt-nodejs")


const UsuarioSchema = Schema({
  correo: {
    type: String,
    unique: true
  },
  nombre: String,
  password: {
    type: String
  },
  rol:{
    type:String
  }
  ,
  archivos: [{
    direccion: { type: String, require: true }

  }]
  ,
  signupDate: {
    type: Date,
    default: Date.now()
  },
  lastLogin: Date
})


//encryptamos la password
UsuarioSchema.pre('save', function (next) {
  let usuario = this

  if (!usuario.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    } else {
      bcrypt.hash(usuario.password, salt, null, function (err, hash) {
        if (err) {
          return next(err)
        } else {
          usuario.password = hash
          next()
        }
      })
    }
  })
})
UsuarioSchema.methods.comparePassword = function (candidate, callback) {
  bcrypt.compare(candidate, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    } else {
      callback(undefined, isMatch)
    }
  })
}



module.exports = mongoose.model("Usuario", UsuarioSchema)
