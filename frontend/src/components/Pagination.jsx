import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination({ totalPages }) {
  return (
    <Stack spacing={2}>
      <Pagination count={5} color="secondary" totalPages={totalPages} />
    </Stack>
  );
}
