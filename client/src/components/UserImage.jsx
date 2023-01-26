import { Box } from "@mui/material";

const UserImage = ({ avatar, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={avatar}
      />
    </Box>
  );
};

export default UserImage;
