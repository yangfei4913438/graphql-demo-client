import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const BookList = ({ width, height, loading, labels, errorInfo, list, delBook, editBook }) => {
  if (errorInfo) return `Error! ${errorInfo}`;

  return (
    <div style={{ marginTop: 15 }}>
      {loading ? (
        <p>加载中。。。</p>
      ) : (
        <TableContainer style={{ width, height }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{labels.name}</TableCell>
                <TableCell>{labels.genre}</TableCell>
                <TableCell>{labels.time}</TableCell>
                <TableCell>{labels.size}</TableCell>
                <TableCell>{labels.author}</TableCell>
                <TableCell width={170}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.genre}</TableCell>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.size}</TableCell>
                  <TableCell>{row.author.name}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => delBook(row.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => editBook(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default BookList;
