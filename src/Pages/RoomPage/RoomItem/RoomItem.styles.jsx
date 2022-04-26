import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`font-family[Circular] border-t-1 border-color[#ebebeb] py-6 flex`}
  .greyText {
    ${tw`text-sm color[var(--color-text-light)]`}
  }
  .separator {
    ${tw`w-8 h-[1px] background-color[var(--color-medium)]`}
  }
`;

const Rating = styled.div`
  ${tw`flex mt-auto`}
  img {
    ${tw`w-3.5 mr-1`}
  }
`;

const PriceNight = styled.div`
  ${tw`font-size[18px] font-bold `}
`;

const PriceTotal = styled.div`
  ${tw`text-sm color[var(--color-text-light)] underline mt-0.5`}
`;

const Price = styled.div`
  ${tw`text-right flex flex-col`}
`;

const Detail = styled.div`
  ${tw`flex justify-between mt-auto`}
`;

const Desc = styled.div`
  ${tw`pt-[15px]`};
  span {
    ${tw`block mb-1.5`}
  }
`;

const Title = styled.div`
  ${tw`flex justify-between text-justify font-semibold`}
  button {
    ${tw`w-8 h-8 bg-none outline-none relative flex items-center justify-center border-none p-0 cursor-pointer`}

    &:after {
      ${tw`opacity-0 background-color[var(--color-medium)] absolute w-12 h-12 border-radius[50%] content z-index[-1] transition-all duration-300`}
    }
    &:hover:after {
      ${tw`opacity-100`}
    }
  }
`;

const Content = styled.div`
  ${tw`w-[calc(100% - 300px)] pl-4 flex flex-col`}
`;

const Image = styled.div`
  ${tw`width[300px] height[200px] border-radius[10px] overflow-hidden relative`};

  ${Container}:hover & button {
    ${tw`opacity-70`};
  }

  &::before {
    ${tw`absolute content['SUPERHOST'] bg-white box-shadow[0px 2px 4px rgba(0, 0, 0, 0.18)] rounded py-1 px-2 top-2.5 left-2.5 letter-spacing[0.48px] text-xs  uppercase`};
  }
  button {
    ${tw`absolute top-1/2 w-8 h-8 bg-white border-radius[50%] overflow-hidden p-0 flex justify-center items-center border-none transition-all duration-300 cursor-pointer opacity-0`};
  }

  button:hover {
    ${tw`opacity-100`};
  }

  button img {
    ${tw`w-2.5 h-2.5`}
  }

  button:first-of-type {
    ${tw`left-2.5`}
  }

  button:last-of-type {
    ${tw`right-2.5`}
  }

  img {
    ${tw`object-cover w-full h-full`}
  }
`;

export const RoomItemCSS = {
  Image,
  Container,
  Content,
  Title,
  Desc,
  Detail,
  Price,
  PriceTotal,
  PriceNight,
  Rating,
};
