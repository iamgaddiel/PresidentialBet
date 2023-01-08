import { IonContent, IonPage, IonSearchbar } from '@ionic/react'
import { close } from 'ionicons/icons'
import React, { useState } from 'react'
import Header from '../../components/Header'
// import Chart from 'chartjs/auto'

import './Stats.css'


// const showChart = () => {
    // const [chartData, setChartData] = useState()
    // const [chartOption, setChartOption] = useState()


    // new Chart(ctx, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //         datasets: [{
    //             label: '# of Votes',
    //             data: [12, 19, 3, 5, 2, 3],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             y: {
    //                 beginAtZero: true
    //             }
    //         }
    //     }
    // });
// }


const Stats = () => {
    return (
        <IonPage>
            <Header title="Election Statistics" />
            <IonContent className='ion-padding' fullscreen>
                <section className="">
                    <h5>Presidential Stats  </h5>
                    <ul>
                        <li>Parties: 6</li>
                        <li>Candidates: 6</li>
                    </ul>
                </section>

                <section className="cart_wrapper">

                </section>
            </IonContent>
        </IonPage>
    )
}

export default Stats