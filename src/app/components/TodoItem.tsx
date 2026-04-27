// import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, selectTodoById, setTodoColor, toggleTodo } from "../todoSlice";
import { useEffect, useState } from "react";
import formatDeadline, { timeDistance } from "../composables/formatDeadline";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
const colors = {
  white: "#ffffff",
  blue: "#99b1ff",
  green: "#99ffa7",
  yellow: "#fffa99",
  red: "#ff9999",
  prime: "#dd99ff"
}
function TodoItem({ todoId }:{  todoId: string;}) {
  const todo = useAppSelector(state => selectTodoById(state, todoId))
  const [check, setCheck] = useState<boolean>(todo.completed)
  const [color, setColor] = useState("#fff")
  const dispatch = useAppDispatch()
  let toggleStatus = useAppSelector(state => state.todos.toggleStatus)
  const [now, setNow] = useState(new Date());



   if (!todo) {
    return null;
  }


  const colorOptions = Object.keys(colors).map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ))



  const handleChangeColor = (color:string) => {
   
    dispatch(setTodoColor({id:todo._id,color}))
    setColor(color)
  }

  const handleCheck = () => {
    if (toggleStatus == "idle") {

      setCheck(prevState => !prevState)
      dispatch(toggleTodo(todo._id))
    }
  }
  const handleDelete = () => {
    if (toggleStatus == "idle") {

      dispatch(deleteTodo(todo._id))
    }
  }


useEffect(() => {
  const interval = setInterval(() => {
    setNow(new Date());
  }, 60000); // updates every minute
  return () => clearInterval(interval);
}, []);



  return (
    <div style={{ backgroundColor: colors[todo.color] }} className="bg-white rounded-xl shadow-lg p-4 flex items-center group opacity-70">
      <input type="checkbox" style={{accentColor :  colors[todo.color]}} checked={check} disabled={toggleStatus == "idle" ? false : true}  onChange={handleCheck} className="w-5 h-5 text-primary rounded border-gray-300 focus:ring-primary mr-3" />
      <div className="flex-1">
        <h3 className={check ? "line-through" : ""}>
          <span className="font-medium text-dark">
            {todo.title}

          </span>
        </h3>
        <p style={{overflowWrap:"anywhere"}} className="text-sm  text-gray-500">{todo.subContent}</p>
        {todo.deadline?<p style={{overflowWrap:"anywhere"}} className="text-xs pt-3 text-gray-700"><span className="font-bold">deadline : </span> {formatDeadline(todo.deadline)} {timeDistance(todo.deadline)<0?<span className="text-red-600" >expired</span>:""} </p>:""}
        
      </div>
      <div className="flex row">
        <select value={todo.color} onChange={(e) => handleChangeColor(e.target.value)} className="ring-0 p-2 mx-4" name="" id="">
          {colorOptions}
        </select>
        <button onClick={handleDelete} className="md:text-gray-400 text-accent md:hover:text-accent md:opacity-0 md:group-hover:opacity-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

  );
}

export default TodoItem;