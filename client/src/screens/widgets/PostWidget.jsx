import {
  FavoriteBorderOutlined,
  FavoriteOutlined
} from "@mui/icons-material";

import { IconButton, Typography } from "@mui/material";
import StyleFlex from "components/StyleFlex";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  userId,
  picture,
  savedDate,
  savedBy,
  likes
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
    const username1 =savedBy;
    console.log("awad"+username1);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8070/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      {picture && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${picture}`}
        />
      )}
      <StyleFlex mt="0.25rem">
        <StyleFlex gap="1rem">
          <StyleFlex gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <StyleFlex >
              <Typography
                style={{
                  fontWeight: "bold"
                }}
              >{likeCount}</Typography>
            
            <Typography
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "1.2rem",
                  fontFamily: "sans-serif",
                  fontStyle: "italic",
                  marginLeft: "12rem",
                  marginRight: "10rem",
                }}
              >
              {username1}
              </Typography>
              <Typography
                style={{
                fontWeight: "bold",
                color: "grey"
                }}
              >
              {savedDate + "d"}
              </Typography>
            </StyleFlex>
            </StyleFlex>    
        </StyleFlex>
      </StyleFlex>
    </WidgetWrapper>
  );
};

export default PostWidget;
