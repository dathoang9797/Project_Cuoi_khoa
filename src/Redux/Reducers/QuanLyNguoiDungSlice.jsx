import { quanLyNguoiDungThunk } from '@Redux/Thunk/QuanLyNguoiDungThunk';
import { createSlice } from '@reduxjs/toolkit';
import { showError } from '@/Utils/Common';

const {
  setUserInfoAsync,
  setRegisterUserInfoAsync,
  getDanhSachNguoiDungAsync,
  xoaNguoiDungAsync,
  capNhatNguoiDungAsync,
  getChiTietNguoiDungAsync,
  capNhatAnhDaiDienAsync,
  taoNguoiDungAsync,
  xoaNhieuNguoiDungAsync,
} = quanLyNguoiDungThunk;

const initialState = {
  userInfo: {},
  danhSachNguoiDung: [],
  chiTietNguoiDung: {},
};

const quanLyNguoiDungSlice = createSlice({
  name: 'quanLyNguoiDungReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserInfoAsync.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
    builder.addCase(setUserInfoAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(setRegisterUserInfoAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });

    builder.addCase(getDanhSachNguoiDungAsync.fulfilled, (state, action) => {
      state.danhSachNguoiDung = action.payload;
    });
    builder.addCase(getDanhSachNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(xoaNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(xoaNhieuNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(capNhatAnhDaiDienAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(taoNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(getChiTietNguoiDungAsync.fulfilled, (state, action) => {
      state.chiTietNguoiDung = action.payload;
    });
    builder.addCase(getChiTietNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
    builder.addCase(capNhatNguoiDungAsync.rejected, (state, action) => {
      if (action.payload) {
        showError(action.payload);
      } else {
        showError(action.error.message);
      }
    });
  },
});
const { setSearchValue } = quanLyNguoiDungSlice.actions;

export const quanLyNguoiDungAction = { setSearchValue };

export default quanLyNguoiDungSlice.reducer;
