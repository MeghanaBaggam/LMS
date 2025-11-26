import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../Services/UserService";


export const fetchEmp=createAsyncThunk('employees/fetch',async ()=>{
    const response= await UserService.getAllUsers();
    return response.data;
});

const employeeSlice=createSlice({
    name:'employees',
    initialState:{list:[],loading:false,error:null},
    reducers:{
        addEmployee:(state,action)=>{
            state.list.push(action.payload);
        },
        updateEmployee:(state,action)=>{
           const index=state.list.findIndex(emp=>emp.id===action.payload.id);
           if(index!=-1){
            state.list[index]=action.payload;
           }
        },
        deleteEmployee:(state,action)=>{
            state.list=state.list.filter(emp=>emp.id!==action.payload);
        }
    },
    extraReducers:(builder)=>{
        builder
         .addCase(fetchEmp.pending,(state)=>{state.loading=true;})
         .addCase(fetchEmp.fulfilled,(state,action)=>{
            state.loading=false;
            state.list=action.payload;
         })
         .addCase(fetchEmp.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
         });
    }

});

export const {addEmployee,updateEmployee,deleteEmployee}=employeeSlice.actions;
export default employeeSlice.reducer;