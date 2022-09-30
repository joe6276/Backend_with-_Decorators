import {NextFunction, Request,RequestHandler,Response} from 'express'
import { get,Controller, Use, post,del, BodyValidator, patch } from '../Decorators'
import {v4 as uid} from 'uuid'
import Connection from '../DatabaseHelpers/db'
import { JwtMiddleware } from '../Midlleware/Verify'

const db = new Connection()

function Logger(req:Request, res:Response, next:NextFunction){
    console.log('Request was Sent');
    next()
    
}
@Controller('/')
class TodoController {
@get('/todo')
@Use(JwtMiddleware)
async getTodos(req:Request, res:Response){
    const {recordset}=await db.exec('getTodos') 
    res.json(recordset)    
}
@post('/todo')
@BodyValidator('todoname','tododesc' )
@Use(JwtMiddleware)
 async addTodo(req:Request , res:Response){
  const id= uid()
  const{ todoname, tododesc} = req.body
  await  db.exec('insertTodo', {id,todoname,tododesc})
  res.json({message:'Todo Added Successfully'})
}

@get('/todo/:id')
@Use(JwtMiddleware)
async getTodo(req:Request,res:Response){
    const{recordset}= await  db.exec('getTodo', {id:req.params.id})

    if(!recordset[0]){
    return res.status(422).json({message:'No Record Found'})
    }
    res.json(recordset)
}

@patch('/todo/:id')
@Use(JwtMiddleware)
async updateTodo (req:Request , res:Response){
    const id = req.params.id
    const{recordset}= await  db.exec('getTodo', {id})

    if(!recordset[0]){
    return res.status(422).json({message:'No Record Found'})
    }

    const{ todoname, tododesc} = req.body 
    await db.exec('UpdateTodo', {id,todoname,tododesc})
    res.json({message:'Todo Updated Successfully'})
}
@del('/todo/:id')
@Use(JwtMiddleware)
async deleteTodo(req:Request, res:Response){
    const id =req.params.id
    const{recordset}= await  db.exec('getTodo', {id})

    if(!recordset[0]){
    return res.status(422).json({message:'No Record Found'})
    }
    await db.exec('DeleteTodo', {id})
    res.json({message:'Todo Deleted  Successfully'})
}
}


