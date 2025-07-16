const Summary = ({leagues}) => {
        const validLeagues = leagues
        ?.filter(league => league.status === "fulfilled")
        ?.map(league => league.value)
        ?.filter(leagueData => leagueData.Standing?.table?.[0]) || [];

    const totalLeagues = validLeagues.length;

    const averageLeaderPoints = validLeagues.length > 0 ?
    (validLeagues.reduce((sum, league) => {
        const points = parseInt(league.Standing.table[0].intPoints);
        return sum + points;
    }, 0) / validLeagues.length).toFixed(1) : 0;

    const highestScoringTeam = validLeagues.reduce((highest, league) => {
        const currentPoints = parseInt(league.Standing.table[0].intPoints);
        const highestPoints = parseInt(highest.points);

        if (currentPoints > highestPoints){
            return {
                team: league.Standing.table[0].strTeam,
                points: currentPoints,
                league: league.League
            };
        }
        return highest;
    }, {team: "N/A", points: '0', league: 'N/A'});
    return(
        <div className="summary-board">
            <h3>📊 Key Statistics:</h3>
            <div className="total-leagues">
                <h4>Total Leagues with Data</h4>
                <p>{totalLeagues} out of {leagues?.length}</p>
            </div>
            <div className="average-points">
                <h4>Average Points of All Top Teams</h4>
                <p>{averageLeaderPoints}</p>
            </div>
            <div className="highest-team">
                <h4>Highest Scoring Team</h4>
                <p>Team: {highestScoringTeam.team}</p>
                <p>Points: {highestScoringTeam.points}</p>
                <p>League: {highestScoringTeam.league}</p>
            </div>



            
        </div>
    )
}

export default Summary