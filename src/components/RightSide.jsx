import React from "react";
import styled from "styled-components";
import { FaHashtag } from "react-icons/fa";
import { Link } from "react-router-dom";
const RightSide = () => {
  return (
    <Container>
      <h4>Add to your feed</h4>
      <Suggest>
        <div className="hash-icon">
          <FaHashtag fontSize={25} />
        </div>
        <div>
          <h3>#Linkedin</h3>
          <button>Follow</button>
        </div>
      </Suggest>
      <Suggest>
        <div className="hash-icon">
          <FaHashtag fontSize={25} />
        </div>
        <div>
          <h3>#videos</h3>
          <button>Follow</button>
        </div>
      </Suggest>
      <Link to={``}>View all recommendations</Link>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 1rem;
  padding: 10px 8px;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  & h4 {
    color: gray;
    font-size: 14px;
    font-weight: 400;
  }
  & a {
    font-size: 14px;
    display: block;
    margin: 10px 0;
    color: #0a66c2;
    text-decoration: underline;
  }
`;

const Suggest = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 0;

  & .hash-icon {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 3px solid #f3f3f3;
    transform: translateY(5px);
  }

  & h3 {
    font-size: 13px;
    font-weight: 600;
  }

  & button {
    border: none;
    display: block;
    padding: 2px 16px;
    background-color: transparent;
    border: 2px solid #222;
    border-radius: 20px;
    cursor: pointer;
  }
`;

export default RightSide;
