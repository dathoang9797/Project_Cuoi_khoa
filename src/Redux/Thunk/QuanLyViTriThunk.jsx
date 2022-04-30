import { createAsyncThunk } from '@reduxjs/toolkit';
import { quanLyViTriService } from '@Services/QuanLyViTriService';
import { messageApp, showSuccess } from '@Utils/Common';
import { history, sweetAlert } from '@Utils/Libs';
import _ from 'lodash';
import { capitalize } from '@Utils/Common';

const {
  messageNetWorkErr,
  messageRegisterSucceed,
  messageIdIsUnValid,
  messageNameRoomIsExits,
  messageUpdateFailed,
  messageUpdateSuccess,
  messageLocationRoomSuccess,
} = messageApp;

const { sweetAlertDelete, sweetAlertSuccess } = sweetAlert;

const getDanhSachViTriAsync = createAsyncThunk(
  'quanLyViTriReducer/getDanhSachViTriAsync',
  async (_, { rejectWithValue }) => {
    const result = await quanLyViTriService.layTatCaViTri();

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if ('kind' in result && result.kind === 'ObjectId') {
      return rejectWithValue(messageIdIsUnValid);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    return result;
  }
);

const getViTriTheoTenThanhPhoAsync = createAsyncThunk(
  'quanLyViTriReducer/getViTriTheoTenThanhPhoAsync',
  async (location, { rejectWithValue }) => {
    const result = await quanLyViTriService.layViTriTheoTenThanhPho(location);

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if ('kind' in result && result.kind === 'ObjectId') {
      return rejectWithValue(messageIdIsUnValid);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    return result;
  }
);

const getChiTietViTriAsync = createAsyncThunk(
  'quanLyViTriReducer/getChiTietViTriAsync',
  async (idViTri, { rejectWithValue }) => {
    const result = await quanLyViTriService.layViTriTheoID(idViTri);

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    return result;
  }
);

const taoviTriAsync = createAsyncThunk(
  'quanLyviTriReducer/taoviTriAsync',
  async (viTri, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const danhSachViTri = state.QuanLyViTriReducer.danhSachViTri;
    const { name } = viTri;

    if (danhSachViTri.filter((item) => item.name === name).length === 0) {
      const result = await quanLyViTriService.taoViTri(viTri);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachViTriAsync());
      showSuccess(messageRegisterSucceed);
      return;
    }
    return rejectWithValue(messageNameRoomIsExits);
  }
);

const xoaNhieuViTrigAsync = createAsyncThunk(
  'quanLyNguoiDungReducer/xoaNhieuPhongAsync',
  async (idNguoiDungArr, { rejectWithValue, dispatch, getState }) => {
    const confirmResult = await sweetAlertDelete();
    if (confirmResult.isConfirmed) {
      const promiseArr = idNguoiDungArr.map((idNguoiDung) =>
        quanLyViTriService.xoaviTri(idNguoiDung)
      );
      const result = await Promise.all(promiseArr);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachViTriAsync());
      sweetAlertSuccess(messageLocationRoomSuccess);
    }
  }
);

const xoaViTriAsync = createAsyncThunk(
  'quanLyViTriReducer/xoaViTriAsync',
  async (idLocation, { rejectWithValue, dispatch, getState }) => {
    const confirmResult = await sweetAlertDelete();
    if (confirmResult.isConfirmed) {
      const result = await quanLyViTriService.xoaViTri(idLocation);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachViTriAsync());
      sweetAlertSuccess(messageLocationRoomSuccess);
    }
  }
);

const capNhatViTriAsync = createAsyncThunk(
  'quanLyViTriReducer/capNhatViTriAsync',
  async ({ idLocation, noiDungCapNhat }, { rejectWithValue, dispatch }) => {
    const result = await quanLyViTriService.capNhatThongTinViTri(idLocation, noiDungCapNhat);

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if (_.isEmpty(result)) {
      return rejectWithValue(messageUpdateFailed);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    showSuccess(messageUpdateSuccess);
    history.goBack();
  }
);

export const quanLyViTriThunk = {
  getDanhSachViTriAsync,
  getViTriTheoTenThanhPhoAsync,
  getChiTietViTriAsync,
  xoaViTriAsync,
  xoaNhieuViTrigAsync,
  taoviTriAsync,
  capNhatViTriAsync,
};
