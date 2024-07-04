"use client"

import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement ,Tooltip, Legend} from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const data ={
        datasets:[
            {
                label: 'Banks',
                data:[1234,4567,7890],
                backgroundColor:['#0747b6','#22265d8','#2f91fa']
            }
        ],
        labels:['Bank 1','Bank 2','Bank 3']
    }
  return (
    <Doughnut data={data}
    options={{
        plugins:{
            legend:{
                display:false
            }
        }
    }} />
  )
}

export default DoughnutChart