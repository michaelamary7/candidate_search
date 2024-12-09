import React, { useEffect, useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

interface SavedCandidatesProps {
  // Initially empty savedCandidates as props
  savedCandidates: Candidate[];
}

const SavedCandidatesComponent: React.FC<SavedCandidatesProps> = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // Load saved candidates from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  // Update localStorage whenever savedCandidates state changes
  useEffect(() => {
    if (savedCandidates.length > 0) {
      localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
    }
  }, [savedCandidates]);

  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <ul>
          {savedCandidates.map((candidate) => (
            <li key={candidate.id}>
              <img
                src={candidate.avatar_url}
                alt={candidate.login}
                style={{ width: '50px', borderRadius: '50%' }}
              />
              <p>Name: {candidate.name || 'N/A'}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>Email: {candidate.email || 'N/A'}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <a href={candidate.html_url} target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates have been saved yet.</p>
      )}
    </div>
  );
};

export default SavedCandidatesComponent;