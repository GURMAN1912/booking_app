const mongoose =require("mongoose")
const {Schema} =mongoose

const UserSchema =new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
})
const UserModel =mongoose.model("User",UserSchema)

module.exports=UserModel

//   <div className="text-center max-w-lg mx-auto text-lg bg-gray-100 p-10 rounded-full">
//   Logged in as {user.name}({user.email})
//   <button className="primary" onClick={logout}>Logout</button>
// </div>