
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

import {  Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect, useState} from "react";
// import  {
//     removeCompany
// } from '../../store/reducers/company';
// import { removeEmployee } from "../../store/reducers/employee";
// import { removeEmployer } from "../../store/reducers/employer";
import { unpark, totalParkFees, exceedingHoursFee , getExceedingHours} from "../store/reducers/park";

export const ViewReceiptsModal = (props) => {
    const dispatch = useDispatch();
    const exceedingHoursCharge = useSelector(state =>state.parking.exceedingHoursFee)
    const exceedingHours = useSelector(state =>state.parking.exceedingHours)
    const totalFees = useSelector(state => state.parking.parkFee)
    const totalHours = useSelector(state => state.parking.totalHours)
    const {slot} = props
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);}
    const handleClose = () => setOpen(false);

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
      };
   
    return(
        <div>
            <Button onClick={handleOpen} >
                View
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
                    Receipt Details
                </Typography>
            </Box>
                
            <Stack sx={{background: 'white', padding: 2}}>
                <Box sx={{display: 'flex' }} m={1}>
                  <Typography  variant="subtitle1" gutterBottom>
                      Parking Slot Type: 
                  </Typography>
                  <Typography  variant="subtitle1"  sx={{ fontWeight: 'bold', marginLeft: 1 }} gutterBottom>
                      Parking Slot Type: {slot.parkingSlotSize}
                  </Typography>
                </Box>
                <Divider />
                <Box m={0.5} sx={{display: 'flex', }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Car Type:
                  </Typography>
                  <Typography variant="subtitle1"  sx={{ fontWeight: 'bold', marginLeft: 1 }} gutterBottom>
                    {slot.carType}
                  </Typography>
                </Box>
                <Divider />
                <Box  m={0.5} sx={{display: 'flex'}}>
                    <Typography variant="subtitle1" gutterBottom>
                            Time Parked:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: 1 }}  gutterBottom>
                            {new Date(slot.dateParked).toLocaleString()}
                    </Typography>
                </Box>
                <Box  m={0.5} sx={{display: 'flex', }}>
                    <Typography variant="subtitle1" gutterBottom>
                            Time Ended:
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginLeft: 1 }}  gutterBottom>
                            {new Date(slot.dateParkedEnded).toLocaleString()}
                    </Typography>
                </Box>
                <Box m={0.5} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Typography textAlign='center' sx={{ fontWeight: 'bold', fontSize: 18 }} variant="subtitle1" gutterBottom >
                        Parking fee
                    </Typography>
                   
                    <Box m={0.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Parking Rate {'(3 hours)'}
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php 40.00
                        </Typography>
                    </Box>
                    <Box m={0.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            {/* hours consumed: {hours}:{minutes} /3 hours */}
                            hours consumed: {slot.totalHours} hrs
                        </Typography>
                    
                    </Box>
                    <Box m={0.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            exceeding hours: {slot.exceedingHours} hrs/min
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php {slot.exceedingHoursCharge}.00
                        </Typography>
                    </Box>
                    <Divider/>
                    <Box m={0.5} sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="subtitle1" gutterBottom>
                            Total park fees
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Php {slot.totalFees}.00
                        </Typography>
                    </Box>
                </Box>
              </Stack>
              <Container sx={{display: 'flex', alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20,  background: 'white'}}>
                
                <Button onClick={handleClose} sx={{backgroundColor: 'red', m:2}} className="button" variant="contained">Cancel</Button>
            </Container>
                
            </Box>
        </Modal>
        </div>
    )
}