import { ContainerDiv } from './Container.styles';
import { ContainerProps } from '../../utils/types';

const Container = ({ children }: ContainerProps) => <ContainerDiv>{children}</ContainerDiv>;

export default Container;
