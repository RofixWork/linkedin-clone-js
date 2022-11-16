import { useEffect } from "react";
import Header from "./Header";
import styled from "styled-components";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import MiddleSide from "./MiddleSide";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import db from "../firebase";
import { useDispatch } from "react-redux";
import { setPosts } from "../app/slices/storage";
const Home = () => {
  const dispatch = useDispatch();
  const getAllPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const posts = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: new Date(
          doc.data().timestamp.seconds * 1000
        ).toLocaleString(),
      };
    });

    console.log(posts);
  };
  useEffect(() => {
    // getAllPosts();
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          timestamp: new Date(doc.data().timestamp.seconds * 1000),
        };
      });
      console.log(posts);

      dispatch(setPosts(posts));
    });
  }, []);
  return (
    <div>
      <Header />
      <Content>
        <p>
          <span>Hiring in a hurry?- </span>
          Find talented pros in record time with Upwork and keep business moving
        </p>

        <Layout>
          <LeftSide />
          <MiddleSide />
          <RightSide />
        </Layout>
      </Content>
    </div>
  );
};

const Content = styled.div`
  padding-top: 100px;
  padding-inline: 14px;

  & p {
    text-align: center;
    font-weight: 600;
    text-decoration: 2px underline;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 14px;
      padding-inline: 14px;
    }

    & span {
      color: #0a66c2;
      cursor: pointer;
    }
  }
`;

const Layout = styled.div`
  padding: 40px 0;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  align-items: flex-start;
  column-gap: 15px;
  row-gap: 15px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export default Home;
