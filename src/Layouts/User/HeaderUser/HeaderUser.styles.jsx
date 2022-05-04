import tw, { styled, css } from 'twin.macro';

const NavStyleCommon = css`
  ${tw`bg-transparent border-none flex justify-center items-center py-2.5 px-4 cursor-pointer text-decoration[none] h-12 text-[#222] border-radius[22px] transition-all duration-300`}
`;

const NavA = styled.a`
  ${NavStyleCommon};
  &:hover {
    background-color: var(--color-medium);
    color: var(--color-primary);
  }
`;

const NavButton = styled.button`
  ${NavStyleCommon};
  &.header__nav__button-language:hover {
    background-color: var(--color-medium);
  }

  &.header__nav__button-language img:first-child {
    ${tw`w-4 h-4`}
  }
  &.header__nav__button-language img:last-child {
    ${tw`w-[9px] h-1.5 ml-1.5`}
  }

  &.header__nav__button-account {
    ${tw`h-[42px] p-[5px 5px 5px 12px]`}
    border: 1px solid var(--color-medium);
    border-radius: 22px;
    transition: box-shadow 0.2s ease;
  }
  &.header__nav__button-account:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  }
  &.header__nav__button-account img:first-child {
    ${tw`w-4 h-4`}
  }
  &.header__nav__button-account img:last-child {
    ${tw`w-[30px] h-[30px] ml-3`}
  }
`;

const SearchIcon = styled.div`
  ${tw`w-8 h-8 flex items-center  justify-center ml-4`}
  background-color: var(--color-primary);
  border-radius: 50%;
  img {
    ${tw`w-3 h-3`}
  }
`;

const Search = styled.div`
  ${tw`flex rounded-3xl overflow-hidden items-center border-1 border-solid hover:box-shadow[0px 2px 4px rgba(0, 0, 0, 0.18)] transition-shadow duration-200`}
  border-color: var(--color-medium);
  button {
    ${tw`bg-transparent h-12 px-4 flex items-center border-none cursor-pointer`}

    &:first-of-type {
      ${tw`pl-6`}
    }
    &:last-of-type {
      ${tw`pr-2`}
    }
  }
  span {
    ${tw` h-12 w-1`}
    background-color: var(--color-medium);
  }
`;

const Logo = styled.div`
  flex: 1 0 140px;
`;

const Nav = styled(Logo)`
  ${tw`flex justify-end`}
`;

const Container = styled.header`
  ${tw`h-[80px] px-6 flex items-center w-full fixed z-20 bg-white justify-between box-shadow[rgba(0, 0, 0, 0.08) 0px 1px 12px 
   ]`};
  
`;

export const HeaderCSS = {
  Container,
  Logo,
  Nav,
  Search,
  SearchIcon,
  NavA,
  NavButton,
};
