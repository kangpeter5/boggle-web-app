import styled from 'styled-components';
import { WordProps } from '../../utils/types';

export const WordText = styled.h3`
	color: ${({ isError }: WordProps) => (!isError ? 'black' : 'red')};
	text-transform: uppercase;
	text-align: center;
`;
