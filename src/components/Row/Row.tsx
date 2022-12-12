import { StyledRow } from './Row.styles';
import { RowProps } from '../../utils/types';

const Row = ({ children }: RowProps) => {
	return <StyledRow>{children}</StyledRow>;
};

export default Row;
