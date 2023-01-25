import { Box, Typography, useMediaQuery } from "@mui/material";
import Login from "./Login";
import "../../CSS/userFunction.css";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const myname = "Dulanjana Lakshan";
  return (
    <Box>   
    <div style={{ 
      backgroundImage: `url("https://res.cloudinary.com/dl99x/image/upload/v1674660093/social-media-icon-light-background_169963-225_cmri3n.jpg")` 
    }}>
      <Box
        width="10%"
        p="1rem 6%"
        textAlign="left"
        marginTop={isNonMobileScreens ? "0%" : "2rem"}
        marginBottom={isNonMobileScreens ? "5%" : "2rem"}
      >
        <Typography fontWeight="bold" fontSize="32px" color="red">
          surgeMates
        </Typography>
      </Box>
      <div style={{ display: "flex" }}>
      <Box
        width={isNonMobileScreens ? "40%" : "70%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={"#b4b7bb"}
        marginLeft={isNonMobileScreens ? "10%" : "0"}
        marginTop={isNonMobileScreens ? "-1%" : "2rem"}
        height={isNonMobileScreens ? "auto" : "auto"}
        marginBottom={isNonMobileScreens ? "15%" : "2rem"}
      >
        <Login />
      </Box>
      <Box
        width={isNonMobileScreens ? "28%" : "43%"}
        paddingLeft="1rem"
        paddingRight="1rem"
        paddingTop="7rem" 
        marginTop="-12%"    
        backgroundColor={"white"}
        >
       <br></br>  <br></br> <br></br>
          <h1>Surge SE Internship</h1>
          <label className="t-form-label-box">March 2023 </label>
           <br></br>  <br></br> <br></br>
          <h1>{myname}</h1>
       </Box>
        </div></div>
    </Box>
  );
};

export default LoginPage;
