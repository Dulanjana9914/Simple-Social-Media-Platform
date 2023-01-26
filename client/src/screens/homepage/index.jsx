import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "screens/navbar";
import  MyPostWidget  from "screens/widgets/MyPostWidget";
import PostsWidget from "screens/widgets/PostsWidget";
import ProfileImage from "components/ProfileImage";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id,name,username, avatar } = useSelector((state) => state.user);
  const logo = "https://res.cloudinary.com/dl99x/image/upload/v1674659975/attachment_86137168_nttz7u.png";
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 0%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        bgcolor={"#f0f2f5"}
      >
        <Box
          paddingLeft="3%"
          paddingTop="3%"
        >
      <img
        style={{ objectFit: "cover", borderRadius: "20%" }}
        width= "180px"
        height= "180px"
        alt="logo"
        src={logo}
      />
       </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget avatar={avatar} />
          <PostsWidget userId={_id} />
        </Box>
        <Box
          paddingRight="9%"
          alignItems="center"
          paddingTop="3%"
        >
          <ProfileImage avatar={avatar} />
          <p style={{
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
            marginTop: "-0.2rem",
            fontStyle: "italic"
          }}>
            {name}
          </p>

          <p style={{
            color: "gray",
            fontSize: "1.3rem",
            fontWeight: "bold",
            marginTop: "-2rem",
            marginLeft: "0.7rem",
            fontFamily: "monospace",
            fontStyle: "italic"
          }}>
            {username}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
