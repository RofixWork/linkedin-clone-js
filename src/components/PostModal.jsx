import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { BsCardImage, BsYoutube } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { Timestamp } from "firebase/firestore";
import { uploadImage } from "../app/slices/storage";
const PostModal = ({ modal, setModal }) => {
  // user info
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [postVideo, setPostVideo] = useState("");
  const [choose, setChoose] = useState({
    video: false,
    image: false,
  });

  //   chosoe file
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPostImage(file);
  }

  // posted fn()
  function posted() {
    if (postContent === "") return;
    // if (postImage === "" || postVideo === "") return;
    const info = {
      createdBy: user,
      desc: postContent,
      image: postImage,
      video: postVideo,
      timestamp: Timestamp.now(),
    };

    dispatch(uploadImage(info));

    setModal(false);
    setPostContent("");
    setPostImage("");
    setPostVideo("");
  }
  // posted fn()

  return (
    <ModalContainer modal={modal}>
      <Modal>
        <Header>
          <h3>Create a post</h3>
          <button
            onClick={() => {
              setModal(false);
            }}
          >
            <FaTimes fontSize={18} color="#555" />
          </button>
        </Header>
        <Content>
          <UserInfo>
            {user ? (
              <img src={user?.image} alt="userImage" />
            ) : (
              <img src="./images/user.svg" alt="userImage" />
            )}

            <h3>{user && user?.username}</h3>
          </UserInfo>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What do you want to talk about?"
          ></textarea>
          {choose.image ? (
            <h5>
              <label htmlFor="file">select an image to share</label>
            </h5>
          ) : choose.video ? (
            <input
              type="url"
              placeholder="Please input a video link"
              className="post_video"
              value={postVideo}
              onChange={(e) => setPostVideo(e.target.value)}
            />
          ) : null}

          <input type="file" id="file" onChange={handleChange} hidden />

          {postImage ? (
            <img className="post_image" src={URL.createObjectURL(postImage)} />
          ) : null}
          {postVideo ? <ReactPlayer url={postVideo} width={`100%`} /> : null}
        </Content>
        <Post>
          <div>
            <button
              onClick={() => {
                setChoose({ video: false, image: true });
                setPostVideo("");
              }}
            >
              <BsCardImage fontSize={20} color="#555" />
            </button>
            <button
              onClick={() => {
                setChoose({ video: true, image: false });
                setPostImage("");
              }}
            >
              <BsYoutube fontSize={20} color="#555" />
            </button>
          </div>
          <button className="button_post" onClick={posted}>
            Post
          </button>
        </Post>
      </Modal>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  opacity: ${({ modal }) => (modal ? 1 : 0)};
  visibility: ${({ modal }) => (modal ? "visible" : "hidden")};
  transition: visibility 0.3s ease-in-out, opacity 0.3s ease-in-out;
  display: grid;
  place-items: center;
`;

const Modal = styled.div`
  max-width: 600px;
  max-height: 600px;
  /* height: auto; */
  width: 90vw;
  background-color: #fff;
  border-radius: 5px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #ccc;

  & > button {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: grid;
    place-items: center;
    background-color: #f4f4f4;
    border: none;
    border-radius: 50%;
  }
`;
const Post = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;

  & div:first-child {
    display: flex;
    /* gap: 5px; */
  }

  & div:first-child > button {
    display: inline-block;
    width: 50px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  & button.button_post {
    background-color: #0a66c2;
    padding: 6px 20px;
    border-radius: 20px;
    border: none;
    color: white;
    cursor: pointer;
  }
`;
const Content = styled.div`
  padding: 10px 12px;
  border-bottom: 1px solid #ccc;
  overflow-y: auto;
  height: auto;
  max-height: 450px;

  & textarea {
    resize: none;
    display: block;
    width: 100%;
    min-height: 200px;
    border: 1px solid #ccc;
    margin-top: 20px;
    padding: 10px;
    font-size: 1rem;
    outline: none;
  }
  & img.post_image {
    width: 50%;
    height: 200px;
    display: block;
    margin: 5px 0;
  }

  & .post_video {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #cccc;
    margin-block: 10px;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  & h3 {
    font-size: 16px;
    font-weight: 500;
  }
`;
export default PostModal;
