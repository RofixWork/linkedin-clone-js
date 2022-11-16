import React, { useState } from "react";
import styled from "styled-components";
import {
  FcAddImage,
  FcComments,
  FcLike,
  FcNews,
  FcPlanner,
  FcShare,
  FcUpRight,
  FcVideoCall,
} from "react-icons/fc";
import { useSelector } from "react-redux";
import PostModal from "./PostModal";
import ReactPlayer from "react-player";
import moment from "moment";
const MiddleSide = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.storage);

  // /modal state
  const [modal, setModal] = useState(false);
  return (
    <section>
      <ShareBox onClick={() => setModal(true)}>
        <PostContent>
          <img src={user ? user?.image : "./images/user.svg"} alt="userImage" />
          <input type="text" placeholder="Start a post" />
        </PostContent>
        <PostControls>
          <button>
            <FcAddImage className="icon" />
            Photo
          </button>
          <button>
            <FcVideoCall className="icon" />
            Video
          </button>
          <button>
            <FcPlanner className="icon" />
            Event
          </button>
          <button>
            <FcNews className="icon" />
            Write Article
          </button>
        </PostControls>
      </ShareBox>

      {/* post */}
      {posts?.length
        ? posts.map((post) => {
            return (
              <Post key={post.id}>
                <PostInfo>
                  <img src={post?.createdBy?.image} alt="userImage" />
                  <div>
                    <h3>{post?.createdBy?.username}</h3>
                    <h6>{moment(post?.timestamp).fromNow()}</h6>
                  </div>
                </PostInfo>
                <h5>{post?.desc}</h5>
                {post?.image && (
                  <PostImage>
                    <img src={post?.image} alt="post image" />
                  </PostImage>
                )}
                {post?.video && (
                  <ReactPlayer url={post?.video} width={`100%`} height={400} />
                )}
                <PostControls>
                  <button>
                    <FcLike className="icon" />
                    Like
                  </button>
                  <button>
                    <FcComments className="icon" />
                    Comments
                  </button>
                  <button>
                    <FcShare className="icon" />
                    Share
                  </button>
                  <button>
                    <FcUpRight className="icon" />
                    Send
                  </button>
                </PostControls>
              </Post>
            );
          })
        : null}

      {/* post */}

      {/* post modal */}
      <PostModal modal={modal} setModal={setModal} />
    </section>
  );
};

const ShareBox = styled.div`
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  overflow: hidden;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin-bottom: 1rem;
  padding: 10px 8px;
`;

const PostContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & img {
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 50%;
  }
  & input {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 10px 14px;
  }
`;
const PostControls = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & button {
    display: block;
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: transparent;
    border: none;
    font-size: 12px;
    font-weight: 500;
    color: #0a66c2;
    cursor: pointer;

    & .icon {
      font-size: 24px;
    }
  }
`;

const Post = styled(ShareBox)`
  padding-inline: 0;
  padding-bottom: 10px;
  padding-top: 0;

  & h5 {
    font-size: 13px;
    margin: 10px 8px;
  }
`;
const PostInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  color: gray;

  & img {
    width: 50px;
    height: 50px;
    display: block;
  }

  & h3 {
    font-size: 13px;
  }
  & h4 {
    font-size: 12px;
    font-weight: 500;
  }
  & h6 {
    font-size: 12px;
    font-weight: 500;
  }
`;
const PostImage = styled.div`
  width: 100%;
  height: auto;

  & img {
    width: 100%;
    height: 100%;
  }
`;

export default MiddleSide;
