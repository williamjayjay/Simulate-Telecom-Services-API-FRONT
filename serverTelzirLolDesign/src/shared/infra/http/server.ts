import express, { Response, Request, NextFunction } from 'express'
import "reflect-metadata";
import "express-async-errors"
import cors from 'cors';
/* ============ LIBS ============= */


import { router } from './routes'
import '../typeorm'
import '../../container'
import ServiceResultWeb from "../../../shared/errors/ServiceResults/ServiceResultWeb";
/* ============ ROUTES AND MORE ============= */

const app = express()

app.use(cors());

app.use(express.json())

app.use(router)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {

  if (err instanceof ServiceResultWeb) {

    return response.status(err.statusCode).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })

})

app.listen(3333, () => console.log("SERVER START!✔"))