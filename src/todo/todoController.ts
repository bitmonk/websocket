import { Socket } from "socket.io";
import { getSocketIO } from "../../server";
import todoModel from "./todoModel";


class Todo{
    private io = getSocketIO();

    constructor(){
        this.io.on("connection", (socket:Socket)=>{
            console.log("New Client Connected !");
            socket.on("addTodo", (data)=>this.handleAddTodo(socket, data))
        })
    }

    private async handleAddTodo(socket:Socket, data:any){
        const {task,deadline,status} = data
        const todo = await todoModel.create({
            task,
            deadline,
            status
        })
        socket.emit("todo_response", {
            status : "success",
            data : todo
        })
    }
}

export default new Todo()
