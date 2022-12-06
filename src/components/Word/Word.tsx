import { WordProps } from '../../utils/types';
import { WordText } from './Word.styles';

const Word = ({ text, isError }: WordProps) => {
	return <WordText isError={isError}>{text}</WordText>;
};

export default Word;
