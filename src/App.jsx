import { useState, useEffect } from 'react';
import './App.css';
import LeagueBoard from './components/LeagueBoard';
import Summary from './components/Summary';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leagues, setLeague] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [userInput, setUserInput] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);


  const countries = ['England', 'Spain', 'Germany', 'Italy', 'France', 'Portugal', 'The Netherlands'];

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
        {id: '4337', name: 'Dutch Eredivisie', country: 'The Netherlands'}
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

      const matchesSearch = searchQuery === '' || 
      leagueData.League.toLowerCase().includes(searchQuery.toLowerCase()) || 
      leagueData.Country.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCountry = selectedCountries.length === 0 || 
          selectedCountries.includes(leagueData.Country);
    

    return matchesSearch && matchesCountry;

   }) || [];

    const handleCountryChange = (country) => {
      setSelectedCountries(prev => {
        if(prev.includes(country)){
          return prev.filter(c => c !== country);
        } else {
          return [...prev, country];
        }
      });
    };

    const clearCountryFilter = () => {
      setSelectedCountries([]);
    }

   const handleSearch = () => {
      if(userInput !== searchQuery) setSearchQuery(userInput);
   }

  return (
    <div className='whole-page'>
        <div className="first-section">
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
        <label htmlFor="continent">Filter by Country:</label>
        <div className="checkbox-group">

          {countries && countries.map(country => (
            <label key={country} className='checkbox-label'>
              <input 
              type="checkbox"
              checked={selectedCountries.includes(country)}
              onChange={() => handleCountryChange(country)}
              />
              {country}
            </label>
          ))}
        </div>
           <div className="checkbox-controls">
            <button onClick={clearCountryFilter} className='clear-btn'>
              Clear All
            </button>
            <span>Selected: {selectedCountries.length}</span>
          </div>
      </div>  
      </div>
      {isLoading && <p>Loading leagues...</p> }
      {error && <p>Error: {error}</p> }
      <LeagueBoard leagues={filteredLeagues} />
      <Summary leagues={filteredLeagues} /> 
        </div>
      <div className="charts-container">
          <BarChart data={filteredLeagues} />
          <LineChart data={filteredLeagues} />
      </div>
      </div>
      
  )
  
}

export default App;

