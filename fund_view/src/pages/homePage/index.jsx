/*
 * @Author: 自迩
 * @Date: 2022-06-06 21:23:44
 * @LastEditTime: 2022-11-10 13:25:43
 * @LastEditors: your name
 * @Description:
 * @FilePath: \fund_view\src\pages\homePage\index.jsx
 */

import './index.css'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
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


 const useStyles = makeStyles({
  root: {
    backgroundColor: '#0d3f67',
    color: 'white',
    height: '80px',
  },
  table: {
    marginTop: '100px',
    marginBottom: '50px'
  },
});


export default function HomePage() {
  const classes = useStyles();
  let [fundList, setFundList] = useState([])
  useLayoutEffect(() => {

    axios.get('/fundInfo').then(value => {

      value.data.data.sort((a, b) => {
        return parseInt(a.fund_type) - parseInt(b.fund_type)
      })
      console.log(value.data.data);
      setFundList(value.data.data)
    }).catch( err => {
      console.log('axios fail', err);
    })
  }, [])

  return (
    <div>
      <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed" >
        <Toolbar variant="dense" className={classes.root}>
          <Typography variant="h6" color="inherit" component="div">
            基金爬虫
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      {
        (fundList.length === 0) ? <></> : (
          <TableContainer component={Paper} className={classes.table}>
            <Table sx={{ minWidth: 900 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>基金名称</StyledTableCell>
                  <StyledTableCell align="right">基金代码</StyledTableCell>
                  <StyledTableCell align="right">基金类型&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">估值&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">净值&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">近1月&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">近3月&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">近6月&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">近1年&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">更新日期</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fundList.map((row) => (
                  <StyledTableRow key={row.fund_code}>
                    <StyledTableCell component="th" scope="row">
                      {row.fund_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.fund_code}</StyledTableCell>
                    <StyledTableCell align="right">{row.fund_type}</StyledTableCell>
                    <StyledTableCell align="right">{row.valuation}</StyledTableCell>
                    <StyledTableCell align="right">{row.net_worth}</StyledTableCell>
                    <StyledTableCell align="right">{row.M1}</StyledTableCell>
                    <StyledTableCell align="right">{row.M3}</StyledTableCell>
                    <StyledTableCell align="right">{row.M6}</StyledTableCell>
                    <StyledTableCell align="right">{row.Y1}</StyledTableCell>
                    <StyledTableCell align="right">{row.nav_date}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )
      }
    </div>

  )
}
