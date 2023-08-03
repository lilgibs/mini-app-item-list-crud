import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "items",
  initialState: JSON.parse(localStorage.getItem('items')) || [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
    setItem: (state, action) => {
      return [...action.payload]
    },
  }
})

export const { addItem, setItem } = itemSlice.actions
export default itemSlice.reducer

export const addItemAndSave = (item) => (dispatch, getState) => {
  dispatch(addItem(item));
  const state = getState().items;
  localStorage.setItem('items', JSON.stringify(state));
};

export const editItemAndSave = (item) => (dispatch, getState) => {
  console.log(item)
  dispatch(setItem(item))
  localStorage.setItem('items', JSON.stringify(item));
};
