import api from './api.js';

function renderSidebarItem({ name, type, children }, isHidden) {
  const hasChildren = !!children?.length;
  const childrenNodes = hasChildren ? children.map((child) => renderSidebarItem(child, true)).join('') : '';

  return type === 'folder' ? `
  <div class="directorySidebarItemContainer ${isHidden ? 'hidden' : ''}">
    <div class="directorySidebarItem">
      ${hasChildren ? '<i class="fa-solid fa-caret-right directoryExpandToggle"></i>' : ''}
      <div class="directorySidebarItemSelectable">
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
  })
}

function renderSidebar(folderDirectory) {
  const sidebar = renderSidebarItem(folderDirectory);

  document.querySelector('.directorySideBar').innerHTML = sidebar;
  document.querySelectorAll('.directoryExpandToggle').forEach(handleSidebarExpandToggle);
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
