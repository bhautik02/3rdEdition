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
import { getAllUsersDashAsync } from "../../store/dashboard";

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

export default function Users() {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.dashboard);
  const { totalUsers } = useSelector((state) => state.dashboard);
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
    dispatch(getAllUsersDashAsync({ page, rowsPerPage }));
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <>
      {console.log("============", allUsers)}
      {allUsers && allUsers.length !== 0 && (
        <>
          <Box
            style={{
              marginLeft: "200px",
              marginRight: "200px",
              marginTop: "20px",
            }}>
            <div className="flex mt-10 justify-center mb-4">
              <p className="text-3xl ">All Users</p>
            </div>
            <TableContainer component={Paper} style={{ marginBottom: "5%" }}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>profile</StyledTableCell>
                    <StyledTableCell>Identity number</StyledTableCell>
                    <StyledTableCell align="left">Name</StyledTableCell>
                    <StyledTableCell align="left">Email</StyledTableCell>
                    <StyledTableCell align="left">Address</StyledTableCell>
                    <StyledTableCell align="right">Gender</StyledTableCell>
                    <StyledTableCell align="left">Phone</StyledTableCell>
                    <StyledTableCell align="left">Joined in</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUsers.map((user) => (
                    <StyledTableRow key={user._id}>
                      <StyledTableCell component="th" scope="row">
                        <div className="flex rounded-full">
                          <img
                            src={user?.profile}
                            alt="profile"
                            className="w-14 h-14 object-cover rounded-full"
                          />
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user?._id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user?.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user?.email}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user?.address}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user?.gender}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user?.phone}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {user?.createdAt.split("T")[0]}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="paper"
                count={totalUsers}
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
