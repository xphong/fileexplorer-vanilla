import { getFolderDirectory } from './api.js';
import { getChildrenByName, getDateFormat, getFileSizeInKB } from './utils.js';

const iconMap = {
  file: 'fa-file',
  folder: 'fa-folder-open'
}

function renderSidebarItem({ name, type, children }, isHidden) {
  const hasChildren = !!children?.length && !!children.filter((child) => child.type === 'folder').length;
  const childrenNodes = hasChildren ? children.map((child) => renderSidebarItem(child, true)).join('') : '';

  return type === 'folder' ? `
  <div class="directorySidebarItemContainer ${isHidden ? 'hidden' : ''}">
    <div class="directorySidebarItem">
      ${hasChildren ? '<i class="fa-solid fa-caret-right directorySidebarExpandToggle"></i>' : ''}
      <div class="directorySidebarItemSelectable" data-name="${name}">
        <i class="fa-solid fa-folder-open"></i>
        ${name}
      </div>
    </div>
    ${childrenNodes}
  </div>
  ` : '';
}

function handleSidebarExpandToggle(element) {
  const containerElement = element.parentElement.parentElement;

  if (element.classList.contains('fa-caret-right')) {
    containerElement.querySelectorAll(':scope > .directorySidebarItemContainer').forEach((element) => {
      element.classList.remove('hidden');
    })

    element.classList.remove('fa-caret-right');
    element.classList.add('fa-caret-down');
  } else {
    containerElement.querySelectorAll(':scope > .directorySidebarItemContainer').forEach((element) => {
      element.classList.add('hidden');
    })

    element.classList.remove('fa-caret-down');
    element.classList.add('fa-caret-right');
  }
}

function renderTreeListItem({ name, type, modified, size }) {
  return `
  <tr class="directoryTreeListItem" ${type === 'folder' ? `data-name="${name}"` : ''}>
    <td>
      <i class="fa-solid ${iconMap[type]}"></i>
      ${name}
    </td>
    <td>
      ${getDateFormat(modified)}
    </td>
    <td>
      ${getFileSizeInKB(size)}
    </td>
  </tr>
  `
}

function renderTreeList(children) {
  return !!children?.length ? children.map((child) => renderTreeListItem(child)).join('') : '';
}

function handleSelectableItemClick(element, folderDirectory) {
  const name = element.dataset.name;

  document.querySelectorAll('.selected').forEach((element) => element.classList.remove('selected'));
  element.classList.add('selected');

  // Name only exists for folders
  if (!name) {
    return;
  }

  const children = getChildrenByName(name, folderDirectory);

  document.querySelector('.directoryTreeList').innerHTML = renderTreeList(children);
}

function renderInitialSidebar(folderDirectory) {
  document.querySelector('.directorySideBar').innerHTML = renderSidebarItem(folderDirectory);
  document.querySelector('.directorySideBar').addEventListener('click', (event) => {
    const targetElement = event.target;
    if (targetElement.className.includes('directorySidebarExpandToggle')) {
      handleSidebarExpandToggle(targetElement);
    }

    if (targetElement.className.includes('directorySidebarItemSelectable')) {
      handleSelectableItemClick(targetElement, folderDirectory);
    }
  });
}

function renderInitialTreeList(folderDirectory) {
  document.querySelector('.directoryTreeList').innerHTML = renderTreeList(folderDirectory.children);
  document.querySelector('.directoryTreeList').addEventListener('click', (event) => {
    const directoryTreeListElement = event.target.closest('tr');

    if (directoryTreeListElement.className.includes('directoryTreeListItem')) {
      handleSelectableItemClick(directoryTreeListElement, folderDirectory);
    }
  });
}

async function run() {
  try {
    const folderDirectory = await getFolderDirectory();

    if (!folderDirectory) {
      return;
    }

    renderInitialSidebar(folderDirectory);
    renderInitialTreeList(folderDirectory);
  } catch (error) {
    console.warn('Error', error);
  }
}

run();
