import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { login } from "../app/slices/auth";

const Login = () => {
  const isDesktopLaptop = useMediaQuery({
    query: "(min-width:768px)",
  });
  const dispatch = useDispatch();

  return (
    <>
      <Container>
        <Nav>
          <Logo to="/">
            <img src="./images/logo.svg" alt="" />
          </Logo>
          <div>
            <JoiNow to="/">Join now</JoiNow>
            <SignIn to="/">Sign in</SignIn>
          </div>
        </Nav>
      </Container>
      <Section>
        {isDesktopLaptop ? (
          <>
            <div>
              <Title>welcome to our professional community</Title>
              <ButtonLogin onClick={() => dispatch(login())}>
                <FcGoogle fontSize={24} />
                sign in with google
              </ButtonLogin>
            </div>
            <ImageHero></ImageHero>
          </>
        ) : (
          <>
            <Title>welcome to our professional community</Title>
            <ImageHero></ImageHero>
            <ButtonLogin onClick={() => dispatch(login())}>
              <FcGoogle fontSize={24} />
              sign in with google
            </ButtonLogin>
          </>
        )}
      </Section>
    </>
  );
};

export default Login;

// styled

const Container = styled.div`
  padding: 10px 14px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled(Link)`
  width: 100px;
  height: 60px;
  overflow: hidden;
  display: block;

  @media screen and (min-width: 768px) {
    width: 200px;
    height: 40px;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const JoiNow = styled(Link)`
  display: inline-block;
  padding: 6px 18px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 12px;
  background-color: #f4f4f4;
  color: gray;
  font-weight: 500;
  transition: background-color 250ms ease-in-out;

  @media screen and (min-width: 768px) {
    padding: 8px 25px;
    font-size: 14px;
  }

  &:hover {
    background-color: #ededed;
  }
`;
const SignIn = styled(Link)`
  display: inline-block;
  margin-left: 10px;
  padding: 6px 18px;
  border: 1px solid #0a66c2;
  color: #0a66c2;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 250ms ease-in-out;

  @media screen and (min-width: 768px) {
    padding: 8px 25px;
    font-size: 14px;
  }

  &:hover {
    background-color: #0a66c2;
    color: white;
  }
`;

const Section = styled.section`
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
  justify-content: center;
  padding: 60px 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    align-items: center;
    column-gap: 15px;
  }
`;
const Title = styled.h1`
  text-align: center;
  color: #0a66c2;
  font-size: 17px;
  text-transform: capitalize;
  font-weight: 400;
  @media (min-width: 768px) {
    text-align: left;
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;
const ButtonLogin = styled.button`
  display: block;
  width: 90%;
  height: 50px;
  margin: auto;
  cursor: pointer;
  background-color: white;
  text-transform: capitalize;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: rgba(0, 0, 0, 0.7);
  @media (min-width: 768px) {
    margin: 0;
    width: 350px;
  }
`;
const ImageHero = styled.div`
  width: 300px;
  height: 300px;
  background-image: url("./images/login-hero.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-inline: auto;

  @media (min-width: 768px) {
    margin-right: 0;
    margin-left: auto;
    width: 500px;
    height: 500px;
  }
`;
