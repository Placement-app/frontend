import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');
import { FaExternalLinkAlt } from "react-icons/fa";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function AdminTopClub() {
    const options = {
        animationEnabled: true,
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name} {y}",
            yValueFormatString: "#,###0.0'⭐'",
            dataPoints: [
                { name: "KZILLA", y: 3.7 },
                { name: "NEXT GEN AI", y: 4.2 },
                { name: "IEEE CISSC", y: 4.8 },
                { name: "IEEE", y: 4.3 },
                { name: "ROBOCON", y: 3.4 }
            ]
        }],
    }

    return (

        <div className='w-1/2'>
            <h4 className='text-2xl font-bold text-center'>Top Rated Clubs</h4>
            <CanvasJSChart options={options} />
            <div className='flex justify-center mb-10'>
                <button className='bg-black mt-5 rounded px-3 py-1 text-white text-sm flex justify-center items-center'>View all<FaExternalLinkAlt className='ml-2' />
                </button>
            </div>
        </div>

    )
}
