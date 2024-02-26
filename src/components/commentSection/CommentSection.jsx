/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  getAllComments,
} from "../../redux/featurs/commentSlice";
import { useEffect, useState } from "react";
import "./style.css";
import CommentsList from "./CommentsList";

const CommentSection = ({ userId, videoId, accessToken }) => {
  const dispatch = useDispatch();
  const commentData = useSelector((state) => state.comment.commentData);
  const userProfile = useSelector((state) => state.auth.user);

  const [content, setContent] = useState("");

  // Commemt Funtions
  const handleCreateComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, userId, videoId, accessToken }));
    setContent("");
  };
  useEffect(() => {
    dispatch(getAllComments({ videoId }));
  }, [dispatch]);
  return (
    <>
      <div className="comment-container">
        <div className="user-comment-container">
          <div className="user_avatar" style={{ marginTop: "5px" }}>
            <img src={userProfile?.avatar} alt="" />
          </div>
          <div style={{ flex: "1" }}>
            <p className="comment-count">{commentData?.length} Opinions</p>
            <form onSubmit={handleCreateComment}>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add opinions"
              />
              <div className="comment-actions">
                <button className="comment-cancel">Cancel</button>
                <button
                  type="submit"
                  className={content === "" ? "comment-unsave" : "comment-save"}
                >
                  save Opinion
                </button>
              </div>
            </form>
          </div>
        </div>

        {commentData &&
          commentData.map((item) => (
            <CommentsList
              key={item._id}
              id={item._id}
              commentData={item.content}
              owner={item.owner}
              createdAt={item.createdAt}
            />
          ))}
      </div>
    </>
  );
};

export default CommentSection;
