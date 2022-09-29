import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Data } from '../Decorators/Method'
dotenv.config()
interface Extended extends Request {
  info?: Data
}
export function JwtMiddleware(
  req: Extended,
  res: Response,
  next: NextFunction,
){
  try {
    const token = req.headers['token'] as string

    if (!token) {
      return res
        .status(401)
        .json({ 
          message: 'You are Not allowed to access this Route',
        })
    }

    const data = jwt.verify(token, process.env.SECRET as string) as Data
    req.info = data
  } catch (error) {
    return res.status(401).json({ error })
  }

  next()
}


