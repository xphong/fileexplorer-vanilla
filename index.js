import { getFolderDirectory } from './api.js';
import { getChildrenByName } from './utils.js';

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
  element.addEventListener('click', (event) => {
    const containerElement = event.target.parentElement.parentElement;
    const currentElement = event.currentTarget;

    if (currentElement.classList.contains('fa-caret-right')) {
      containerElement.querySelectorAll(':scope > .directorySidebarItemContainer').forEach((element) => {
        element.classList.remove('hidden');
      })

      currentElement.classList.remove('fa-caret-right');
      currentElement.classList.add('fa-caret-down');
    } else {
      containerElement.querySelectorAll(':scope > .directorySidebarItemContainer').forEach((element) => {
        element.classList.add('hidden');
      })

      currentElement.classList.remove('fa-caret-down');
      currentElement.classList.add('fa-caret-right');
    }
  });
}

function renderTreeListItem({ name, type, modified, size }) {
  return `
  <tr class="directoryTreeListItem" ${type === 'folder' ? `data-name="${name}"` : ''}>
    <td>
      <i class="fa-solid ${iconMap[type]}"></i>
      ${name}
    </td>
    <td>
      ${modified}
    </td>
    <td>
      ${size}
    </td>
  </tr>
  `
}

function renderTreeList(children) {
  return !!children?.length ? children.map((child) => renderTreeListItem(child)).join('') : '';
}

function handleSelectableItemClick(element, folderDirectory) {
  element.addEventListener('click', (event) => {
    const currentElement = event.currentTarget;
    const name = currentElement.dataset.name;

    document.querySelectorAll('.selected').forEach((element) => element.classList.remove('selected'));
    currentElement.classList.add('selected');

    // Name only exists for folders
    if (!name) {
      return;
    }

    const children = getChildrenByName(name, folderDirectory);

    document.querySelector('.directoryTreeList').innerHTML = renderTreeList(children);
    document.querySelectorAll('.directoryTreeListItem').forEach((element) => handleSelectableItemClick(element, folderDirectory));
  });
}

function renderInitialSidebar(folderDirectory) {
  document.querySelector('.directorySideBar').innerHTML = renderSidebarItem(folderDirectory);
  document.querySelectorAll('.directorySidebarExpandToggle').forEach(handleSidebarExpandToggle);
  document.querySelectorAll('.directorySidebarItemSelectable').forEach((element) => handleSelectableItemClick(element, folderDirectory));
}

function renderInitialTreeList(folderDirectory) {
  document.querySelector('.directoryTreeList').innerHTML = renderTreeList(folderDirectory.children);
  document.querySelectorAll('.directoryTreeListItem').forEach((element) => handleSelectableItemClick(element, folderDirectory));
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
