// import express from 'express'
// import { AppRouter } from './Router/AppRouter'
// const router= AppRouter.getInstance()
// import './Controllers/TodoController'
// import './Controllers/UserController'
// class Server{
//     app:express.Express= express()
//     constructor(){
//         this.app.use(express.json())
//         this.app.use(router)
//         this.app.listen(4000, ()=>{
//         console.log('App is Listening');
        
//      })
//   }

// }


// new Server()

import { Controller, Get, Module } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { TodoController } from "./Controllers/TodoController";
import { UserController } from "./Controllers/UserController";

@Module({
    controllers:[TodoController, UserController]
})
class AppModule{

}

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.listen(4000)
}

bootstrap()