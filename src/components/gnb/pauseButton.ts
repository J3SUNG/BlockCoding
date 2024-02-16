import { ProgramState, UpdateProgramState } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface PauseButtonProps {
  getProgramState: () => ProgramState;
  updateProgramState: UpdateProgramState;
}

export const pauseButton = ({ getProgramState, updateProgramState }: PauseButtonProps) => {
  const element = createElementCommon('button', { type: 'button', className: 'bg-yellow', textContent: '⏸' });

  element.addEventListener('click', () => {
    if (getProgramState() === 'run') {
      updateProgramState('pause');
    }
  });

  return element;
};
