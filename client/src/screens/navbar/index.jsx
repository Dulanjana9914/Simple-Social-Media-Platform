import {Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyleFlex from "../../components/StyleFlex";

const Navbar = () => {
    const navigate = useNavigate();
    const appName = "surgeMates";
    
    return (
    <StyleFlex padding="1rem 6%" marginTop="-1%"  backgroundColor={"#5e5e5e"}>
      <StyleFlex gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(2rem, 2rem, 2.25rem)"
          color="red"
          paddingTop="0.5rem"
          marginLeft="-2rem"
          onClick={() => navigate("/posts")}
          sx={{
            "&:hover": {
              color: "white",
              cursor: "pointer",
            },
          }}
        >
          {appName}
          </Typography>
       </StyleFlex>    
    </StyleFlex>
  );
};

export default Navbar;