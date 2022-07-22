import api from './api.js';

async function run() {
  const folderDirectory = await api.getFolderDirectory();

  console.log('folderDirectory', folderDirectory);
}

run();
