import Boggle from '../Boggle';
import { BoardProps } from '../../utils/types';
import { StyledBoard } from './Board.styles';

// BOARD example
const BOARD_TEST = [
	['G', 'I', 'Z', 'A'],
	['U', 'E', 'K', 'X'],
	['Q', 'S', 'E', 'M'],
	['O', 'D', 'E', 'P'],
];

const Board = ({ usedLetterPositions, handleSelect }: BoardProps) => {
	return (
		<StyledBoard>
			{BOARD_TEST.map((row, rowIndex) =>
				row.map((letter, columnIndex) => (
					<Boggle
						key={`${rowIndex}-${columnIndex}`}
						letter={letter}
						isSelected={usedLetterPositions.has(`${rowIndex}-${columnIndex}`)}
						handleSelect={() => handleSelect(letter, rowIndex, columnIndex)}
					/>
				))
			)}
		</StyledBoard>
	);
};

export default Board;
