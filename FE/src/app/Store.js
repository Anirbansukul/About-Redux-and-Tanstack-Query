import { configureStore } from '@reduxjs/toolkit'
import todoReducers from '../slice/Redu'

const Store = configureStore({
  reducer: {
    todo: todoReducers
  }
})

export default Store
