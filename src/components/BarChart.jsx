import { Bar } from 'react-chartjs-2';


function BarChart({ data }) {
    console.log("BarChart received data:", data);
    const transformData = () => {
        const labels = data.slice(0,7).map((league) => league.value.League);
        const points = data.slice(0,7).map((league) => parseInt(league.value.Standing?.table[0]?.intPoints) || 0);
        const teamNames = data.slice(0,7).map((league) => league.value.Standing?.table[0]?.strTeam);
        return {
             labels: labels,
             datasets: [{
                label: 'Champion Points',
                data: points, 
                teamNames: teamNames,
                backgroundColor: 'rgba(54,162,235,0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
             }]
        }
    }

    const options = {
        responsive: true, 
        plugins: {
            title: {
                display: true, 
                text: 'League Champions Comparison',
                color: 'rgba(255, 255, 255, 0.87)'
            },
            tooltip: {
                callbacks: {
                    label: function(context) { 
                        const teamName = context.dataset.teamNames[context.dataIndex];
                        return `${teamName}: ${context.parsed.y} points`;
                    }
                } 
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }




    if (!data || data.length === 0) {
        return (
            <div style={{textAlign: 'center', padding: '40px'}}>
                <p>No league data available for comparison</p>
            </div>
        )
    }
        const chartData = transformData();

    return (
        <div
        style={{height: '400px',
                width: '100%',
                margin:'20px 0',
                padding: '0 20px'
        }}
        >
            <Bar data={chartData} options={options} />
        </div>
    )
}   


export default BarChart;