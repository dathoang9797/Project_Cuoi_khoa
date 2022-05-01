import { createAsyncThunk } from '@reduxjs/toolkit';
import { localService } from '@Services/LocalStorageService';
import { quanLyPhongChoThueService } from '@Services/QuanLyPhongChoThueService';
import { messageApp, showSuccess, capitalize } from '@Utils/Common';
import { sweetAlert } from '@Utils/Libs';
import { history } from '@Utils/Libs';
import _ from 'lodash';

const {
  messageNetWorkErr,
  messageRegisterSucceed,
  messageIdIsUnValid,
  messageNameRoomIsExits,
  messageUpdateFailed,
  messageUpdateSuccess,
  messageFailBooking,
  messageDeleteRoomSuccess,
} = messageApp;

const { sweetAlertDelete, sweetAlertSuccess } = sweetAlert;

const getDanhSachPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/getDanhSachPhongChoThueAsync',
  async (_, { rejectWithValue, getState }) => {
    const result = await quanLyPhongChoThueService.layTatCaPhongChoThue();

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

const getDanhSachPhongChoThueTheoViTriAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/getDanhSachPhongChoThueTheoViTriAsync',
  async ({ idViTriArr, isLoading, isLoadingPopup }, { rejectWithValue }) => {
    console.log({idViTriArr})
    const promiseArr = idViTriArr.map((idViTri) =>
      quanLyPhongChoThueService.layPhongChoThueTheoViTri(idViTri, isLoading, isLoadingPopup)
    );
    const result = await Promise.all(promiseArr);
    console.log({ result });
    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if ('kind' in result && result.kind === 'ObjectId') {
      return rejectWithValue(messageIdIsUnValid);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    return result.flat();
  }
);

const capNhatHinhAnhPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/capNhatHinhAnhPhongChoThueAsync',
  async ({ idRoom, formData }, { rejectWithValue, dispatch, getState }) => {
    const result = await quanLyPhongChoThueService.capNhatHinhAnhPhongChoThue(
      idRoom,
      formData,
      false
    );
    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if (typeof result === 'string') {
      return rejectWithValue(result);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }
  }
);

const xoaNhieuPhongAsync = createAsyncThunk(
  'quanLyNguoiDungReducer/xoaNhieuPhongAsync',
  async (idNguoiDungArr, { rejectWithValue, dispatch, getState }) => {
    const confirmResult = await sweetAlertDelete();
    if (confirmResult.isConfirmed) {
      const promiseArr = idNguoiDungArr.map((idNguoiDung) =>
        quanLyPhongChoThueService.xoaPhongChoThue(idNguoiDung)
      );
      const result = await Promise.all(promiseArr);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachPhongChoThueAsync());
      sweetAlertSuccess(messageDeleteRoomSuccess);
    }
  }
);

const xoaPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/xoaPhongChoThueAsync',
  async (idRoom, { rejectWithValue, dispatch, getState }) => {
    const confirmResult = await sweetAlertDelete();
    if (confirmResult.isConfirmed) {
      const result = await quanLyPhongChoThueService.xoaPhongChoThue(idRoom);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachPhongChoThueAsync());
      sweetAlertSuccess(messageDeleteRoomSuccess);
    }
  }
);

const taoPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/taoPhongChoThueAsync',
  async (phongChoThue, { rejectWithValue, dispatch, getState }) => {
    const state = getState();
    const danhSachPhongChoThue = state.QuanLyPhongChoThueReducer.danhSachPhongChoThue;
    const { name } = phongChoThue;

    if (danhSachPhongChoThue.filter((item) => item.name === name).length === 0) {
      const result = await quanLyPhongChoThueService.taoPhongChoThue(phongChoThue);

      if (!result) {
        return rejectWithValue(messageNetWorkErr);
      }

      if ('message' in result) {
        return rejectWithValue(capitalize(result.message));
      }

      await dispatch(getDanhSachPhongChoThueAsync());
      showSuccess(messageRegisterSucceed);
      return;
    }
    return rejectWithValue(messageNameRoomIsExits);
  }
);

const getChiTietPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/getChiTietPhongChoThueAsync',
  async (idPhongChoThue, { rejectWithValue }) => {
    const result = await quanLyPhongChoThueService.layPhongChoThueTheoID(idPhongChoThue);

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if ('message' in result) {
      return rejectWithValue(capitalize(result.message));
    }

    return result;
  }
);

const capNhatPhongChoThueAsync = createAsyncThunk(
  'quanLyNguoiDungReducer/capNhatPhongChoThueAsync',
  async ({ idRoom, noiDungCapNhat }, { rejectWithValue, dispatch }) => {
    const result = await quanLyPhongChoThueService.capNhatThongTinPhongChoThue(
      idRoom,
      noiDungCapNhat
    );

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

const datPhongPhongChoThueAsync = createAsyncThunk(
  'quanLyPhongChoThueReducer/datPhongPhongChoThueAsync',
  async (dateBooking, { rejectWithValue, dispatch }) => {
    const result = await quanLyPhongChoThueService.datPhongChoThue(dateBooking);

    if (!result) {
      return rejectWithValue(messageNetWorkErr);
    }

    if (_.isEmpty(result)) {
      return rejectWithValue(messageFailBooking);
    }

    if ('message' in result && !('userDetail' in result)) {
      return rejectWithValue(capitalize(result.message));
    }

    const userInfo = localService.getUserInfo();
    const updateUserInfo = { ...userInfo, ...result.userDetail };
    localService.setUserInfo(updateUserInfo);
    showSuccess(capitalize(capitalize(result.message)));
    history.goBack()
  }
);

export const quanLyPhongChoThueThunk = {
  getDanhSachPhongChoThueAsync,
  getDanhSachPhongChoThueTheoViTriAsync,
  xoaPhongChoThueAsync,
  taoPhongChoThueAsync,
  capNhatHinhAnhPhongChoThueAsync,
  xoaNhieuPhongAsync,
  getChiTietPhongChoThueAsync,
  capNhatPhongChoThueAsync,
  datPhongPhongChoThueAsync,
};
