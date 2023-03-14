import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";

const secret = "testData"
export const signin = async(req, res)=>{
    const {email, password} = req.body
    try {
      const oldUser = await UserModel.findOne({email})  
      if(!oldUser){
        return res.status(400).json({message:"User is not available"})
      }
      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
      if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid credentials"})
      }
      
      const token = jwt.sign({email:oldUser.email,id:oldUser._id},secret,{expiresIn:"1h"})
      res.status(200).json({token, result:oldUser})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
       console.log(error); 
    }
}


export const signup = async(req, res)=>{
    const {email, password, fname, lname} = req.body
    try {
      const oldUser = await UserModel.findOne({email})  
      if(oldUser){
        return res.status(400).json({message:"User already exists"})
      }
      const hashedPassword = await bcrypt.hash(password, 12)
      const result = await UserModel.create({
        email,
        password:hashedPassword,
        name:`${fname} ${lname}`
      })
      const token = jwt.sign({email:result.email,id:result._id},secret,{expiresIn:"1h"})
      res.status(201).json({token, result})
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
       console.log(error); 
    }
}