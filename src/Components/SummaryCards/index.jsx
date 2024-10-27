import React, { useContext } from "react";
import {
  Grid2 as Grid,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress
} from "@mui/material";
import { EvDataContext } from "../../Context/EVDataContext";
import EVIcon from "@mui/icons-material/ElectricCar";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";

const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px",
  borderRadius: "12px",
};

const iconCircleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#e0f7fa",
};

const SummaryCards = () => {
  const { evData, loading } = useContext(EvDataContext);

  if (loading) {
    return (
        <Box sx={{ display: "flex", marginLeft: "25%" }}>
          <CircularProgress />
        </Box>
      );
  }

  const manufactures = evData.reduce((acc, ev) => {
    acc[ev["Make"]] = (acc[ev["Make"]] || 0) + 1;
    return acc;
  }, {});

  const totalEvs = evData.length;
  const avgRange = (
    evData.reduce((sum, ev) => sum + Number(ev["Electric Range"] || 0), 0) /
    totalEvs
  ).toFixed(2);

  const popularManufacturer = Object.keys(manufactures).reduce((a, b) => {
    return manufactures[a] > manufactures[b] ? a : b;
  });
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
          <Card elevation={3} style={cardStyle}>
            <CardContent>
              <Typography variant="h6">Total EV's</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {totalEvs}
              </Typography>
            </CardContent>
            <Box style={iconCircleStyle}>
              <EVIcon fontSize="large" style={{ color: "#00796b" }} />
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.7 }}>
          <Card elevation={3} style={cardStyle}>
            <CardContent>
              <Typography variant="h6">Average Range</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {avgRange} miles
              </Typography>
            </CardContent>
            <Box style={iconCircleStyle}>
              <EqualizerOutlinedIcon
                fontSize="large"
                style={{ color: "#00796b" }}
              />
            </Box>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.8 }}>
          <Card elevation={3} style={cardStyle}>
            <CardContent>
              <Typography variant="h6">Popular Manufacturer</Typography>
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {popularManufacturer[0].charAt(0).toUpperCase() +
                  popularManufacturer.slice(1).toLowerCase()}
              </Typography>
            </CardContent>
            <Box style={iconCircleStyle}>
              <GppGoodOutlinedIcon
                fontSize="large"
                style={{ color: "#00796b" }}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default SummaryCards;
