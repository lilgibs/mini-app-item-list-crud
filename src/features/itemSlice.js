import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "items",
  initialState: JSON.parse(localStorage.getItem('items')) || [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload)
    },
  }
})

export const { addItem } = itemSlice.actions
export default itemSlice.reducer

export const addItemAndSave = (item) => (dispatch, getState) => {
  dispatch(addItem(item));
  const state = getState().items;
  localStorage.setItem('items', JSON.stringify(state));
};
