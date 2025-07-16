import { useState, useEffect } from 'react';
import './App.css';
import LeagueBoard from './components/LeagueBoard';
import Summary from './components/Summary';
import axios from 'axios';

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leagues, setLeague] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userInput, setUserInput] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('All');


  const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

  const getEndpoints = (leagueId) => ({
    table: `${BASE_URL}/lookuptable.php?l=${leagueId}&s=2024-2025`
  });


  useEffect(() => {
    const leagueCodes = [
        {id: '4328', name: 'Premier League', country: 'England'},
        {id: '4335', name: 'La Liga', country: 'Spain'},
        {id: '4331', name: 'Bundesliga', country: 'Germany'}, 
        {id: '4332', name: 'Serie A', country: 'Italy'},
        {id: '4334', name: 'Ligue 1', country: 'France'},
        {id: '4344', name: 'Primeira Liga', country: 'Portugal'},
        {id: '4337', name: 'Dutch Eredivisie', country: 'The Netherlands'},
        {id: '4633', name: 'Japanese J1 League', country: 'Japan'},
        {id: '4346', name: 'MLS', country: 'United States'},
        {id: '4351', name: 'Brazilian Serie A', country: 'Brazil'}    
        ] 
      console.log("Total leagues to fetch:", leagueCodes.length);
      setIsLoading(true);
      const fetchData = async () => {
        const promises = leagueCodes.map(async (league) => {
        try {
        const endpoints = getEndpoints(league.id);
        
        const tableResponse = await axios.get(endpoints.table);
        
        const leagueObject = {
          League: league.name,
          Country: league.country,
          Standing: tableResponse.data,
          topScorer: null 
        }
        
        return leagueObject;
        } catch (error) {
          setError(error.message);
          return {error: error.message, league: league.name}
        }
      })
      const allLeagues = await Promise.allSettled(promises);
      setLeague(allLeagues);
      setIsLoading(false);
      } 
      fetchData();
    },[])

    const filteredLeagues = leagues?.filter((league) => { 
      console.log("League status:", league.status);
      if (league.status !== "fulfilled") return false;

      const leagueData = league.value;

      const matchesSearches = searchQuery === '' || 
      leagueData.League.toLowerCase().includes(searchQuery.toLowerCase()) || 
      leagueData.Country.toLowerCase().includes(searchQuery.toLowerCase())
   

    const continentMap = {
      'Europe': ['England', 'Spain', 'Germany', 'Italy', 'France', 'Portugal', 'The Netherlands'],
      'North America': ['United States'],
      'South America': ['Brazil'],
      'Asia': ['Japan']
    };

    let matchesContinent = true; 

    if(selectedContinent !== 'All'){
      matchesContinent = continentMap[selectedContinent]?.includes(leagueData.Country);
    }

    return matchesSearches && matchesContinent;

   }) || [];

   const handleSearch = () => {
      if(userInput !== searchQuery) setSearchQuery(userInput);
   }

  return (
    <div className='whole-page'>
      <div className="controls">
        <div className="search-section">
        <label htmlFor="search">🔍 Search Leagues:</label>
        <input 
          id='search'
          type="text"
          placeholder='Search by Country or League...'
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      <div className="filter-section">
        <label htmlFor="continent">🌍Filter by Continent:</label>
        <select 
               id="continent"
               value={selectedContinent}
               onChange={(e) => setSelectedContinent(e.target.value)}
        >

          <option value="All">All Continents</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="South America">South America</option>
          <option value="Asia">Asia</option>
          </select>
      </div>
      </div>
      {isLoading && <p>Loading leagues...</p> }
      {error && <p>Error: {error}</p> }
      <LeagueBoard leagues={filteredLeagues} />
      <Summary leagues={filteredLeagues} />
    </div>
  )
  
}

export default App;
