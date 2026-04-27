'use client'
import axios from "axios";

import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { StatusFilters } from "./filterSlice";
import { logout } from "./userSlice";
import type { RootState } from "./store";

interface Todo {
  _id: string ;
  userId: string;
  title: string;
  subContent:string;
  completed: boolean;
  color?: string;
  deadline?: string | undefined ;
  [key: string]: unknown; // For any additional properties from MongoDB
}

interface TodoState {
  status: 'idle' | 'loading' | 'success' | 'error';
  toggleStatus: 'idle' | 'loading' | 'error';
  error: unknown;
}
interface AddTodoPayload {
  user: string;
  title: string;
  deadline?: string | undefined ;

}

interface SetColorPayload {
  id: string;
  color: string;
}

export const fetchTodo = createAsyncThunk<Todo[], string>("todos/fetchtodo", async (id) => {
  const response = await axios.get<Todo[]>(`http://localhost:5000/get-todos?userId=${id}`)
  return response.data
})
export const addTodo = createAsyncThunk<Todo, AddTodoPayload>("todos/addtodo", async (todo) => {
  
  const response = await axios.post<Todo>('http://localhost:5000/todo-add', {
    ...todo, completed: false
  })
  return response.data
})

export const toggleTodo = createAsyncThunk<Todo, string>("todos/toggleTodo", async (id) => {
  const response = await axios.patch<Todo>(`http://localhost:5000/todo-toggle/${id}`);
  return response.data;
});
export const deleteTodo = createAsyncThunk<{ deletedTodoId: string }, string>("todos/deleteTodo", async (id) => {
  const response = await axios.delete<{ deletedTodoId: string }>(`http://localhost:5000/todo-delete/${id}`);
  return response.data;
});
export const setTodoColor = createAsyncThunk<Todo, SetColorPayload>("todos/ChangeColor", async ({id,color}) => {
  // console.log(id,color);
  
  const response = await axios.patch<Todo>(`http://localhost:5000/todo-change-color/${id}`,{color});
  return response.data;
});




const todoAdapter = createEntityAdapter({ selectId: (todo: Todo) => todo._id, sortComparer: (a: Todo, b: Todo) => b._id.localeCompare(a._id) })


export const {
  selectById: selectTodoById,
  selectIds: selectTodoIds
} = todoAdapter.getSelectors<RootState>(state => state.todos)
const initialState = todoAdapter.getInitialState<TodoState>({

  status: 'idle',
  toggleStatus: 'idle',
  error: null
})

const todoSlice = createSlice({
  name: "todos", initialState, reducers: {
  }, extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        todoAdapter.upsertMany(state, action.payload);
        state.status = 'success';
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = 'success';
   
        todoAdapter.addOne(state, action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(toggleTodo.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
  
        todoAdapter.updateOne(state, {
          id: action.payload._id, 
          changes: {
            completed: action.payload.completed
          }
        });
      })
      .addCase(toggleTodo.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(setTodoColor.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(setTodoColor.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        console.log(action.payload);
        
        todoAdapter.updateOne(state, {
          id: action.payload._id, 
          changes: {
            color: action.payload.color
          }
        });
      })
      .addCase(setTodoColor.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.toggleStatus = 'loading';
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.toggleStatus = 'idle';
        
        todoAdapter.removeOne(state,action.payload.deletedTodoId);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.toggleStatus = 'error';
        state.error = action.payload;
      })
      .addCase(logout, () => initialState);
  }
}
)

export default todoSlice.reducer



const selectTodoEntities = (state: RootState) => state.todos.entities;

export const selectTodos = createSelector(
    selectTodoEntities,
   (todoEntities) => Object.values(todoEntities).filter(Boolean) as Todo[]
)

const selectFilteredTodos = createSelector([selectTodos, (state: RootState) => state.filter],
    (todos: Todo[], filters) => {
       
        const { filterStatus } = filters
        const showAll = filterStatus === StatusFilters.All
        if (showAll) {
            return todos  // Return all todos when no filters are applied
        }

        const showCompleted = filterStatus === StatusFilters.Completed
        return todos.filter(todo => {
            const statusMatches = showAll || (showCompleted && todo.completed) || (!showCompleted && !todo.completed)
         
            return statusMatches
        })
    }

)

export const selectSortedFilteredTodos = createSelector(
  selectFilteredTodos,
  (todos:Todo[]) =>
    todos
      .slice()
      .sort((a:Todo, b:Todo) => {
        // Handle missing deadlines (put at end)
        if (!a.deadline) return -1;
        if (!b.deadline) return -1;
        const aTime = new Date(a.deadline).getTime();
        const bTime = new Date(b.deadline).getTime();


        return aTime - bTime; 
      })
);
export const sortedFilteredTodoIds = createSelector(
  selectSortedFilteredTodos,
  (todos) => todos.map(todo => todo._id)
);