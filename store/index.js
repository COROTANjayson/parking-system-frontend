import { configureStore } from "@reduxjs/toolkit";
import parkReducer from './reducers/park.js'
// import 
export const store =  configureStore({
    reducer: {
        parking: parkReducer,
    }
})