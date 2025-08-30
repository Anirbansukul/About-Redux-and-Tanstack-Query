import {createSlice} from '@reduxjs/toolkit'
const initialState={
    todos:[]
}
const mySlice=createSlice({
    name:"MyTodo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
            state.todos.push(action.payload)
        },
        removeTodo:(state,action)=>{
            const {_id}=action.payload
            state.todos=state.todos.filter((item)=>item._id!==_id)
        },
        modifyTodo:(state,action)=>{
            const {_id,name}=action.payload
           let todo=state.todos.find((item)=>item._id===_id)
           if(todo){
            todo.name=name
           }
        },
    }
})
export const {addTodo,removeTodo,modifyTodo} =mySlice.actions
export default mySlice.reducer