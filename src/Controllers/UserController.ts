import {Request, Response } from 'express'
import {v4 as uid} from 'uuid'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import Connection from '../DatabaseHelpers/db'
// import { Controller, get, post, Use } from '../Decorators'
import { JwtMiddleware } from '../Midlleware/Verify'
const db = new Connection()
import { Controller,Get,Post,Body, Param } from '@nestjs/common'

interface User {
    name:string, 
    email:string,
     password:string
}
@Controller('/user')
export class UserController{
@Post()
async addUser(@Body() body :User){
 const id =uid()
 const {name, email, password}=body
 const hashed= await bcrypt.hash(password,10)
 await db.exec('insertUser', {id,name,email,password:hashed})
return {message:'User added Successfully'}

}
@Get('/:id')
async getUser (@Param('id') id:string){
    const {recordset} = await db.exec('getUser', {id})
    return recordset
}

@Post('/login')
async loginUser(@Body() body :{email:string, password:string}){
 const {password, email}=body
 const {recordset}= await db.exec('getUserbyEmail', {email})
 if(!recordset[0]){
    return {message:'User not Found'}
 }
 const validpassword = await bcrypt.compare(password, recordset[0].password)
 if(!validpassword){
     return {message:'User not Found'}
 }
const token:string = jwt.sign(recordset[0], process.env.SECRET as string,{expiresIn:'30m'})
return {token}
}

}