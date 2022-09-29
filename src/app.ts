import express from 'express'
import { AppRouter } from './Router/AppRouter'
const router= AppRouter.getInstance()
import './Controllers/TodoController'
const app= express()

app.use(express.json())
app.use(router)


app.listen(4000, ()=>{
    console.log('App is Listening');
    
})