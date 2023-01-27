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
import axios from "axios";
import { showSuccessMsg, showErrMsg } from "../../utils/notification/Notification";

const MyPostWidget = ({ avatar }) => {
    const initialState = {
    err: "",
    success: ""
   }
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const { _id,username } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [data, setData] = useState(initialState);
  const { err, success } = data;
  const userId = _id;
  const savedBy = username;
  let picture="";

  const handlePost = async () => {
    if (image) {
      await changeAvatar();  
    }
   
     if(description!=="" || picture!==""){
      await axios.post("http://localhost:8070/posts", {
        userId,
        picture,
        savedBy,
        description,
      },
      ).then((res) => {
        const posts = res.data;
        dispatch(setPosts({ posts }));
        setImage(null);
        setDescription("");
        setData({ ...data, err: "", success: res.data.msg });
      });
    }
  };

  const changeAvatar = async (e) => {
    try {
      const file = image;
     
      if (!file) 
        return setData({
          ...data,
          err:"No files were uploaded.",
          success: "",
        });
       
              
      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });
        
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err:"Please upload a JPEG or PNG file.",
          success: "",  
        });

      let formData2 = new FormData();
      formData2.append("file", file);

     //upload image to cloudinary
      const res = await axios.post("http://localhost:8070/images/upload", formData2, {
        headers: {
           Authorization: `Bearer ${token}` ,
          "content-type": "multipart/form-data"      
        },
        
      });
      picture = res.data.url;

    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  
  return (
    <WidgetWrapper>
      <StyleFlex gap="1.5rem">
        <UserImage avatar={avatar} />
        <div>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
         </div>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
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
            onDrop={(acceptedFiles) =>setImage(acceptedFiles[0])}
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
           disabled={!description && !image}
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
