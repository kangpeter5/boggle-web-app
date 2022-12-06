import styled from 'styled-components';
import { BoardProps } from '../../utils/types';

export const StyledBoard = styled.div<BoardProps>`
	width: 360px;
	height: 360px;
	margin: auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 8px;
`;
