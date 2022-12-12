import React, { useState } from 'react';
import { Board, Button, Container, Row, Word } from './components';
import { DicePosition, WORD_LIST } from './utils/types';

import './App.css';

const MIN_LETTERS = 3;

const cache = new Set();
const usedLetterPositions = new Set<string>();

function App() {
	const [word, setWord] = useState('');
	const [wordList, setWordList] = useState<Array<string>>([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentLetter, setCurrentLetter] = useState<DicePosition>({
		letter: '',
		rowIndex: null,
		columnIndex: null,
	});

	const checkPosition = (rowIndex: number, columnIndex: number) => {
		if (currentLetter.rowIndex != null && currentLetter.columnIndex != null) {
			if (
				(rowIndex === currentLetter.rowIndex ||
					rowIndex === currentLetter.rowIndex - 1 ||
					rowIndex === currentLetter.rowIndex + 1) &&
				(columnIndex === currentLetter.columnIndex ||
					columnIndex === currentLetter.columnIndex - 1 ||
					columnIndex === currentLetter.columnIndex + 1)
			) {
				return true;
			}
		}
		return false;
	};

	const handleUpdateLetter = (letter: string, rowIndex: number | null, columnIndex: number | null) => {
		setCurrentLetter((prevState) => ({
			...prevState,
			letter,
			rowIndex,
			columnIndex,
		}));
	};

	const handleWordUpdate = (letter: string, rowIndex: number | null, columnIndex: number | null) => {
		const position = `${rowIndex}-${columnIndex}`;
		const newWord = word + letter;

		usedLetterPositions.add(position);
		handleUpdateLetter(letter, rowIndex, columnIndex);
		setWord(newWord);
	};

	const handleSelect = (letter: string, rowIndex: number, columnIndex: number) => {
		const position = `${rowIndex}-${columnIndex}`;
		if (!currentLetter.letter.length) {
			handleWordUpdate(letter, rowIndex, columnIndex);
			return;
		}

		if (usedLetterPositions.has(position) || !checkPosition(rowIndex, columnIndex)) {
			return;
		} else {
			handleWordUpdate(letter, rowIndex, columnIndex);
		}
	};

	const handleClear = () => {
		cache.clear();
		usedLetterPositions.clear();
		handleUpdateLetter('', null, null);
		setWord('');
		setError(false);
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (word.length < MIN_LETTERS) {
			setLoading(false);
			setError(true);
			return;
		}

		// If dictionaryapi is down, use utils/wordList.ts
		const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

		setError(false);

		if (cache.has(url)) {
			setLoading(false);
			setError(true);
			return;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.title === 'No Definitions Found') {
				setError(true);
			} else {
				console.log('SUCCESS');
				cache.add(url);
				usedLetterPositions.clear();
				setWordList((prev: WORD_LIST) => [...prev, word]);
				handleUpdateLetter('', null, null);
				setWord('');
				setError(false);
			}
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<Row>
			<Container>
				<Word text={word} isError={error} />
				<Board handleSelect={handleSelect} usedLetterPositions={usedLetterPositions} />
				<Row>
					<Button disabled={loading} label="Clear" handleSubmit={handleClear} />
					<Button disabled={loading} label="Submit" handleSubmit={handleSubmit} />
				</Row>
			</Container>

			{wordList.length > 0 && (
				<Container>
					{wordList.map((item, index) => (
						<h3 key={index}>{item}</h3>
					))}
				</Container>
			)}
		</Row>
	);
}

export default App;
