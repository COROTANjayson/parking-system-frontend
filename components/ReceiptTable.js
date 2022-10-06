import React,{useEffect, useState} from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
  Box,
  Typography,
  } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash'
import { ViewReceiptsModal } from "./ViewReceiptsModal";
export const ReceiptTable = (props) =>{
    const dispatch = useDispatch()
    let receiptList = useSelector(state => state.parking.receiptList)

    const [receipts, setReceipts] = useState([])
    useEffect(() => {
      if(receiptList){
        
        setReceipts(receiptList)
      }
    })
    return(
      <div>
        <Box mb={1} sx={{ display: 'flex', justifyContent: 'space-between' }} >  
            <Typography variant="h6" component="span">
                Request
            </Typography>
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper}  >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Car Type</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Date</TableCell>
                        <TableCell></TableCell>
                        
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {receipts.map((row, index) => (
                        <TableRow
                        key={index}
                        >
                        <TableCell >{row.carType}</TableCell>
                        <TableCell >{new Date(row.dateParked).toLocaleString()}</TableCell>
                        <TableCell >
                            <ViewReceiptsModal slot={row}/>
                        </TableCell>
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </div>
    )
   
  }