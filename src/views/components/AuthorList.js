import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

const AuthorList = ({ loading, errorInfo, list, labels, width, height, editAuthor, delAuthor }) => {
  if (errorInfo) return `Error! ${errorInfo}`;

  return (
    <>
      {loading ? (
        <p>加载中。。。</p>
      ) : (
        <TableContainer style={{ width, height }} component={Paper}>
          <Table stickyHeader aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{labels.name}</TableCell>
                <TableCell>{labels.range}</TableCell>
                <TableCell>{labels.nationality}</TableCell>
                <TableCell>{labels.birthplace}</TableCell>
                <TableCell>{labels.works}</TableCell>
                <TableCell width={170}>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.range}</TableCell>
                  <TableCell>{row.nationality}</TableCell>
                  <TableCell>{row.birthplace}</TableCell>
                  <TableCell>{row.works.map(o => o.name).join('、')}</TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" onClick={() => delAuthor(row.id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => editAuthor(row)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AuthorList;
