import {Request, Response } from 'express'
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import Connection from '../DatabaseHelpers/db'
import { Controller, get, post, Use } from '../Decorators'
import { JwtMiddleware } from '../Midlleware/Verify'
const db = new Connection()
@Controller('')
class UserController{
@post('/user')
async addUser(req:Request, res:Response){
 const id =uid()
 const {name, email, password}=req.body as {name:string, email:string, password:string}

 const hashed= await bcrypt.hash(password,10)
 await db.exec('insertUser', {id,name,email,password:hashed})
res.json({message:'User added Successfully'})

}
@get('/user/:id')
async getUser (req:Request, res:Response){
    const id = req.params.id
    const {recordset} = await db.exec('getUser', {id})
    res.json(recordset)
}

@post('/user/login')
async loginUser(req:Request, res :Response){
 const {password, email}=req.body as { email:string, password:string}
 const {recordset}= await db.exec('getUserbyEmail', {email})
 if(!recordset[0]){
    return res.status(422).json({message:'User not Found'})
 }
 const validpassword = await bcrypt.compare(password, recordset[0].password)
 if(!validpassword){
     return res.status(422).json({message:'User not Found'})
 }
const token:string = jwt.sign(recordset[0], process.env.SECRET as string,{expiresIn:'30m'})
return res.json(token)
}

}