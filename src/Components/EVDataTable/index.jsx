import React, { useContext, useState } from "react";
import { EvDataContext } from "../../Context/EVDataContext";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TablePagination,
  CircularProgress,
  Box,
} from "@mui/material";

const EVDataTable = () => {
  const { evData, loading } = useContext(EvDataContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = Array.isArray(evData) ? evData : [];

  if (loading) {
    return (
      <Box sx={{ display: "flex", marginLeft: "25%" }}>
        <CircularProgress />
      </Box>
    );
  }

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const slicedData = data.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          marginTop: "4vh",
          borderRadius: "12px",
          padding: "2%",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          mb={1}
          style={{ fontWeight: "bold" }}
        >
          Electric Vechile Details
        </Typography>
        <TableContainer sx={{ maxHeight: 480 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Vechile Type</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Model Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {slicedData.length > 0 ? (
                slicedData.map((ev, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{ev.Make}</TableCell>
                    <TableCell>{ev["Electric Vehicle Type"]}</TableCell>
                    <TableCell>{ev["Model"]}</TableCell>
                    <TableCell>{ev["Model Year"]}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default EVDataTable;
