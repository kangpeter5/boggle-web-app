import styled from 'styled-components';
import { DiceProps } from '../../utils/types';

export const StyledBoggle = styled.div<DiceProps>`
	width: 80px;
	height: 80px;
	border-radius: 5px;
	border: 2px solid grey;
	background: ${({ isSelected }: DiceProps) => (!isSelected ? '#ffffff' : '#aef4c5')};
	flex: 1 1 auto;

	span {
		text-transform: uppercase;
		font-weight: bold;
		font-size: 32px;
		display: block;
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
`;
