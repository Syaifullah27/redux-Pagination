// src/redux/slices.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    status: 'idle',
    currentPage: 1,
    totalPages: 0,
};

// Fetch data thunk
export const fetchData = createAsyncThunk('data/fetchData', async (page) => {
    const config = {
        headers: {
            access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGJjci5pbyIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY2NTI0MjUwOX0.ZTx8L1MqJ4Az8KzoeYU2S614EQPnqk6Owv03PUSnkzc'
        }
    };
        const response = await axios.get(`https://api-car-rental.binaracademy.org/admin/v2/car?page=${page}&pageSize=9`, config);
        console.log(response.data);
        return response.data;
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.totalPages = action.payload.pageCount;
            })
            .addCase(fetchData.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const { setPage } = dataSlice.actions;

export default dataSlice.reducer;
