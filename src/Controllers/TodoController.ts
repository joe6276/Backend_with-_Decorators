import {NextFunction, Request,RequestHandler,Response} from 'express'
// import { get,Controller, Use, post,del, BodyValidator, patch } from '../Decorators'
import {v4 as uid} from 'uuid'
import Connection from '../DatabaseHelpers/db'
import { JwtMiddleware } from '../Midlleware/Verify'
import { Get,Controller, Post,Body,  Param,Patch ,Delete} from "@nestjs/common"
const db = new Connection()

interface Todo {
    todoname:string
    tododesc:string
}
@Controller('/todo')
export class TodoController {
@Get()
async getTodos(){
    const {recordset}=await db.exec('getTodos') 
    return recordset  
}
@Post('')
 async addTodo(@Body() body :Todo){
  const id= uid()
  const {todoname,tododesc} = body
  await  db.exec('insertTodo', {id,todoname,tododesc})
  return {message:'Todo Added Successfully'}
}
@Get('/:id')
async getTodo(@Param('id') id:string){
    const{recordset}= await  db.exec('getTodo', {id})
    if(!recordset[0]){
    return {message:'No Record Found'}
    }
    return recordset
}
@Patch('/:id')
async updateTodo (@Body() body :Todo , @Param('id') id :string){
    const{recordset}= await  db.exec('getTodo', {id})
    if(!recordset[0]){
    return {message:'No Record Found'}
    }
    const{ todoname, tododesc} = body 
    await db.exec('UpdateTodo', {id,todoname,tododesc})
    return {message:'Todo Updated Successfully'}
}
@Delete('/:id')
async deleteTodo(@Param('id') id :string){
    const{recordset}= await  db.exec('getTodo', {id})
    if(!recordset[0]){
    return {message:'No Record Found'}
    }
    await db.exec('DeleteTodo', {id})
    return {message:'Todo Deleted  Successfully'}
}
}


