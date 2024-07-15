"use client"

import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement ,Tooltip, Legend} from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}:DoughnutChartProps) => {
    const accountName = accounts.map((account)=>account.name);
    const balances = accounts.map((account)=>account.currentBalance)
    const data ={
        datasets:[
            {
                label: 'Banks',
                data:balances,
                backgroundColor:['#0747b6','#22265d8','#2f91fa']
            }
        ],
        labels:accountName
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