import { ButtonProps } from '../../utils/types';
import { StyledButton } from './Button.styles';

const Button = ({ disabled = false, label, handleSubmit }: ButtonProps) => {
	return (
		<StyledButton disabled={disabled} onClick={handleSubmit}>
			{label}
		</StyledButton>
	);
};

export default Button;
