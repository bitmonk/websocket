import { Socket } from "socket.io";
import { getSocketIO } from "../../server";
import todoModel from "./todoModel";
import { ITodo } from "./todoTypes";


class Todo{
    private io = getSocketIO();

    constructor(){
        this.io.on("connection", (socket:Socket)=>{
            console.log("New Client Connected !");
            socket.on("addTodo", (data)=>this.handleAddTodo(socket, data))
            socket.on("deleteTodo", (data)=>this.handleDeleteTodo(socket, data))
        })
    }

    private async handleAddTodo(socket:Socket, data:ITodo){
      try {
        const {task,deadline,status} = data
        await todoModel.create({
            task,
            deadline,
            status
        })
        const todos = await todoModel.find()
        socket.emit("todos_updated", {
            status : "success",
            data : todos
        })
      } catch (error) {
        socket.emit("todo_response",{
            status : "error",
            error
        })
      }
    }

    private async handleDeleteTodo(socket:Socket, data:{id:String}){
        try {
            const {id} = data
        const deleteTodo = await todoModel.findByIdAndDelete(id)
        if(!deleteTodo){
            socket.emit("todo_response", {
                status : "error",
                message : "Todo Not Found !"
            })
            return;
        }
        } catch (error) {
            socket.emit("todo_response", {
                status : "error",
                error
            })
        }
    }
}

export default new Todo()
