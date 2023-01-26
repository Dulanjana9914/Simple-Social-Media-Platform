import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import StyleFlex from "components/StyleFlex";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ avatar }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [savedBy, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("savedBy", savedBy);
    if (image) {
      formData.append("avatar", image);
      formData.append("picture", image.name);
    }

    const response = await fetch(`http://localhost:8070/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <StyleFlex gap="1.5rem">
        <UserImage avatar={avatar} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={savedBy}
          sx={{
            width: "100%",
            backgroundColor:"white",
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </StyleFlex>
      {isImage && (
        <Box
          border={`1px solid`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
          
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <StyleFlex>
                <Box
                  {...getRootProps()}
                  border={`2px dashed`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <StyleFlex>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </StyleFlex>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </StyleFlex>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <StyleFlex>
        <StyleFlex gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: "#66ce63" }} />
          <Typography
            color={"#66ce63"}
            sx={{ "&:hover": { cursor: "pointer", color: "#66ce63" } }}
          >
            Image
          </Typography>
        </StyleFlex>

        {isNonMobileScreens ? (
          <>
          </>
        ) : (
          <StyleFlex gap="0.25rem">
            <MoreHorizOutlined sx={{ color: "#66ce63" }} />
          </StyleFlex>
        )}

        <Button
          disabled={!savedBy}
          onClick={handlePost}
          sx={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            backgroundColor: "#66ce63",
            borderRadius: "2rem",
            padding: "0.5rem 2rem",
            "&:hover": { backgroundColor: "green" },
            color: "white"
          }}
        >
          POST
        </Button>
      </StyleFlex>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
