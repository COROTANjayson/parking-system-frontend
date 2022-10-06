import React,{useEffect, useState} from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,Paper,
  Container,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select, MenuItem
  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getMap,  addNewEntryPoint } from "../store/reducers/park";
import _ from 'lodash'
import { UnParkModal } from "./UnparkModal";

export const TableMap = (props) =>{
    const dispatch = useDispatch()
    const [entPoint, setEntPoint] = useState('')
    const mapList = useSelector(getMap)
    const [map, setMap] = useState([])

    useEffect(() => {
      if(mapList){
        setMap(mapList)
      }
    })
    const occupied = _.find(map, {"occupied": true})

    let button = <Button sx={{marginLeft: 2, height: 40}} type="submit"variant="contained" > Add </Button>
    if(occupied){
      button = <Button sx={{marginLeft: 2, height: 40}} type="submit"variant="contained" disabled> Add </Button>
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      dispatch(addNewEntryPoint(data.get('newEntryPoint')))
      setEntPoint('')
     
    };
    const handleEntryPoint = (event) => {
      const {value} = event.target
      setEntPoint(
        value
      )  
      
    
  }

    return(
      <Container>
        <Box mb={1} >  
          <Box sx={{   display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
          <Box component="form" onSubmit={handleSubmit} 
            sx={{ mt: 1,   display: 'flex', justifyContent: 'center', alignItems: 'center' }}  >
            <FormControl fullWidth margin="normal" sx={{width:200}}>
                <InputLabel id="newEntryPoint">Choose Entry Point</InputLabel>
                <Select
                  required
                  labelId="newEntryPoint"
                  id="newEntryPoint"
                  name="newEntryPoint"
                  value={entPoint}
                  // fullWidth
                  label="New Entry Point"
                  onChange={handleEntryPoint}
                >
                  {map.map((data, i)=>{
                      if(!data.entryPoint){
                        return( 
                          <MenuItem key={i} value={data.slot}>Slot: {data.slot}</MenuItem>
                        )
                      }
                  })}
                </Select>
            </FormControl>
            {button}
          </Box>
            <Typography variant="caption" display="block" gutterBottom>
            NOTE: You can only add entry point if all parking slots are available
            </Typography>
          </Box>
        
        </Box>
        <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <TableContainer component={Paper}  >
                <Table  aria-label="simple table">
                    <TableHead sx={{background: '#0ea5e9'}} align="center">
                    <TableRow >
                        <TableCell sx={{ color: '#ffffff'}}>Slot</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Size</TableCell>
                        <TableCell sx={{ color: '#ffffff'}}>Car Parked</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {map.map((row, index) => {
                      
                      return(
                        <TableRow
                        key={index}
                        >
                        <TableCell >{(!row.entryPoint)?row.slot: 'Entry Point: '+ row.entryPoint}</TableCell>
                        <TableCell >{(row.size)? row.size.desc: ''}</TableCell>
                        <TableCell>
                        {(row.occupied==false && row.occupied !== undefined)? 'Available' : (row.occupied !== undefined)?  'Parked Car Size: '+ row.carSize.desc : ''}
                        </TableCell>
                        <TableCell >
                          {(row.occupied==false && row.occupied !== undefined)? '' : (row.occupied !== undefined)?  <UnParkModal slot={row}/>: ''}
                 
                        </TableCell>
                        
                        </TableRow>
                    )}
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> 
    </Container>
    )
   
  }