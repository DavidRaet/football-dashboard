import { Link } from "react-router";
const LeagueBoard = ({leagues}) => {
    const topScorer = [
        {league: "La Liga", player: "Kylian Mbappe"},
        {league: "Ligue 1", player: "Ousmane Dembélé"},
        {league: "Premier League", player: "Mohamed Salah"},
        {league: "Serie A", player: "Lautaro Martínez"},
        {league: "Bundesliga", player: "Harry Kane"},
        {league: 'Primeira Liga', player: 'Viktor Gyökeres'},
        {league: 'Dutch Eredivisie', player: 'Sem Steijn'},
        {league: 'MLS', player: 'Lionel Messi'},
        {league: 'Japanese J1 League', player: 'Léo Pereira'},
        {league: 'Brazilian Serie A', player: 'Kaio Jorge'}
    ]
        leagues.forEach((league, index) => {
        console.log(`League ${index}:`, league);
    })
    return (
        <div className="league-board">
            <h1>League Overview</h1>
            <table>
            <thead>
            <tr>
                <th>League</th>
                <th>Country</th>
                <th>Top Scorer</th>
                <th>Top Team</th>
            </tr>
            </thead>
            <tbody>
            {leagues && 
                leagues
                .filter((league) => league.status === "fulfilled")
                .map((league) => league.value)
                .slice(0,7)
                .map((leagueData) => {
                    return (
                        <tr key={leagueData.League}>
                            <td>
                                <Link to={`/leagues/${leagueData.League}`} state={{leagueData : leagueData}}>
                                {leagueData.League}
                                </Link>
                            </td>
                            <td>
                                {leagueData.Country}
                            </td>
                            <td>    
                                {topScorer.filter((topPlayer) => leagueData.League === topPlayer.league)[0]?.player}
                            </td>
                            <td>
                                {leagueData.Standing?.table?.[0]?.strTeam || "Data unavailable"}
                            </td>
                         </tr>
                    
                    )
                })
            }
            </tbody>
            </table>
        </div>
    )
}

export default LeagueBoard


