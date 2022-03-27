import AxiosClient from '@Utils/Http/AxiosClient';

export const quanLyPhongChoThueService = {
    layTatCaPhongChoThue(isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE;
        return AxiosClient.get(url, { headers: { isLoading } });
    },

    layPhongChoThueTheoID(id, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE + `/${id}`;
        return AxiosClient.get(url, { headers: { isLoading } });
    },

    taoPhongChoThue(phongChoThue, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE;
        return AxiosClient.post(url, phongChoThue, { headers: { isLoading } });
    },

    datPhongChoThue(datPhongChoThue, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE_DAT_PHONG;
        return AxiosClient.post(url, datPhongChoThue, { headers: { isLoading } });
    },

    capNhatHinhAnhPhongChoThue(id, formData, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE_CAP_NHAT_ANH + `/${id}`;
        return AxiosClient.put(url, formData, { headers: { isLoading } });
    },

    capNhatThongTinPhongChoThue(id, phongChoThue, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE + `/${id}`;
        return AxiosClient.put(url, phongChoThue, { headers: { isLoading } });
    },

    xoaPhongChoThue(id, isLoading = true) {
        const url = process.env.REACT_APP_LINK_QUAN_LY_PHONG_CHO_THUE + `/${id}`;
        return AxiosClient.delete(url, { headers: { isLoading } });
    }

}