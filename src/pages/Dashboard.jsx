import { useEffect, useState } from 'react'
import { MyChart } from '../cmps/MyChart.jsx'
import {toyService} from '../services/toy.service.js'
export  function Dashboard(){
    const labels = toyService.getLabels()
    const [labelsStats,setLabelsStats] = useState([])
    const [inStockStats,setInStockStats] = useState([])
    useEffect(()=>{
        loadStats()
    })
    async function loadStats() {
        try{
        const labelsStats = await toyService.getLabelsStats()
        setLabelsStats(labelsStats)
        const toysInStockStats = await toyService.getToysInStockStats()
        setInStockStats(toysInStockStats)
        }
        catch{
            console.log('cannot load stats');
            
        }
        
    }
    return(
       <section className='dashboard'>
        <MyChart labels={labels} labelsCounts={labelsStats} title={'Count by labels'}/>
        <MyChart labels={labels} labelsCounts={inStockStats} title={'Count in stock by labels'}/>
        </section>
    ) 
}