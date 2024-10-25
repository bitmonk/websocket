import app from './src/app.ts'
import { envConfig } from "./src/config/config.ts";
import dbConnect from './src/config/db.ts';

async function startServer(){
await dbConnect()

 const port = envConfig.port || 4000
  app.listen(3000, ()=>{
    console.log(`Server has started at port ${port}`);

  })
}

startServer()
