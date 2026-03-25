import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/teacherApi";
import type { Teacher, TeacherState, TeacherFormData } from "../../types/teacher";

const initialState: TeacherState = {
  teachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
  status: 'idle',
};


export const fetchTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async () => await api.getTeachers()
);

export const fetchTeacherById = createAsyncThunk(
  "teachers/fetchById",
  async (id: number) => await api.getTeacherById(id)
);

export const addTeacher = createAsyncThunk(
  "teachers/add",
  async (data: TeacherFormData) => await api.createTeacher(data)
);

export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async ({ id, data }: { id: number; data: TeacherFormData }) =>
    await api.updateTeacher(id, data)
);

export const deleteTeacher = createAsyncThunk(
  "teachers/delete",
  async (id: number) => await api.deleteTeacherApi(id)
);

const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.teachers = action.payload as Teacher[];
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message || "Failed to fetch teachers";
      })

      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.selectedTeacher = action.payload;
      })
      .addCase(fetchTeacherById.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch teacher details";
      })

      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(addTeacher.rejected, (state, action) => {
        state.error = action.error.message || "Failed to add teacher";
      })

      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.error = action.error.message || "Failed to update teacher";
      })

      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(
          (t) => t.id !== action.payload
        );
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.error = action.error.message || "Failed to delete teacher";
      });
  },
});

export default teacherSlice.reducer;