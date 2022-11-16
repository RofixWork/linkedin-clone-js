import React from "react";
import styled from "styled-components";
import { GrUserAdd } from "react-icons/gr";
import { HiOutlinePlus } from "react-icons/hi";
import { useSelector } from "react-redux";
const LeftSide = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <aside>
      <Container>
        <UserInfo>
          <div className="user_image">
            <img src="./images/photo.svg" alt="image" />
          </div>
          <div>
            <h3>Welcome, {user?.username}</h3>
            <h4>Add a Photo</h4>
          </div>
        </UserInfo>
        <Connections>
          <div>
            <h5>Connections</h5>
            <h4>Grow yout network</h4>
          </div>
          <GrUserAdd />
        </Connections>
        <Items>
          <img src="./images/item-icon.svg" alt="" />
          <h4>My Items</h4>
        </Items>
      </Container>
      <Container>
        <Community>
          <li>Groups</li>
          <li>
            Events <HiOutlinePlus />
          </li>
          <li>Follow Hashtags</li>
          <li>Discover more</li>
        </Community>
      </Container>
    </aside>
  );
};

const Container = styled.div`
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 1rem;
`;
const UserInfo = styled.div`
  height: 180px;
  border-bottom: 1px solid #f4f4f4;
  background-image: url("./images/card-bg.svg");
  background-size: 100% 70px;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;

  & .user_image {
    width: 90px;
    height: 90px;
    background-color: white;
    border-radius: 50%;
    display: grid;
    place-items: center;
    border: 2px solid #f6f6f6;

    & img {
      display: block;
    }
  }

  & h3 {
    font-size: 1.1rem;
  }

  & h4 {
    color: #0a66c2;
    font-weight: 500;
    font-size: 14px;
  }
`;
const Connections = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  border-bottom: 1px solid #f4f4f4;
  & h5 {
    color: gray;
    font-size: 12px;
    font-weight: 400;
  }

  & h4 {
    font-size: 14px;
    font-weight: 500;
  }
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 8px;
  gap: 2px;
  border-bottom: 1px solid #f4f4f4;
  & h4 {
    font-size: 15px;
    font-weight: 500;
  }
`;

const Community = styled.ul`
  & li {
    font-size: 14px;
    font-weight: 500;
    padding: 7px 8px;

    &:nth-of-type(2) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &:nth-of-type(3) {
      border-bottom: 1px solid #f4f4f4;
    }

    &:last-of-type {
      color: rgb(128, 128, 128, 0.8);
      cursor: pointer;
      &:hover {
        color: gray;
      }
    }
  }
`;

export default LeftSide;
