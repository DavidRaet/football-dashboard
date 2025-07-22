import { useLocation, useParams, Link } from "react-router";
function Standings() {
    const { leagueName } = useParams();
    const location = useLocation();
    const leagueData = location.state?.leagueData;



    return (
        <div className="standings">
            <div className="standings-header">
            <h2>{leagueName}</h2>
            <Link to={'/'}>
                go back
            </Link>
            </div>


            {leagueData && leagueData.Standing.table ?
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Team</th>
                            <th>Games Played</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(leagueData.Standing.table.map((team) => {
                            const rank = parseInt(team.intRank);
                            const matchesPlayed = parseInt(team.intPlayed);
                            const wins = parseInt(team.intWin);
                            const draws = parseInt(team.intDraw);
                            const losses = parseInt(team.intLoss);
                            const points = parseInt(team.intPoints);
                            return (
                                <tr>
                                    <td>{rank}</td>
                                    <td>
                                        <img className="team-logo" src={team.strBadge} alt={`Image foe ${team.strTeam}`} />{team.strTeam}
                                    </td>
                                    <td>{matchesPlayed}</td>
                                    <td>{wins}</td>
                                    <td>{draws}</td>
                                    <td>{losses}</td>
                                    <td>{points}</td>
                                </tr>
                            )
                        }
                        ))
                        }
                    </tbody>
                </table>
                : (
                    <div className="no-data">
                        <h3>Sorry, data is unavailable for this league</h3>
                        <p>Please try another league</p>
                    </div>
                )
            }


        </div>
    )
}

export default Standings;
