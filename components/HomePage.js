
import React,{useEffect, useState} from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
  Container,
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select, MenuItem,
  Grid
  } from '@mui/material';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { getMap, park } from "../store/reducers/park";
import { useRouter } from "next/router";
import _ from 'lodash'
import { TableMap } from "./TableMap";
import { UnParkModal } from "./UnparkModal";
import { ReceiptTable } from "./ReceiptTable";
import { ParkingForm } from "./ParkingForm";

export function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [entPoint, setEntPoint] = useState('')
  const [carSize, setCarSize] = useState('S')
  const carTypes = useSelector(state => state.parking.carTypes)
  const mapList = useSelector(getMap)
  const [map, setMap] = useState([])
  
  useEffect(() => {
    if(mapList){
      setMap(mapList)
    }
  })
 
  return (
    <div>
      <Container maxWidth="xl">
        <Box
          sx={{
            marginTop: 2,
          }}
        >
         <Grid container spacing={2}>
          <Grid item xs={4}>
            <ParkingForm map = {map}/>
            <ReceiptTable/>
          </Grid>
          <Grid item xs={8}>
            <TableMap/>
          </Grid>
        </Grid>
        </Box>
      </Container>
       
    </div>
  )
}

