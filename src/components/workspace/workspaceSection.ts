import { BlockObject, BlockObjectValue } from '../../types/blockObject';
import { UpdateWorkspaceData, WorkspaceData } from '../../types/stateType';
import { changeUniqueIdObj } from '../../utils/changeUniqueIdObj';
import { createElementCommon } from '../../utils/createElementCommon';
import { deepCopy } from '../../utils/deepCopy';
import { findTargetBlock, findTargetParentBlock } from '../../utils/findBlock';

interface WorkspaceSectionProps {
  workspaceData: WorkspaceData;
  updateWorkspaceData: UpdateWorkspaceData;
  removeTargetBlock: (
    parentData: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null,
  ) => void;
  inserBlockWorkspace: (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => WorkspaceData;
  insertBlockAnotherBlock: (
    targetUniqueId: string,
    name: string,
    newWorkspaceData: BlockObject[],
    anotherBlock: HTMLElement,
    insertBlock?: BlockObject,
  ) => boolean;
}

export const workspaceSection = ({
  workspaceData,
  updateWorkspaceData,
  removeTargetBlock,
  inserBlockWorkspace,
  insertBlockAnotherBlock,
}: WorkspaceSectionProps) => {
  const section = createElementCommon('div', { id: 'workspace' });

  addWorkspaceMouseDragEvent(section, workspaceData, updateWorkspaceData, removeTargetBlock, insertBlockAnotherBlock);
  addWorkspaceReceiveDragEvent(
    section,
    workspaceData,
    updateWorkspaceData,
    inserBlockWorkspace,
    insertBlockAnotherBlock,
  );

  return section;
};

const addWorkspaceMouseDragEvent = (
  section: HTMLElement,
  workspaceData: WorkspaceData,
  updateWorkspaceData: UpdateWorkspaceData,
  removeTargetBlock: (
    parentData: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null,
  ) => void,
  insertBlockAnotherBlock: (
    targetUniqueId: string,
    name: string,
    newWorkspaceData: BlockObject[],
    anotherBlock: HTMLElement,
    insertBlock?: BlockObject,
  ) => boolean,
) => {
  let active = false;
  let currentX: number;
  let currentY: number;
  let initialX: number;
  let initialY: number;
  let xOffset = 0;
  let yOffset = 0;
  let target: HTMLElement | null = null;

  section.addEventListener('mousedown', function (e: MouseEvent) {
    const trashBin = document.getElementById('trash-bin') as HTMLElement;
    const trashIcon = document.querySelector('#trash-bin > span') as HTMLElement;

    if (e.target === section || e.target === trashBin || e.target === trashIcon) {
      return;
    }

    if (e.target instanceof HTMLElement) {
      target = e.target.closest('div');

      if (target) {
        const rect = target.getBoundingClientRect();

        xOffset = e.clientX - rect.left;
        yOffset = e.clientY - rect.top;

        initialX = e.clientX;
        initialY = e.clientY;

        target.style.zIndex = '1000';
        active = true;
      }
    }
  });

  section.addEventListener('mouseup', function (e: MouseEvent) {
    e.preventDefault();
    if (active && target) {
      if (Math.abs(currentX) > 3 || Math.abs(currentY) > 3) {
        target.style.display = 'none';
        const anotherBlock = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        const anotherBlockClosestDiv = anotherBlock.closest('div');
        target.style.display = 'flex';

        const newWorkspaceData = deepCopy(workspaceData);
        const parentData = findTargetParentBlock(target.id, newWorkspaceData, newWorkspaceData);
        const child = findTargetBlock(target.id, newWorkspaceData);
        let changeCheck = true;

        if (anotherBlock && parent && child) {
          let newChild = null;
          if (e.metaKey || e.ctrlKey) {
            newChild = deepCopy(child);
            changeUniqueIdObj(newChild);
          }

          if (anotherBlock.id === 'workspace') {
            workspaceDrop(e, child, newChild, target, parentData, newWorkspaceData);
          } else if (anotherBlockClosestDiv && anotherBlockClosestDiv.id === 'trash-bin') {
            trashBinDrop(newChild, parentData);
          } else if (anotherBlockClosestDiv) {
            changeCheck = anotherBlockDrop(
              newChild,
              parentData,
              anotherBlockClosestDiv,
              child,
              newWorkspaceData,
              anotherBlock,
            );
          }
        }

        initialX = currentX;
        initialY = currentY;

        if (changeCheck) {
          updateWorkspaceData(newWorkspaceData);
        }
      }

      target.style.zIndex = '0';
      target.style.transform = 'translate(0px, 0px)';
    }
    target = null;
    active = false;
  });

  const workspaceDrop = (
    e: MouseEvent,
    child: BlockObject,
    newChild: BlockObject | null,
    target: HTMLElement,
    parentData: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null,
    newWorkspaceData: WorkspaceData,
  ) => {
    const rect = section.getBoundingClientRect();
    const relativeX = e.clientX - rect.left - xOffset;
    const relativeY = e.clientY - rect.top - yOffset;

    if (!newChild) {
      child.data.x = relativeX;
      child.data.y = relativeY;
      child.data.id = target.id;
      removeTargetBlock(parentData);
      newWorkspaceData.push(child);
    } else {
      newChild.data.x = relativeX;
      newChild.data.y = relativeY;
      newWorkspaceData.push(newChild);
    }
  };

  const trashBinDrop = (
    newChild: BlockObject | null,
    parentData: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null,
  ) => {
    if (!newChild) {
      removeTargetBlock(parentData);
    }
  };

  const anotherBlockDrop = (
    newChild: BlockObject | null,
    parentData: { parent: BlockObject | BlockObject[]; prop?: string; index?: number } | null,
    anotherBlockClosestDiv: HTMLElement,
    child: BlockObject,
    newWorkspaceData: WorkspaceData,
    anotherBlock: HTMLElement,
  ) => {
    let changeCheck = true;
    if (!newChild) {
      removeTargetBlock(parentData);
      changeCheck = insertBlockAnotherBlock(
        anotherBlockClosestDiv.id as string,
        child.name,
        newWorkspaceData,
        anotherBlock,
        child,
      );
    } else {
      changeCheck = insertBlockAnotherBlock(
        anotherBlockClosestDiv.id as string,
        newChild.name,
        newWorkspaceData,
        anotherBlock,
        newChild,
      );
    }

    return changeCheck;
  };

  let lastHighlighted: Element | null = null;
  section.addEventListener('mousemove', function (e: MouseEvent) {
    if (active) {
      e.preventDefault();

      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      if (target) {
        target.style.visibility = 'hidden';
        const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
        target.style.visibility = 'visible';

        if (lastHighlighted && lastHighlighted !== elementBelow) {
          lastHighlighted.classList.remove('block--highlight-drop');
        }

        if (elementBelow) {
          if (elementBelow.classList.contains('block__space') || elementBelow.classList.contains('block__child')) {
            elementBelow.classList.add('block--highlight-drop');
            lastHighlighted = elementBelow;
          } else {
            const closestBlock = elementBelow.closest('div');
            if (closestBlock?.classList.contains('block')) {
              closestBlock.classList.add('block--highlight-drop');
              lastHighlighted = closestBlock;
            }
          }
        }
      }

      if (target) {
        if (Math.abs(currentX) > 3 || Math.abs(currentY) > 3) {
          target.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px)';
        } else {
          target.style.transform = 'translate(0px, 0px)';
        }
      }
    }
  });

