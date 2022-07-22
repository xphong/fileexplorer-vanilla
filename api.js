const folderDirectory = {
  type: 'folder',
  name: 'Files',
  modified: '2022-07-22T20:59:00.000Z',
  size: 2000,
  children: [
    {
      type: 'folder',
      name: 'Documents',
      modified: '2022-07-22T20:59:00.000Z',
      size: 2000,
      children: [
        {
          type: 'file',
          name: 'Important Stuff.txt',
          modified: '2022-07-22T20:59:00.000Z',
          size: 2000,
        }
      ]
    },
    {
      type: 'folder',
      name: 'Images',
      modified: '2022-07-22T20:59:00.000Z',
      size: 2000,
    },
    {
      type: 'folder',
      name: 'System',
      modified: '2022-07-22T20:59:00.000Z',
      size: 2000,
    },
    {
      type: 'file',
      name: 'Description.rtf',
      modified: '2022-07-22T20:59:00.000Z',
      size: 1000,
    },
    {
      type: 'file',
      name: 'Description.txt',
      modified: '2022-07-22T20:59:00.000Z',
      size: 2000,
    }
  ]
};

export default {
  getFolderDirectory: async () => folderDirectory,
};
