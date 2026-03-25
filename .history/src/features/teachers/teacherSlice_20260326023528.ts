.addCase(updateTeacher.fulfilled, (state, action) => {
  const index = state.teachers.findIndex(
    (t) => t.id === action.payload.id
  );

  if (index !== -1) {
    state.teachers[index] = action.payload;
  }
});