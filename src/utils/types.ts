export type BoardProps = {
	children: React.ReactNode;
};

export type BoggleProps = {
	letter: string;
	isSelected: boolean;
	handleSelect: (letter: string) => void;
};

export type ButtonProps = {
	label: string;
	handleSubmit: () => void;
};

export interface ContainerProps {
	children: React.ReactNode;
}

export type WordProps = {
	isError: boolean;
	text?: string;
};

export type WORD_LIST = string[];

export interface RowProps {
	children: React.ReactNode;
}

export interface DiceProps {
	isSelected: boolean;
}
