export type BoardProps = {
	handleSelect: (letter: string, columnIndex: number, rowIndex: number) => void;
	usedLetterPositions: Set<string>;
};

export type BoggleProps = {
	letter: string;
	isSelected: boolean;
	handleSelect: () => void;
};

export type ButtonProps = {
	disabled: boolean;
	label: string;
	handleSubmit: () => void;
};

export interface ContainerProps {
	children: React.ReactNode;
}

export interface DiceProps {
	isSelected: boolean;
}

export interface DicePosition {
	columnIndex: number | null;
	letter: string;
	rowIndex: number | null;
}

export interface RowProps {
	children: React.ReactNode;
}

export type WordProps = {
	isError: boolean;
	text?: string;
};

export type WORD_LIST = string[];
