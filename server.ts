import app from './src/app.ts'
import { envConfig } from "./src/config/config.ts";

function startServer(){
 const port = envConfig.port || 4000
  app.listen(3000, ()=>{
    console.log(`Server has started at port ${port}`);

  })
}

startServer()
