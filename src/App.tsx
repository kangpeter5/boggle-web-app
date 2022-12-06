import React, { useCallback, useState } from 'react';
import { Board, Word } from './components';
import './App.css';

function App() {
	const [word, setWord] = useState('');
	const [error, setError] = useState(false);

	const handleError = (err: boolean) => {
		setError(err);
	};

	const handleWordUpdate = useCallback(
		(letter: string) => {
			const newWord = word + letter;
			setWord(newWord);
		},
		[word]
	);

	return (
		<div className="App">
			<Word text={word} isError={error} />

			<Board />
		</div>
	);
}

export default App;
