import { ProgramState, UpdateProgramState } from '../../types/stateType';
import { createElementCommon } from '../../utils/createElementCommon';

interface StopButtonProps {
  getProgramState: () => ProgramState;
  updateProgramState: UpdateProgramState;
}

export const stopButton = ({ getProgramState, updateProgramState }: StopButtonProps) => {
  const element = createElementCommon('button', { type: 'button', className: 'bg-red', textContent: '⏹' });

  element.addEventListener('click', () => {
    if (getProgramState() !== 'stop') {
      updateProgramState('stop');
    }
  });

  return element;
};
