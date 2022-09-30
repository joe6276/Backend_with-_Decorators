import express from 'express'
import { AppRouter } from './Router/AppRouter'
const router= AppRouter.getInstance()
import './Controllers/TodoController'
import './Controllers/UserController'
class Server{
    app:express.Express= express()
    constructor(){
        this.app.use(express.json())
        this.app.use(router)
        this.app.listen(4000, ()=>{
        console.log('App is Listening');
        
     })
  }

}


new Server()