  section.addEventListener('mouseover', function (e: Event) {
    const target: HTMLElement = (e.target as HTMLElement).closest('div') as HTMLElement;

    if (
      (target && target.classList.contains('block')) ||
      target.classList.contains('block__space') ||
      target.classList.contains('block__child')
    ) {
      target.classList.add('block--highlight-select');
    }
  });

  section.addEventListener('mouseout', function (e: Event) {
    const target: HTMLElement = (e.target as HTMLElement).closest('div') as HTMLElement;

    if (
      (target && target.classList.contains('block')) ||
      target.classList.contains('block__space') ||
      target.classList.contains('block__child') ||
      target.classList.contains('block__operator')
    ) {
      target.classList.remove('block--highlight-select');
    }
  });
};

const addWorkspaceReceiveDragEvent = (
  section: HTMLElement,
  workspaceData: WorkspaceData,
  updateWorkspaceData: UpdateWorkspaceData,
  inserBlockWorkspace: (section: HTMLElement, event: DragEvent, workspaceData: WorkspaceData) => WorkspaceData,
  insertBlockAnotherBlock: (
    targetUniqueId: string,
    name: string,
    newWorkspaceData: BlockObject[],
    anotherBlock: HTMLElement,
    insertBlock?: BlockObject,
  ) => boolean,
) => {
  const trashBin = document.getElementById('trash-bin') as HTMLElement;
  const trashIcon = document.querySelector('#trash-bin > span') as HTMLElement;

  let lastHighlighted: Element | null = null;
  section.addEventListener('dragover', function (e: DragEvent) {
    const target = e.target as HTMLElement;
    if (target) {
      const elementBelow = document.elementFromPoint(e.clientX, e.clientY);

      if (lastHighlighted && lastHighlighted !== elementBelow) {
        lastHighlighted.classList.remove('block--highlight-drop');
      }

      if (elementBelow) {
        if (elementBelow.classList.contains('block__space') || elementBelow.classList.contains('block__child')) {
          elementBelow.classList.add('block--highlight-drop');
          lastHighlighted = elementBelow;
        } else {
          const closestBlock = elementBelow.closest('div');
          if (closestBlock?.classList.contains('block')) {
            closestBlock.classList.add('block--highlight-drop');
            lastHighlighted = closestBlock;
          }
        }
      }
    }
    e.preventDefault();
  });

  section.addEventListener('drop', function (e: DragEvent) {
    e.preventDefault();
    if (e.target === trashBin || e.target === trashIcon) {
      return;
    } else if (e.target === section) {
      const newWorkspaceData = inserBlockWorkspace(section, e, workspaceData);
      updateWorkspaceData(newWorkspaceData);
    } else if (e.dataTransfer) {
      const newWorkspaceData = deepCopy(workspaceData);
      const target = e.target;

      if (target instanceof HTMLElement) {
        const uniqueId = target.closest('div')?.id ?? '';
        const name = e.dataTransfer.getData('name');
        const insertSuccess = insertBlockAnotherBlock(uniqueId, name, newWorkspaceData, target);

        if (insertSuccess) {
          updateWorkspaceData(newWorkspaceData);
        }
      }
    }
  });
};
