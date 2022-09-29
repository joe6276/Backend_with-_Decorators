import {NextFunction, Request,Response} from 'express'
import { get,Controller, Use } from '../Decorators'
function Logger(req:Request, res:Response, next:NextFunction){
    console.log('Request was Sent');
    next()
    
}
@Controller('')
class TodoController {
@get('/todo')
@Use(Logger)
getTodo(req:Request, res:Response){
}


addTodo(req:Request , res:Response){

}

}


