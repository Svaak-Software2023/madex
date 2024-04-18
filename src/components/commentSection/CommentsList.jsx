/* eslint-disable react/prop-types */
import { MdMoreVert } from "react-icons/md";
import "./style.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getAllComments,
  updateComment,
} from "../../redux/features/commentSlice";
import { useParams } from "react-router-dom";
import moment from "moment";

const CommentsList = ({
  id,
  commentData,
  owner: { avatar, username },
  createdAt,
}) => {
  // const [modalIsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [more, setMore] = useState(null);
  const [openComment, setopenComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const accessToken = useSelector((state) => state.auth.data);
  const { videoId } = useParams();

  const openMore = (id) => {
    if (!more) {
      setMore(id);
    } else if (more !== id) {
      setMore(id);
    } else setMore(null);
  };

  const [content, setContent] = useState(commentData);

  // Commemt Funtions
  const handleUpdateComment = (e) => {
    e.preventDefault();
    dispatch(
      updateComment({
        commentId,
        accessToken: accessToken.accessToken,
        content,
      })
    );

    setopenComment(false);
    // setContent(commentData);
    setTimeout(() => {
      dispatch(getAllComments({ videoId }));
    }, 500);
  };

  const openCommentEditor = (id) => {
    setopenComment(!openComment);
    setCommentId(id);
    setMore(null);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(
      deleteComment({ commentId, accessToken: accessToken.accessToken })
    ).then(() => dispatch(getAllComments({ videoId })));
    setMore(null);
  };

  return (
    <>
      <div className="comment_details">
        <div className="user_avatar">
          <img src={avatar} alt="" />
        </div>
        <div className="comment_content">
          <div className="comment_action">
            <p className="username">
              {username}
              <span>{moment(createdAt).fromNow()}</span>
            </p>
            {accessToken?.user.username === username ? (
              <div className="comment_more_menu">
                <MdMoreVert onClick={() => openMore(id)} />
                {more === id && (
                  <div className="comment_more_option">
                    <ul>
                      <li onClick={() => openCommentEditor(id)}>Edit</li>
                      <li onClick={() => handleDeleteComment(id)}>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="comment_message">
            {openComment ? (
              <div className="comment_edit_container">
                <form onSubmit={handleUpdateComment}>
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Add opinions"
                  />
                  <div className="comment-actions">
                    <button
                      className="comment-cancel"
                      onClick={openCommentEditor}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={
                        commentData === "" ? "comment-unsave" : "comment-save"
                      }
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p>{commentData}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentsList;
