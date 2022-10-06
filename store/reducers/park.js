import { createSlice } from "@reduxjs/toolkit";
import _ from 'lodash'

const initialState = {
    map:[
        { occupied: false, slot: 1, size: { value: 1, desc: 'MP' } },
        { occupied: false, slot: 2, size: { value: 0, desc: 'SP' } },
        { occupied: false, slot: 3, size: { value: 1, desc: 'MP' } },
        { occupied: false, slot: 4, size: { value: 1, desc: 'MP' } },
        { slot: 5, entryPoint: 'A' },
        { occupied: false, slot: 6, size: { value: 0, desc: 'SP' } },
        { occupied: false, slot: 7, size: { value: 2, desc: 'LP' } },
        { occupied: false, slot: 8, size: { value: 1, desc: 'MP' } },
        { occupied: false, slot: 9, size: { value: 1, desc: 'MP' } },
        { occupied: false, slot: 10, size: { value: 2, desc: 'LP' } },
        { slot: 11, entryPoint: 'B' },
        { occupied: false, slot: 12, size: { value: 0, desc: 'SP' } },
        { occupied: false, slot: 13, size: { value: 0, desc: 'SP' } },
        { occupied: false, slot: 14, size: { value: 2, desc: 'LP' } },
        { occupied: false, slot: 15, size: { value: 2, desc: 'LP' } },
        { slot: 16, entryPoint: 'C' },
        { occupied: false, slot: 17, size: { value: 0, desc: 'SP' } },
        { occupied: false, slot: 18, size: { value: 1, desc: 'MP' } },
        { occupied: false, slot: 19, size: { value: 2, desc: 'LP' } },
        { occupied: false, slot: 20, size: { value: 1, desc: 'MP' } }
      ],
      carTypes: [
        {size: 0, desc: 'S' },
        {size: 1, desc: 'M' },
        {size: 2, desc: 'L' }
      ], 
      parkInfo: {},
      receiptList: [],
      hasAvailableParkSlot: true,
      parkFee: 0,
      exceedingHoursFee: 0,
      exceedingHours: '00:00',
      flatRate: 40,
      totalHours: '00:00'
    
}

