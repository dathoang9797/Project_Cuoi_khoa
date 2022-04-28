import { TableCSS } from '@Components';
import TabActionsAdmin from '@Layouts/Admin/TabActionsAdmin';
import { quanLyViTriSelector } from '@Redux/Selector/QuanLyViTriSelector';
import { quanLyViTriThunk } from '@Redux/Thunk/QuanLyViTriThunk';
import { nanoid } from '@reduxjs/toolkit';
import { locationField } from '@Shared/Field/LocationField';
import { handleDataTable } from '@Utils/Common';
import { history } from '@Utils/Libs';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationManagerAdd from './LocationManagerAdd';
import ModalHoc from '@HOC/ModalHoc';

function LocationManagerPage(props) {
  const dispatch = useDispatch();
  const { selectDanhViTriFilter } = quanLyViTriSelector;
  const { getDanhSachViTriAsync, getChiTietViTriAsync, xoaNhieuViTrigAsync, xoaViTriAsync } =
    quanLyViTriThunk;
  const { tableColumnsLocationField } = locationField;
  const danhSachViTri = useSelector(selectDanhViTriFilter, _.isEqual);
  const idTable = useMemo(() => nanoid(), []);
  const urlLocationEdit = process.env.REACT_APP_LINK_ADMIN_LOCATIONS_MANAGER_EDIT;
  const urlLocationProfile = process.env.REACT_APP_LINK_ADMIN_LOCATIONS_MANAGER_PROFILE;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { Table } = TableCSS;
  const { showModal, handleContentModal } = props;

  useEffect(() => {
    dispatch(getDanhSachViTriAsync());
  }, [dispatch, getDanhSachViTriAsync]);

  const handleGetDetailLocation = async (idLocation) => {
    await dispatch(getChiTietViTriAsync(idLocation));
    history.push(urlLocationEdit);
  };

  const handleGetProfileLocation = async (idNguoiDung) => {
    await dispatch(getChiTietViTriAsync(idNguoiDung));
    history.push(urlLocationProfile);
  };

  const handleDeleteLocation = async (idRoom) => {
    dispatch(xoaViTriAsync(idRoom));
  };

  const renderDataTable = () => {
    const propsFieldAction = {
      handleGetProfileItem: handleGetProfileLocation,
      handleUpdateItem: handleGetDetailLocation,
      handleDeleteItem: handleDeleteLocation,
    };
    return handleDataTable(danhSachViTri, propsFieldAction);
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleShowModal = () => {
    handleContentModal(LocationManagerAdd);
    showModal();
  };

  return (
    <>
      <TabActionsAdmin
        setSelectedRowKeys={setSelectedRowKeys}
        handleDeleteAllThunk={xoaNhieuViTrigAsync}
        handleRefreshDataThunk={getDanhSachViTriAsync}
        selectedRowKeys={selectedRowKeys}
        contentButtonAction='Thêm Vị Trí'
        showModal={handleShowModal}
      />

      <Table
        columns={tableColumnsLocationField}
        dataSource={renderDataTable()}
        rowKey={(record) => record._id}
        key={idTable}
        rowSelection={rowSelection}
      />
    </>
  );
}

export default ModalHoc(LocationManagerPage);
