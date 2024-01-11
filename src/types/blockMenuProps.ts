type SelectedBlock = number;
type SetSelectedBlock = (selectedBlock: SelectedBlock) => void;

export interface blockMenuProps {
  selectedBlock: SelectedBlock;
  setSelectedBlock: SetSelectedBlock;
}
