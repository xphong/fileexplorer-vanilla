import api from './api.js';

const sidebarItemHTML = `
  <div class="directorySidebarItemContainer">
    <div class="directorySidebarItem">
      <i class="fa-solid fa-caret-down"></i>
      <div class="directorySidebarItemSelectable">
        <i class="fa-solid fa-folder-open"></i>
        Files
      </div>
    </div>
  </div>
`;

function renderSidebarItem({ name, type, children }) {
  const hasChildren = !!children?.length;
  const childrenNodes = hasChildren ? children.map((child) => renderSidebarItem(child)).join('') : '';

  return type === 'folder' ? `
  <div class="directorySidebarItemContainer">
    <div class="directorySidebarItem">
      ${hasChildren ? '<i class="fa-solid fa-caret-right directoryExpand"></i>' : ''}
      <div class="directorySidebarItemSelectable">
        <i class="fa-solid fa-folder-open"></i>
        ${name}
      </div>
    </div>
    ${childrenNodes}
  </div>
  ` : '';
}

function renderSidebar(folderDirectory) {
  const sidebar = renderSidebarItem(folderDirectory);
  document.querySelector('.directorySideBar').innerHTML = sidebar;
}

async function run() {
  const folderDirectory = await api.getFolderDirectory();

  console.log('folderDirectory', folderDirectory);

  if (!folderDirectory) {
    return;
  }

  renderSidebar(folderDirectory);
}

run();
