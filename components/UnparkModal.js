
import _ from "lodash";

import {intervalToDuration} from "date-fns";
import {
    Container,
    Button,
    Box,
    Typography,
    Modal,
    Stack,
    Divider
    } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';
import React, {useState} from "react";

import { unpark, totalParkFees, exceedingHoursFee , getExceedingHours} from "../store/reducers/park";

export const UnParkModal = (props) => {
    const dispatch = useDispatch();
    const exceedingHoursCharge = useSelector(state =>state.parking.exceedingHoursFee)
    const exceedingHours = useSelector(state =>state.parking.exceedingHours)
    const totalFees = useSelector(state => state.parking.parkFee)
    const totalHours = useSelector(state => state.parking.totalHours)
    const {slot} = props
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
            dispatch(exceedingHoursFee({slot: slot}))
            dispatch(getExceedingHours({slot:slot}))
            dispatch(totalParkFees({slot:slot}))
        setOpen(true);}
    const handleClose = () => setOpen(false);

    const handleSubmit = () => {

        const details={
            parkingSlot: slot.slot,
            dateParked: slot.dateTimeParked,
            dateParkedEnded: new Date().toUTCString(),
            parkingSlotSize: slot.size.desc,
            carType: slot.carSize.desc,
            exceedingHoursCharge : exceedingHoursCharge ,
            exceedingHours: exceedingHours ,
            totalFees: totalFees,
            totalHours :totalHours,
        }
        dispatch(unpark({details:details, slot:slot.slot}))
        setOpen(false)
    };
    const diff=  intervalToDuration({
        start: new Date(slot.dateTimeParked),
        end: new Date()
    })
    const hours = (diff.hours).toString().padStart(2, '0')
    const minutes = (diff.minutes).toString().padStart(2, '0')
  
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        borderRadius: 4,
        boxShadow: 24,
        background: '#556cd6'
        // p: 4,
      };
   
    return(
        <div>
            <Button variant="contained" onClick={handleOpen} >
                Unpark
            </Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style} textAlign= 'center'> 
            <Box sx={{borderRadius: 2, p: 3}}>
                <Typography sx={{color: 'white'}} variant="h5" textAlign= 'left' component="div" >
                    Parking Payment Details
                </Typography>
            </Box>
                
            <Stack sx={{background: 'white', padding: 2}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', }} m={1}>
                  <Typography  variant="subtitle1" gutterBottom>
                      Parking Slot Type: {slot.size.desc}
                  </Typography>
                </Box>
                <Divider />
                <Box m={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                  <Typography variant="subtitle1" gutterBottom>
                    Car Type: {slot.carSize.desc}
                  </Typography>
                </Box>
                <Divider />
                <Box m={1} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Typography textAlign='right' variant="subtitle2" gutterBottom >
                    {slot.dateTimeParked}
                    </Typography>
                    <Typography textAlign='left' variant="subtitle1" gutterBottom >
                    Parking fees
                    </Typography>
                    
                   
                    <Box m={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Parking Rate {'(3 hours)'}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php 40.00
                        </Typography>
                    </Box>
                    <Box m={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            hours consumed: {totalHours} hrs
                        </Typography>
                    
                    </Box>
                    <Box m={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            exceeding hours: {exceedingHours} hrs/min
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php {exceedingHoursCharge}.00
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box m={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Total park fees
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php {totalFees}.00
                        </Typography>
                    </Box>
                </Box>
              </Stack>
              <Container sx={{display: 'flex', justifyContent: 'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,  background: 'white'}}>
                
                <Button onClick={handleSubmit } sx={{m:2}} className="button" variant="contained">Unpark</Button>
                
                <Button onClick={handleClose} sx={{backgroundColor: 'red', m:2}} className="button" variant="contained">Cancel</Button>
            </Container>
                
            </Box>
        </Modal>
        </div>
    )
}