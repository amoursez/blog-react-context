import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import { Button, CardHeader } from '@mui/material';
import { postContext } from '../contexts/PostContext';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function AdminTable(props) {
  const data = React.useContext(postContext);
  const { deletepost } = data;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>№</StyledTableCell>
            <StyledTableCell align="right">Название</StyledTableCell>
            <StyledTableCell align="right">Описание</StyledTableCell>
            <StyledTableCell align="right">Описание</StyledTableCell>
            <StyledTableCell align="right">Описание</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.posts.map((item, index) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/details/${item.id}`}>
                  <CardHeader title={item.title} />
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">{item.body}</StyledTableCell>

              <StyledTableCell align="right">
                <Link to={`/edit/${item.id}`}>EDIT</Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => deletepost(item.id)}>DEL</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}