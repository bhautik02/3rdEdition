import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPlacesDashAsync, getAllUsersAsync } from "../../store/dashboard";
import { AiTwotoneStar } from "react-icons/ai";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Places() {
  const dispatch = useDispatch();
  const { allPlaces } = useSelector((state) => state.dashboard);
  const { totalPlaces } = useSelector((state) => state.dashboard);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    console.log("handleChangePage----->", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("-----> handleChangeRowsPerPage ---->", event.target.value);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(getAllPlacesDashAsync({ page, rowsPerPage }));
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <>
      {console.log("============", allPlaces)}
      {allPlaces && allPlaces.length !== 0 && (
        <>
          <Box
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "20px",
            }}>
            <div className="flex mt-10 justify-center mb-4">
              <p className="text-3xl ">All Users</p>
            </div>
            <TableContainer component={Paper} style={{ marginBottom: "5%" }}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>place</StyledTableCell>
                    <StyledTableCell>Identity number</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">category</StyledTableCell>
                    <StyledTableCell align="left">Address</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="left">Ratings</StyledTableCell>
                    <StyledTableCell align="left">OwnerName</StyledTableCell>
                    <StyledTableCell align="right">OwnerPhone</StyledTableCell>
                    <StyledTableCell align="left">OwnerEmail</StyledTableCell>
                    <StyledTableCell align="left">Joined in</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allPlaces.map((place) => (
                    <StyledTableRow key={place._id}>
                      <StyledTableCell component="th" scope="row">
                        <div className="flex rounded-full">
                          <img
                            src={place?.photo[0]}
                            alt="profile"
                            className="w-12 h-12 object-cover rounded-full"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {place?._id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {place?.title}
                      </StyledTableCell>
                      <StyledTableCell align="left" className="capitalize">
                        {place?.category}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {place?.address}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {place?.price}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <AiTwotoneStar className="inline h-3 w-3 -mt-1" />{" "}
                        {place.totalRatings > 1
                          ? (place.totalRatings / place.numberOfReview).toFixed(
                              2
                            )
                          : 0}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {place?.host[0].name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {place?.host[0].phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {place?.host[0].email}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {place?.createdAt.split("T")[0]}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="paper"
                count={totalPlaces}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            <div className="flex -mt-10 mb-4 justify-center"></div>
          </Box>
        </>
      )}
    </>
  );
}
