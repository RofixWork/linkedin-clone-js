import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { BsFillPeopleFill, BsWalletFill } from "react-icons/bs";
import { RiNotification3Fill } from "react-icons/ri";
import { TbMessages } from "react-icons/tb";
import { MdArrowDropDown } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../app/slices/auth";
const Header = () => {
  const desktop = useMediaQuery({
    query: "(min-width:768px)",
  });
  // icon size => media query
  const iconSize = desktop ? 22 : 18;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // user info
  const { user } = useSelector((state) => state.auth);

  // function sign out
  const signout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(resetUser());
      })
      .catch((err) => console.error(err));
  };

  // state = redux
  return (
    <Container>
      <Content>
        <Link to="/home">
          <Logo src="./images/linkedin.png" alt="linkedin logo" />
        </Link>
        <SearchInput>
          <AiOutlineSearch fontSize={22} />
          <input type="search" placeholder="Search..." />
        </SearchInput>
      </Content>
      <Nav>
        <NavItem to="/home">
          <AiFillHome fontSize={iconSize} />
          <span>Home</span>
        </NavItem>
        <NavItem to="/home">
          <BsFillPeopleFill color="#777" fontSize={iconSize} />
          <span>My Network</span>
        </NavItem>
        <NavItem to="/home">
          <BsWalletFill color="#777" fontSize={iconSize} />
          <span>Jobs</span>
        </NavItem>
        <NavItem to="/home">
          <TbMessages color="#777" fontSize={iconSize} />
          <span>Messaging</span>
        </NavItem>
        <NavItem to="/home">
          <RiNotification3Fill color="#777" fontSize={iconSize} />
          <span>Notifications</span>
        </NavItem>
        <NavItem to="/home">
          {user ? (
            <img src={user?.image} alt="userImage" />
          ) : (
            <img src="./images/user.svg" alt="user image" />
          )}
          <User>
            <span>Me</span>
            <MdArrowDropDown fontSize={18} />
            <div className="signout" onClick={signout}>
              <p>Sign Out</p>
            </div>
          </User>
        </NavItem>
      </Nav>
    </Container>
  );
};

const Container = styled.div`
  padding: 10px 14px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 8888;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  display: block;
`;
const SearchInput = styled.div`
  padding-inline: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: #eef1f8;
  width: 250px;
  transition: width 0.3s linear;
  height: 35px;
  & input {
    border: none;
    width: 100%;
    background-color: transparent;
    height: 100%;
    font-size: 15px;
    padding: 5px 5px;
  }

  &:focus-within {
    width: 350px;
  }
`;

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  padding: 10px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  /* z-index: 9999; */
  /* overflow-x: auto; */
  /* overflow-y: hidden; */

  @media screen and (min-width: 768px) {
    position: static;
    width: auto;
    padding: 0;
    gap: 30px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  white-space: nowrap;
  color: #111;
  & span {
    font-size: 10px;
    display: block;
    font-weight: 400;

    @media (min-width: 768px) {
      font-size: 12px;
    }
  }
  &:not(:last-of-type) span {
    transform: translateY(6px);
  }

  & img {
    width: 25px;
    height: 25px;
    display: block;
    object-fit: cover;
    border-radius: 50%;
    transform: translateX(-5px);

    @media screen and (min-width: 768px) {
      width: 35px;
      height: 35px;
    }
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  &:hover {
    & .signout {
      opacity: 1;
      visibility: visible;
    }
  }

  & .signout {
    position: absolute;
    top: 16px;
    right: 0;
    background-color: white;
    padding: 3px;
    padding: 10px 14px;
    border-radius: 5px;
    opacity: 0;
    visibility: visible;
    transition: 250ms ease-in-out;
    z-index: 9999;

    & p {
      font-size: 12px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      & {
        top: -40px;
      }
    }
  }
`;

export default Header;
