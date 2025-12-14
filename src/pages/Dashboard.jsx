import { useEffect, useState } from 'react'
import { MyChart } from '../cmps/MyChart.jsx'
import {toyService} from '../services/toy.service.local.js'
export function Dashboard(){
    const labels = toyService.getLabels()
    const [labelsStats,setLabelsStats] = useState([])
    const [inStockStats,setInStockStats] = useState([])
    useEffect(()=>{
        toyService.getLabelsStats()
        .then(setLabelsStats)
        toyService.getToysInStockStats()
        .then(setInStockStats)
    })
    
    return(
       <section className='dashboard'>
        <MyChart labels={labels} labelsCounts={labelsStats} title={'Count by labels'}/>
        <MyChart labels={labels} labelsCounts={inStockStats} title={'Count in stock by labels'}/>
        </section>
    ) 
}