export const parkingStore = createSlice({
    name: 'parking',
    initialState: initialState,
    reducers: {
        park: (state, action) => {
            const {car, slot} = action.payload
            
            const filteredMap = _.filter(state.map, value => !value.entryPoint)
            const filterOccupied = _.filter(filteredMap, value => !value.occupied)
            const filterSize = _.filter(filterOccupied, (value)=> {
                if(car.size<=value.size.value){
                    return value
                }
            })
            if(!_.isEmpty(filterOccupied)){
                
                if(!_.isEmpty(filterSize)){
                    const closestSlot = filterSize.reduce((prevVal, curtVal) => {
                        let prevDiff = Math.abs(prevVal.slot - slot);
                        let curDiff = Math.abs(curtVal.slot - slot);
                     
                                // if(car.size <=curtVal.size.value  ){
                                    return curDiff<prevDiff ? curtVal : prevVal;
                                // } else{
                                //     return  prevVal 
                                // }
                    });
                   
                        const result = state.map.map((value) => {
                            if(closestSlot.slot === value.slot){
                                value.occupied = true
                                value.carSize = car
                                value.dateTimeParked = new Date().toUTCString()
                                state.parkInfo = value

                            }
                            return value
                        })
                        state.hasAvailableParkSlot = true
                        state.map= [...result]
                } else {
                    state.hasAvailableParkSlot = false
                }
                
            } else {
                state.hasAvailableParkSlot = false
            }
        },
        unpark: (state, action) => {
            const {details, slot} = action.payload
            const result = state.map.map((value)=>{
                if(slot === value.slot){
                    value.occupied = false
                    value.carSize = {}
                    value.dateTimeParked = ""
                }
                return value
            })
            
            state.receiptList= [details, ...state.receiptList]
            state.map= [...result]
           
        },
        getExceedingHours: (state, action) => {
            const {slot} = action.payload
            
            const hours = getTotalHours(slot.dateTimeParked)
            const totalHours = hours.totalHours
            if(totalHours> 3){
                state.exceedingHours = `${padTo2Digits(Math.floor(hours.getConvertedHours.hours)-3)}:${padTo2Digits(hours.getConvertedHours.minutes)}`

            }
            state.totalHours = `${padTo2Digits(Math.floor(hours.getConvertedHours.hours))}:${padTo2Digits(hours.getConvertedHours.minutes)}`
        },
        exceedingHoursFee: (state, action) => {
            
            const {slot} = action.payload
           
            const hours = getTotalHours(slot.dateTimeParked)
            const totalHours = hours.totalHours

            let charge = 0
            
            const hourlyCharge = 0
            if (slot.size.desc === 'SP'){
                hourlyCharge = 20 
            }else if  (slot.size.desc === 'MP'){
                hourlyCharge = 60 
            } else if  (slot.size.desc === 'LP'){
                hourlyCharge = 100
            }

            let remainigHours = totalHours

            if(totalHours> 3){
                if(totalHours>= 24){
                    let numOfdays = Math.floor(totalHours/24)
                    remainigHours -= (numOfdays*24)
                    charge+= (numOfdays * 5000) + remainigHours*hourlyCharge
    
                }
                const exceedingHours = totalHours - 3
    
                if(totalHours> 3 && totalHours<24){
                    charge+=hourlyCharge*exceedingHours
                }
                state.exceedingHoursFee = charge
            }
           
            
           

        },
        totalParkFees: (state, action) => {
            const { slot} = action.payload

            const hours = getTotalHours(slot.dateTimeParked)
            const totalHours = hours.totalHours
            let totalFee = 0
            if(totalHours>= 24){
                totalFee =  state.exceedingHoursFee
            } else {
                totalFee =  state.flatRate + state.exceedingHoursFee
            }
            
            state.parkFee = totalFee
           
      
        },
        addNewEntryPoint: (state, action) => {
            const slot = action.payload
            const alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            const entryPoint = _.filter(state.map, value => value.entryPoint)
            const letter = _.find(alphabet, (value)=>{
                const alpExist = _.find(entryPoint, {entryPoint: value})
                if(!alpExist){
                    return value
                }
            })
            // console.log('slot',slot)
            const result = state.map.map((value)=>{
                // console.log(value.slot)
                if(parseInt(slot )=== value.slot){
                    console.log(true)
                    value.entryPoint = letter
                    delete value.occupied
                    delete value.size 
                    delete value.carSize 
                    delete value.dateTimeParked 
                }
                // console.log(value.entryPoint)
                return value
            })

            state.map= [...result]
        }
        
    }
})

const getTotalHours = (date) =>{
     const dateDiffInMillSeconds = new Date() - new Date(date)
    // const dateDiffInMillSeconds = new Date() - new Date('Sun Oct 04 2022 0:07:05 GMT+0800')
    // const dateDiffInMillSeconds = new Date() - new Date('Sun Oct 03 2022 0:07:05 GMT+0800')
                            //return a rounded converted hours
    const getConvertedHours = convertMsToHM(dateDiffInMillSeconds)
    const totalHours = Math.round(getConvertedHours.hours)

    return {totalHours: totalHours, getConvertedHours:getConvertedHours}
}

const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
  }
  

const convertMsToHM = (milliseconds)=> {
    let seconds = milliseconds / 1000
    let minutes = seconds / 60
    let hours = minutes / 60
  
    minutes = Math.floor(minutes) % 60;


    return {hours: hours, minutes: minutes}
  }

export const {
    park, 
    unpark, 
    totalParkFees, 
    exceedingHoursFee, 
    getExceedingHours, 
    addNewEntryPoint
} = parkingStore.actions

export const getMap= (state) => state.parking.map;

export default parkingStore.reducer