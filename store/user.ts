import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { AppState } from '.';
import UserService, { User } from '../services/userService';
import { USER } from '../data/userData';

const initState:User = {
    count:0,
    image:'',
    name:'',
    status:'online',
    id:'',
};

export const { actions, ...userSlice } = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    getUser(
      state,
      { payload }: PayloadAction<User>,
    ) {      
      return {...state,...payload}
    }
  },
})

const getUser = (id:string)
  :ThunkAction<void, AppState, unknown, Action<string>> => 
  async (dispatch) => {
    const data = await UserService.getUser(id)
    data && dispatch(actions.getUser(data))
  }

export const userActions = {
  getUser
}