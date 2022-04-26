import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`mb-8 color[#222] font-semibold text-2xl`};
  & > span:first-child {
    ${tw`mr-2 color[var(--color-primary)] inline-flex`};
    svg {
      ${tw`block h-4 w-4 fill-current`};
    }
  }

  & > span:last-child {
    ${tw`inline-flex`};

    h2 {
      ${tw`color[inherit] text-base font-weight[inherit] line-height[inherit] m-0 p-0`};
    }
  }
`;

export const BookingDetailReviewTitleCSS = {
  Container,
};
