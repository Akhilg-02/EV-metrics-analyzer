import React from "react";
import { Box, Paper, Avatar, Typography } from "@mui/material";
import cover from "../../datasets/Images/cover.jpg";


const HeroHead = () => {
  return (
    <Box display="flex" justifyContent="center" marginTop={1} height="60vh">
      <Paper
        elevation={3}
        sx={{
          width: 450,
          p: 4,
          textAlign: "center",
          borderRadius: "12px",
        }}
      >
        <Avatar
          alt="Profile Picture"
          src={cover}
          sx={{ width: 250, height: 250, margin: "auto", mb: 2 }}
        />
        <Typography variant="h6" component="h2">
          Community
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={3}>
          <a
            target="_blank"
            href="https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population"
          >
            {" "}
            Please click here to join
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default HeroHead;
