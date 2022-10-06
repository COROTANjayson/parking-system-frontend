
import React,{useEffect, useState} from "react";
import {
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select, MenuItem,
  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {  park } from "../store/reducers/park";

import _ from 'lodash'
export const ParkingForm = (props) => {
  const dispatch = useDispatch()
  
  const [entPoint, setEntPoint] = useState('')
  const [carSize, setCarSize] = useState('S')
  const hasAvailableParkSlot = useSelector(state => state.parking.hasAvailableParkSlot)
  const parkInfo = useSelector(state => state.parking.parkInfo)
  const carTypes = useSelector(state => state.parking.carTypes)
  const [parkSlot, setParkSlot] = useState({})
  const [isParking, setIsParking] = useState(false)
  
  useEffect(()=>{
    if(parkInfo){
        setParkSlot(parkInfo)
    }
  })
  const handleEntryPoint = (event) => {
    const {value} = event.target
    setEntPoint(
      value
    )  
    setIsParking(false)
}
  const handleCarSize = (event) => {
    const {value} = event.target
    setCarSize(
      value
    )  
    setIsParking(false)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const carSize = _.find(carTypes, {'desc': data.get('carSize')})
    
    dispatch(park({car: carSize, slot: data.get('entryPoint'), }))
    setIsParking(true)
  };
  
  const {map} = props
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
          <Typography component="div" variant="h4">
            Parking System
          </Typography>
          <Typography component="div" variant="h6" sx={{color: 'red'}}>
            {(!hasAvailableParkSlot)? 'No Available Parking Slot': ''}
          </Typography>
    
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 300, }}>
        
        <FormControl fullWidth margin="normal">
            <InputLabel id="entryPoint">Choose Entry Point</InputLabel>
            <Select
              required
              labelId="entryPoint"
              id="entryPoint"
              name="entryPoint"
              value={entPoint}
              // fullWidth
              label="Entry Point"
              onChange={handleEntryPoint}
            >
              {map.map((data, i)=>{
                  if(data.entryPoint){
                    return( 
                      <MenuItem key={i} value={data.slot}>{data.entryPoint}</MenuItem>
                    )
                  }
              })}
            </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
            <InputLabel id="carSize">Car Size</InputLabel>
            <Select
              labelId="carSize"
              id="carSize"
              name="carSize"
              value={carSize}
              
              label="Employee Type"
              onChange={handleCarSize}
            >
              <MenuItem value='S'>Small Car</MenuItem>
              <MenuItem value='M'>Medium Car</MenuItem>
              <MenuItem value='L'>Large Car</MenuItem>\
            </Select>
      </FormControl>
      {
        (isParking)? 
            <Box m={1} p={2} sx={{display: 'flex', background: '#bfdbfe', borderRadius: 5}}>
                <Typography textAlign='center' variant="subtitle1" gutterBottom>
                    Parked at slot number {parkSlot.slot}
                </Typography>
            </Box> : ''}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
        >
          Park
        </Button>
  </Box>
</Box>
  )
}
