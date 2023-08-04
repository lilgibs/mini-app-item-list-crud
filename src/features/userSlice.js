import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    name: null,
  },
  reducers: {
    setUser: (state, action) => action.payload,
    resetUser: () => {
      localStorage.removeItem("user_token");
      return { 
        id: null,
        name: null,
      };
    },
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer

export function loginUser(data) {
  return async (dispatch) => {
    try {
      let response = await axios.post(
        `https://api-mini-app-item-list-crud.vercel.app/login`,
        data
      );
      if (response) {
        dispatch(setUser(response.data.data));
        localStorage.setItem("user_token", response.data.accessToken);
      }
    } catch (error) {
      throw error
    }
  };
}

export function checkLoginUser(token) {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `https://api-mini-app-item-list-crud.vercel.app/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      if (response) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log(error)
      localStorage.removeItem("user_token");
    }
  };
}
