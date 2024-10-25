import { Server } from 'socket.io';
import app from './src/app.ts'
import { envConfig } from "./src/config/config.ts";
import dbConnect from './src/config/db.ts';

let io:Server | undefined;
function startServer(){
 dbConnect()

 const port = envConfig.port || 4000
 const server = app.listen(3000, ()=>{
    console.log(`Server has started at port ${port}`);
  })
  io = new Server(server)
}

function getSocketIO(){
    if(!io){
        throw new Error("Socket Initialization failed !")
    }
    return io;
}

startServer()
export {getSocketIO}
