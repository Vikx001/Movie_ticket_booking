const User = require("../../models/userModel");
const bcrypt =require("bcrypt");
const axios = require('axios')
class UserService {
async createUser(userData) {
  const { username, password,full_name,email_id,phone_no,area_Of_interest,role,status} = userData;
  /*try {*/
  const userexist =  await User.findOne({
      where: {
        username : username,
        email_id : email_id,
        status : 1
    }
  });
 
  if(!userexist){
    const hashpassword= await bcrypt.hash(password,10);
    const UserDetail=await User.create({
        username:username,
        email_id :email_id,
        password:hashpassword,
        role:role,
        status:status
    });
    const user_id=userData.user_id;
    //call customer service
    const res = await axios.post('http://localhost:8881/',
    {
      user_id,
      full_name,
      phone_no,
      area_Of_interest,
      status
    }).then(function (response) {
      return userData;
    }).catch(function (error) {
      console.log(error);
    });
  }
  else
  {
    throw new Error("User Exist");
  }

  /*}
  catch (error) {
    return error.message;
  }*/
  }

async getAllUsers() {
  const response = await User.findAll({
      attributes:['id','username','email_id','password','role',"status",'created_at','updated_at']
  });
  return response;
  }

async getUserById(id) {
    console.log(id)
    const user = await User.findOne({
      attributes:['id','username','email_id','password','role',"status",'created_at','updated_at'],
      where: {
        id : id
    }
  });
  return user;
  }

async updateUser(id,newdata) {
    const userupdate=await User.update({
      email_id:newdata.emailid
  },{
      where:{
          id: id
      }
  });
  return userupdate;
  }

async deleteUser(id) {

  const userdelete=await User.update({
    status:0
  },{
      where:{
          id: id
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
          id: id
      }
  });

  return updatepwd;
  }
}

module.exports = new UserService();
