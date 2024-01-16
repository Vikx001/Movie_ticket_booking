const User = require("../../models/userModel");
const bcrypt =require("bcrypt");
const axios = require('axios')
class UserService {
  async createUser(userData) {
    // Insert user creation logic here (e.g., save to the database)
    // Return the created user data
    const { username,phoneno,emailid, password,role,status} = userData;
    const userexist =  await User.findOne({
      attributes:['userid','username','role',"status"],
      where: {
        username : username
    }
  });
  if(!userexist){
    const hashpassword= await bcrypt.hash(password,10);
    userData=await User.create({
      username:username,
      password:hashpassword,
      role:role,
      status:status
  });
}
else
{
  throw new Error("User Exist");
}
  /*
  try {
    const res = await axios.post('https://reqres.in/api/users', 
    {
      userID:userData.userID,
      phoneNo:phoneno,
      emailid:emailid,
    })
    console.log(res.data)
  } 
  catch (err) {
    console.error(err)
  }*/
    return userData; // This should be the logical value
  }
  async getAllUsers() {
  const response = await User.findAll({
      attributes:['username','role',"Status"]
  });
  return response;
  }

  async getUserById(id) {
    console.log(id)
    const user = await User.findOne({
      attributes:['userid','username','role',"status"],
      where: {
        userid : id
    }
  });
  return user;
  }

  async updateUser(id) {
    const userupdate=await User.update({
      phoneNo:phoneno,
      emailid:emailid
  },{
      where:{
          userid: id
      }
  });
  return userupdate;
  }
  async deleteUser(id) {

  const userdelete=await User.update({
    status:0
  },{
      where:{
          userid: id
      }
  });
  return userdelete;
    }
  async logoutUser(id) {
    req.session.destroy((err)=>{
      return res;
    });
  }
  async updatePassword(id,user) {
    console.log(id,user)
    const hashpassword= await bcrypt.hash(user.password,10);
    const updatepwd=await User.update({
      password:hashpassword
  },{
      where:{
          userid: id
      }
  });

  return updatepwd;
  }
}

module.exports = new UserService();
