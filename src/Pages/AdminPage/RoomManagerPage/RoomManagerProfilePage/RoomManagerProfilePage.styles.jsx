import tw, { styled, css } from 'twin.macro';
import { Image as ImageAnt, Rate as RateAnt } from 'antd';
import { AiOutlineMessage } from 'react-icons/ai';
import { MdFacebook } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';

const CSSIcon = css`
  ${tw`text-2xl`}
`;

const MessageIconCSS = styled(AiOutlineMessage)`
  ${CSSIcon}
`;

const FacebookIconCSS = styled(MdFacebook)`
  ${CSSIcon}
`;

const TwitterIconCSS = styled(FaTwitter)`
  ${CSSIcon}
`;

const ContainerCSS = styled.section`
  ${tw`text-gray-600 bg-gray-100  overflow-hidden container  py-24 mx-auto h-full lg:pl-1.5`};
`;

const ContentCSS = styled.div`
  ${tw` mx-auto flex flex-wrap justify-center items-center`};

  .ant-image-mask {
    ${tw`rounded-lg`};
  }

  .ant-image {
    ${tw`h-full flex-grow`};
  }

  @media only screen and (max-width: 1200px) {
    .ant-image {
      ${tw`h-[400px] w-1/2`};
    }
  }
`;

const ImageCSS = styled(ImageAnt)`
  ${tw` w-full  h-full object-cover object-center rounded-lg`};
`;

const ProfileCSS = styled.div`
  ${tw`lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0`};
`;

const TitleCSS = styled.h1`
  ${tw`text-white text-3xl  font-medium mb-1 color[var(--color-primary)]`};
`;

const RateCSS = styled(RateAnt)`
  &.ant-rate,
  & > span {
    ${tw`ml-3`};
  }

  li.ant-rate-star-full {
    ${tw`color[var(--color-primary)]`};
  }

  li.ant-rate-star-zero .ant-rate-star-first,
  li.ant-rate-star-zero .ant-rate-star-second {
    ${tw`text-gray-400`};
  }
`;
const DescCSS = styled.p`
  ${tw`leading-relaxed text-justify`};
`;

const SocialCSS = styled.div`
  ${tw`flex mb-4 lg:mb-2`};

  & > span:first-child {
    ${tw`flex items-center`};
  }

  & > span:last-child {
    ${tw`flex ml-3 pl-3 py-2 lg:py-1 border-l-2 border-gray-800 text-gray-500 space-x-2`};
  }

  & > span:last-child > a:hover {
    ${tw`color[var(--color-primary)]`};
  }
`;

const ServiceCSS = styled.div`
  & > div:not(:last-child) {
    ${tw`flex  justify-start items-center flex-wrap my-2 lg:inline-block `};
    div {
      ${tw`lg:inline-block mr-2`};
      span {
        ${tw`mr-0.5 mb-1 text-base  lg:text-xl flex items-center justify-start`};
        &:last-child {
          ${tw`mr-0`};
        }
        & > span {
          ${tw`lg:text-sm`};
        }
      }
    }
  }

  & > span {
    ${tw`text-gray-600 text-sm font-medium mr-1.5`};
  }
`;

export const RoomManagerProfileCSS = {
  ContainerCSS,
  ContentCSS,
  ImageCSS,
  ProfileCSS,
  TitleCSS,
  RateCSS,
  DescCSS,
  SocialCSS,
  ServiceCSS,
  MessageIconCSS,
  FacebookIconCSS,
  TwitterIconCSS,
};