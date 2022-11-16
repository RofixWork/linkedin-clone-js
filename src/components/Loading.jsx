import styled from "styled-components";
import BarLoader from "react-spinners/BarLoader";
const Loading = () => {
  return (
    <Loader>
      <img src="./images/logo.svg" alt="" />
      <BarLoader color="#0a66c2" width={160} />
    </Loader>
  );
};

const Loader = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  & img {
    height: 70px;
    width: 300px;
  }
`;

export default Loading;
