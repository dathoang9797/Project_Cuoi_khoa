import React from 'react';
import { FooterStyle } from '@Layouts/Footer/Footer.styles';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

function Footer() {
  return (
    <FooterStyle.FooterContainer>
      <FooterStyle.FooterTop>
        <FooterStyle.FooterMenuItem>
          <div>
            <h1>Hỗ trợ</h1>
          </div>

          <ul>
            <li>
              <a href='#!'>Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href='#!'>Thông tin an toàn</a>
            </li>
            <li>
              <a href='#!'>Các tùy chọn hủy</a>
            </li>
            <li>
              <a href='#!'>Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</a>
            </li>
            <li>
              <a href='#!'>Hỗ trợ người khuyết tật</a>
            </li>
            <li>
              <a href='#!'>Báo cáo lo ngại của hàng xóm</a>
            </li>
          </ul>
        </FooterStyle.FooterMenuItem>
        <FooterStyle.FooterMenuItem>
          <div>
            <h1>Cộng đồng</h1>
          </div>
          <ul>
            <li>
              <a href='#!'>Airbnb.org: nhà ở cứu trợ</a>
            </li>
            <li>
              <a href='#!'>Hỗ trợ dân tị nạn Afghanistan</a>
            </li>
            <li>
              <a href='#!'>Chống phân biệt đối xử</a>
            </li>
          </ul>
        </FooterStyle.FooterMenuItem>
        <FooterStyle.FooterMenuItem>
          <div>
            <h1>Đón tiếp khách</h1>
          </div>

          <ul>
            <li>
              <a href='#!'>Thử đón tiếp khách</a>
            </li>
            <li>
              <a href='#!'>AirCover: bảo vệ cho Host</a>
            </li>
            <li>
              <a href='#!'>Xem tài nguyên đón tiếp khách</a>
            </li>
            <li>
              <a href='#!'>Truy cập diễn đàn cộng đồng</a>
            </li>
            <li>
              <a href='#!'>Đón tiếp khách có trách nhiệm</a>
            </li>
          </ul>
        </FooterStyle.FooterMenuItem>
        <FooterStyle.FooterMenuItem>
          <div>
            <h1>Giới thiệu</h1>
          </div>
          <ul>
            <li>
              <a href='#!'>Trang tin tức</a>
            </li>
            <li>
              <a href='#!'>Tìm hiểu các tính năng mới</a>
            </li>
            <li>
              <a href='#!'>Thư ngỏ từ các nhà sáng lập</a>
            </li>
            <li>
              <a href='#!'>Cơ hội nghề nghiệp</a>
            </li>
            <li>
              <a href='#!'>Nhà đầu tư</a>
            </li>
            <li>
              <a href='#!'>Airbnb Luxe</a>
            </li>
          </ul>
        </FooterStyle.FooterMenuItem>
      </FooterStyle.FooterTop>
      <FooterStyle.FooterBottom>
        <FooterStyle.FooterCopyRight>
          <span>© 2021 Copyright</span>
          <div>
            <a href='/terms/privacy_policy'>Quyền riêng tư</a>
            <a href='/terms'>Điều khoản</a>
            <a href='/sitemaps/v2'>Sơ đồ trang web</a>
          </div>
        </FooterStyle.FooterCopyRight>
        <FooterStyle.FooterSocial>
          <a href='/terms/privacy_policy'>Tiếng Việt (VN)</a>
          <a href='/terms'>USD</a>
          <a href='/sitemaps/v2'>
            <FacebookOutlined />
          </a>
          <a href='/sitemaps/v2'>
            <TwitterOutlined />
          </a>
          <a href='/sitemaps/v2'>
            <InstagramOutlined />
          </a>
        </FooterStyle.FooterSocial>
      </FooterStyle.FooterBottom>
    </FooterStyle.FooterContainer>
  );
}

export default Footer;