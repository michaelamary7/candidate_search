import React, { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch random candidates from the API
  useEffect(() => {
    const fetchCandidates = async () => {
      const results = await searchGithub();
      setCandidates(results);
    };

    fetchCandidates();
    
    // Load saved candidates from localStorage
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const currentCandidate = candidates[currentCandidateIndex];

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Please enter a username.');
      return;
    }

    setError(null);
    const user = await searchGithubUser(searchTerm);

    if (!user.id) {
      setError('User not found.');
    } else {
      setCandidates([user]);
      setCurrentCandidateIndex(0);
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      // Check if the candidate is already saved
      const isAlreadySaved = savedCandidates.some((saved) => saved.id === currentCandidate.id);

      if (!isAlreadySaved) {
        const updatedSavedCandidates = [...savedCandidates, currentCandidate];
        setSavedCandidates(updatedSavedCandidates);

        // Save to localStorage
        localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      }
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    if (currentCandidateIndex < candidates.length - 1) {
      setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
    } else {
      setCandidates([]);
      setCurrentCandidateIndex(0);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <div>
        <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e: { target: { value: any; }; }) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {currentCandidate ? (
        <div>
          <h2>Candidate Information</h2>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} />
          <p>Name: {currentCandidate.name || 'N/A'}</p>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || 'N/A'}</p>
          <p>Email: {currentCandidate.email || 'N/A'}</p>
          <p>Company: {currentCandidate.company || 'N/A'}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noreferrer">
            GitHub Profile
          </a>
          <div>
            <button onClick={saveCandidate}>+</button>
            <button onClick={nextCandidate}>-</button>
          </div>
        </div>
      ) : (
        <p>No more candidates to review.</p>
      )}

      {/* Saved Candidates Section */}
      <div>
        <h2>Saved Candidates</h2>
        {savedCandidates.length > 0 ? (
          <ul>
            {savedCandidates.map((candidate) => (
              <li key={candidate.id}>
                <img src={candidate.avatar_url} alt={candidate.login} />
                <p>{candidate.name || 'N/A'}</p>
                <p>{candidate.login}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No candidates saved yet.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateSearch;