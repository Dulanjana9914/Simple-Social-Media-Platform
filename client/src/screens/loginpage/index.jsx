import { Box, Typography, useMediaQuery } from "@mui/material";
import Login from "./Login";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
     <Box
        width="50%"
        backgroundColor={"white"}
        p="1rem 6%"
        textAlign="left"
        marginTop={isNonMobileScreens ? "-1%" : "2rem"}
      >
        <Typography fontWeight="bold" fontSize="32px" color="red">
          surgeMates
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "35%" : "83%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={"grey"}
        marginLeft={isNonMobileScreens ? "10%" : "0"}
        marginTop={isNonMobileScreens ? "0%" : "2rem"}
        height={isNonMobileScreens ? "auto" : "auto"}
      >
        <Login />
      </Box>
    </Box>
  );
};

export default LoginPage;
