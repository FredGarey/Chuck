import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  entities: [],
  loading: false,
  currentJoke: null, 
  error: null, 
};


export const fetchJokes = createAsyncThunk('search/fetchJokes', async (query) => {
  const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  return response.data.result;
});

export const fetchJokeById = createAsyncThunk(
  'search/fetchJokeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.chucknorris.io/jokes/${id}`);
      console.log({response});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearCurrentJoke(state) {
      state.currentJoke = null;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload;
      })
      .addCase(fetchJokes.rejected, (state) => {
        state.loading = false;
      })
     
      .addCase(fetchJokeById.pending, (state) => {
        state.loading = true;
        state.currentJoke = null; 
      })
      .addCase(fetchJokeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJoke = action.payload;
      })
      .addCase(fetchJokeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch joke details."; 
      });
  },
});

export default searchSlice.reducer;