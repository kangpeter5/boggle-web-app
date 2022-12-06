import { ButtonProps } from '../../utils/types';
import { StyledButton } from './Button.styles';

const Button = ({ label, handleSubmit }: ButtonProps) => {
	return <StyledButton onClick={handleSubmit}>{label}</StyledButton>;
};

export default Button;
