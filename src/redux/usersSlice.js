import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const page1 = await axios.get("https://reqres.in/api/users?page=1");
    const page2 = await axios.get("https://reqres.in/api/users?page=2");
    return [...page1.data.data, ...page2.data.data];
  } catch (error) {
    toast.error("Failed to fetch users.");
    throw error;
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState: { users: [], status: "idle" },
  reducers: {
    updateUser: (state, action) => {
      const { id, first_name, last_name, email } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.first_name = first_name;
        user.last_name = last_name;
        user.email = email;
      }
      toast.success("User details updated successfully!");
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      toast.success("User deleted successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
