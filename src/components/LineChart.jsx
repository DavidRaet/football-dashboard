import { Line } from "react-chartjs-2";


function LineChart({ data }) {
    const transformData = () => {
        const positions = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

        const datasets = data.slice(0,7).map((league, index) => {

        const leagueName = league.value.League;

        const top10Points = league.value.Standing?.table
                                ?.slice(0,6)
                                ?.map((team) => parseInt(team.intPoints)) || [];

        const colors = [
                'rgb(255, 99, 132)',   // Red
                'rgb(54, 162, 235)',   // Blue  
                'rgb(255, 205, 86)',   // Yellow
                'rgb(75, 192, 192)',   // Green
                'rgb(153, 102, 255)',  // Purple
                'rgb(255, 159, 64)',   // Orange
                'rgb(199, 199, 199)',  // Grey
                'rgb(83, 102, 147)'    // Dark Blue
        ]

        return {
            label: leagueName ,
            data: top10Points, 
            borderColor: colors[index % colors.length],
            backgroundColor: colors[index % colors.length] + '20',
            tension: 0.3,
            pointRadius: 4, 
            pointHoverRadius: 6
        };
     });

        return {
            labels: positions,
            datasets: datasets
        };
    };

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'League Competitiveness Comparison',
                font: {
                    size: 18, 
                    weight: 'bold'
                }, 
                color: 'rgba(255, 255, 255, 0.87)',
                padding: 20
            }, 
            legend: {
                position: 'top', 
                labels: {
                    usePointStyle: true, 
                    padding: 20,
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false, 
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#ddd',
                borderWidth: 1
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'League Position', 
                    font: {
                        size: 14, 
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.87)'
                }
            },
            y: {
                title: {
                    display: true, 
                    text: 'Points',
                    font: {
                        size: 14, 
                        weight: 'bold'
                    }
                },
                beginAtZero: false,
                
                grid: {
                color: 'rgba(255, 255, 255, 0.43)'
                }, 
            
                ticks: {
                stepSize: 5
            }
        }

        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    if (!data || data.length === 0) {
        return (
            <div style={{textAlign: 'center', padding: '40px'}}>
                <p>No league data available for comparison</p>
            </div>
        )
    }

    const chartData = transformData();

    return (
        <div style={{height: '500px',
                width: '70%',
                margin:'20px 0',
                padding: '0 20px'
        }}
            >
            <Line data={chartData} options={options} />
        </div>
    )
}   

export default LineChart;
