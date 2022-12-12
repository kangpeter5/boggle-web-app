import { BoggleProps } from '../../utils/types';
import { StyledBoggle } from './Boggle.styles';

const Boggle = ({ letter, isSelected, handleSelect }: BoggleProps) => {
	return (
		<StyledBoggle isSelected={isSelected} onClick={handleSelect}>
			<span>{letter}</span>
		</StyledBoggle>
	);
};

export default Boggle;
