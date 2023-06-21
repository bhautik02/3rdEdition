import { Box } from "@mui/material";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          height: "70px",
          bgcolor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component="span" sx={{ color: "black" }}>
          <hr className="w-screen" />
          <div className="flex justify-center mt-4">
            {" "}
            All rights reserved! 2023.
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
