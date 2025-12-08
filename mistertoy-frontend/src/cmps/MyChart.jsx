import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
import { Doughnut, PolarArea } from 'react-chartjs-2';

export function MyChart({labels,labelsCounts,title}) {
    const options = {
        plugins: {
            legend: {
                position: 'right',
                rtl: true,
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 20,
                }
            },
            tooltip: {
                backgroundColor: 'red'
            }

        },
    }
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: labelsCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        
        <section className="my-chart">
            <h3>{title}</h3>
            <Doughnut options={options} data={data} />
        </section>
    )


}

