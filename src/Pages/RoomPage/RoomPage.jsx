import { images } from '@Assets/Images';
import { ButtonScrollTop, SearchMap, SpinnerMap } from '@Components';
import { quanLyPhongChoThueAction } from '@Redux/Reducers/QuanLyPhongChoThueSlice';
import { quanLyViTriAction } from '@Redux/Reducers/QuanLyViTriSlice';
import { loadingSelector } from '@Redux/Selector/LoadingSelect';
import { quanLyPhongChoThueSelector } from '@Redux/Selector/QuanLyPhongChoThueSelector';
import { quanLyViTriSelector } from '@Redux/Selector/QuanLyViTriSelector';
import { quanLyPhongChoThueThunk } from '@Redux/Thunk/QuanLyPhongChoThueThunk';
import { quanLyViTriThunk } from '@Redux/Thunk/QuanLyViTriThunk';
import { geoCodeService } from '@Services/GeoCodeService';
import { localService } from '@Services/LocalStorageService';
import { Layout } from 'antd';
import _ from 'lodash';
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoomItem from './RoomItem';
import RoomMap from './RoomMap';
import { RoomCSS } from './RoomPage.styles';

function RoomPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [showSpinnerMap, setShowSpinnerMap] = useState(false);
  const [limitValue, setLimitValue] = useState({ minValue: 0, maxValue: 10 });
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [places, setPlaces] = useState([]);
  const danhSachPhongChoThueTheoViTriRef = useRef(null);
  const danhSachViTriByProvinceRef = useRef(null);
  const provincesRef = useRef(null);
  const dispatch = useDispatch();
  const { cityName } = useParams();

  const { calendar } = images;
  const numberEachPage = 10;
  const {
    Container,
    ContentSider,
    List,
    MainContent,
    Map,
    Pagination,
    Scarcity,
    ButtonCollapse,
    ButtonShowRoom,
  } = RoomCSS;

  const { setProvincesAction } = quanLyViTriAction;
  const {
    setResetDanhSachPhongChoThueTheoViTriAction,
    setResetBookingRoomAction,
    setResetTotalPriceBookingAction,
  } = quanLyPhongChoThueAction;

  const { getDanhSachPhongChoThueTheoViTriAsync } = quanLyPhongChoThueThunk;
  const { getDanhSachViTriAsync } = quanLyViTriThunk;

  const { selectDanhSachViTriByProvince, selectDanhSachProvince } = quanLyViTriSelector;
  const { selectDanhSachPhongChoThueTheoViTri } = quanLyPhongChoThueSelector;
  const { selectIsLoadingPopupState } = loadingSelector;

  const isLoadingPopup = useSelector(selectIsLoadingPopupState);
  const danhSachPhongChoThueTheoViTri = useSelector(selectDanhSachPhongChoThueTheoViTri, _.isEqual);
  const danhSachViTriByProvince = useSelector(selectDanhSachViTriByProvince, _.isEqual);
  const danhSachProvince = useSelector(selectDanhSachProvince, shallowEqual);

  const danhSachPhongChoThueTheoViTriSlice = useMemo(() => {
    const { maxValue, minValue } = limitValue;
    return danhSachPhongChoThueTheoViTri.slice(minValue, maxValue);
  }, [danhSachPhongChoThueTheoViTri, limitValue]);

  console.log({danhSachViTriByProvince})
  console.log({danhSachProvince})
  console.log({danhSachPhongChoThueTheoViTri})


  const handleToggle = () => setCollapsed(!collapsed);

  const handleChange = (value) => {
    setLimitValue({
      minValue: (value - 1) * numberEachPage,
      maxValue: value * numberEachPage,
    });
  };

  useLayoutEffect(() => window.scrollTo(0, 0));

  useLayoutEffect(() => {
    Promise.all([
      dispatch(getDanhSachViTriAsync()),
      dispatch(setProvincesAction([])),
      dispatch(setResetDanhSachPhongChoThueTheoViTriAction()),
      dispatch(setResetBookingRoomAction()),
      dispatch(setResetTotalPriceBookingAction()),
      localService.setCityName(cityName),
    ]);
    danhSachPhongChoThueTheoViTriRef.current = [];
    danhSachViTriByProvinceRef.current = [];
    provincesRef.current = [];
  }, [
    cityName,
    dispatch,
    getDanhSachViTriAsync,
    setProvincesAction,
    setResetBookingRoomAction,
    setResetDanhSachPhongChoThueTheoViTriAction,
    setResetTotalPriceBookingAction,
  ]);

  //Get coordinates of room address by google map api
  useEffect(() => {
    const { lng, lat } = coordinates;
    if ((!lng && !lat) || !danhSachPhongChoThueTheoViTri.length) return;
    if (_.isEqual(danhSachPhongChoThueTheoViTri, danhSachPhongChoThueTheoViTriRef.current)) return;
    danhSachPhongChoThueTheoViTriRef.current = danhSachPhongChoThueTheoViTri;
    async function getCoordinateOfEachRoom() {
      const promisesArr = danhSachPhongChoThueTheoViTri.map((phong) => {
        if (!phong.name) return null;
        return geoCodeService.getGeoCodeByAddress(phong.name);
      });
      const result = await Promise.all(promisesArr);
      setPlaces(result);
    }
    getCoordinateOfEachRoom();
  }, [coordinates, danhSachPhongChoThueTheoViTri, danhSachViTriByProvince.length]);

  useEffect(() => {
    const { lng, lat } = coordinates;
    if ((!lng && !lat) || !danhSachViTriByProvince.length) return;
    if (_.isEqual(danhSachViTriByProvince, danhSachViTriByProvinceRef.current)) return;
    danhSachViTriByProvinceRef.current = danhSachViTriByProvince;
    const idViTriArr = danhSachViTriByProvince.map((item) => item._id);
    const params = { idViTriArr, isLoading: false, isLoadingPopup: true };
    dispatch(getDanhSachPhongChoThueTheoViTriAsync(params));
  }, [coordinates, danhSachViTriByProvince, dispatch, getDanhSachPhongChoThueTheoViTriAsync]);

  useEffect(() => {
    const { lng, lat } = coordinates;
    if ((!lng && !lat) || !danhSachProvince.length) return;
    async function getProvinces() {
      const provinces = await geoCodeService.getGeoCodeByCoordinates(lng, lat, danhSachProvince);
      if (!_.isEqual(provincesRef.current, provinces)) {
        provincesRef.current = provinces;
        dispatch(setProvincesAction(provinces));
      }
    }
    getProvinces();
  }, [coordinates, dispatch, danhSachProvince, setProvincesAction]);

  useEffect(() => {
    geoCodeService.getGeoCodeByAddress(cityName).then((data) => {
      const lat = data[0].geometry.location.lat;
      const lng = data[0].geometry.location.lng;
      setCoordinates({ lat, lng });
    });
  }, [cityName]);

  useEffect(() => {
    if (isLoadingPopup) return setShowSpinnerMap(true);
    const waitingCloseLoadingPopup = setTimeout(() => {
      setShowSpinnerMap(false);
    }, 500);
    return () => clearTimeout(waitingCloseLoadingPopup);
  }, [isLoadingPopup]);

  const renderPhongChoThue = useMemo(() => {
    if (!danhSachPhongChoThueTheoViTri.length) return null;
    return (
      <>
        {danhSachPhongChoThueTheoViTriSlice.map((phong) => {
          return <RoomItem key={phong._id} phong={phong} showSpinnerMap={showSpinnerMap} />;
        })}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={numberEachPage}
          onChange={handleChange}
          total={danhSachPhongChoThueTheoViTri.length}
        />
      </>
    );
  }, [danhSachPhongChoThueTheoViTri.length, danhSachPhongChoThueTheoViTriSlice, showSpinnerMap]);

  return (
    <Container>
      <Layout>
        <ContentSider trigger={null} collapsible collapsed={collapsed}>
          <span>Hơn 300 chỗ ở tại khu vực trên bản đồ</span>

          <Scarcity>
            <img src={calendar} alt='Calendar' />
            <span>
              Hơn 95.000 khách đã ở tại Thành phố Hồ Chí Minh. Trung bình họ xếp hạng chỗ ở của mình
              ở mức 4.8/5 sao.
            </span>
          </Scarcity>
          <List>{renderPhongChoThue}</List>
        </ContentSider>
        <Map>
          <MainContent>
            {collapsed ? (
              <ButtonShowRoom onClick={handleToggle}>
                <IoIosArrowForward />
                <span>Show Room List</span>
              </ButtonShowRoom>
            ) : (
              <ButtonCollapse onClick={handleToggle}>
                <IoIosArrowBack />
              </ButtonCollapse>
            )}

            {showSpinnerMap ? <SpinnerMap /> : <SearchMap />}
            <RoomMap
              places={places}
              coordinates={coordinates}
              danhSachPhongChoThueTheoViTri={danhSachPhongChoThueTheoViTri}
              setCoordinates={setCoordinates}
            />
          </MainContent>
        </Map>
      </Layout>
      <ButtonScrollTop />
    </Container>
  );
}

export default RoomPage;
