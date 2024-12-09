import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

const CandidateSearch = () => {
  const [Candidates, setCandidates] = useState([]);
  const [currentCandidate, setCurrentCandidateIndex] = useState(null);
  const [SavedCandidates, setSavedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultsIndex, setSearchResultsIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
        const results = await searchGithub();
        setCandidates(results);
      };

  fetchCandidates = (); 



  return <h1>CandidateSearch</h1>;
};

export default CandidateSearch;
