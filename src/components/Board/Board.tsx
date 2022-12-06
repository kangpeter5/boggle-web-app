import React, { useState } from 'react';
import { Boggle, Button, Container, Row, Word } from '..';
import { StyledBoard } from './Board.styles';

import { WORD_LIST } from '../../utils/types';

// BOARD example
const BOARD_TEST = [
	['G', 'I', 'Z', 'A'],
	['U', 'E', 'K', 'X'],
	['Q', 'S', 'E', 'M'],
	['O', 'D', 'E', 'P'],
];

const MIN_LETTERS = 3;

const cache = new Set();
const usedLetterPositions = new Set();

const Board = () => {
	const [word, setWord] = useState('');
	const [wordList, setWordList] = useState<Array<string>>([]);
	const [error, setError] = useState(false);

	const handleError = (err: boolean) => {
		setError(err);
	};

	const handleWordUpdate = (letter: string, rowIndex: number, diceIndex: number) => {
		const position = `${rowIndex}-${diceIndex}`;

		if (usedLetterPositions.has(position)) {
			return;
		}

		const newWord = word + letter;

		usedLetterPositions.add(position);
		setWord(newWord);
	};

	const handleClear = () => {
		cache.clear();
		usedLetterPositions.clear();
		setWord('');
		setWordList([]);
	};

	const handleSubmit = async () => {
		if (word.length < MIN_LETTERS) {
			setError(true);
			return;
		}

		const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

		handleError(false);

		if (cache.has(url)) {
			handleError(true);
			return;
		}

		try {
			const response = await fetch(url);
			const data = await response.json();

			if (data.title === 'No Definitions Found') {
				handleError(true);
			} else {
				console.log('SUCCESS');
				cache.add(url);
				setWordList((prev: WORD_LIST) => [...prev, word]);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container>
			<Row>
				<Container>
					<Word text={word} isError={error} />
					<StyledBoard>
						{BOARD_TEST.map((row, rowIndex) =>
							row.map((letter, diceIndex) => (
								<Boggle
									key={`${rowIndex}-${diceIndex}`}
									letter={letter}
									isSelected={usedLetterPositions.has(`${rowIndex}-${diceIndex}`)}
									handleSelect={() => handleWordUpdate(letter, rowIndex, diceIndex)}
								/>
							))
						)}
					</StyledBoard>
					<Row>
						<Button label="Clear" handleSubmit={handleClear} />
						<Button label="Submit" handleSubmit={handleSubmit} />
					</Row>
				</Container>
				<Container>
					{wordList.map((item) => (
						<h3>{item}</h3>
					))}
				</Container>
			</Row>
		</Container>
	);
};

export default Board;
