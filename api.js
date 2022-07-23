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
          type: 'folder',
          name: 'More Documents',
          modified: '2022-07-22T20:59:00.000Z',
          size: 2000,
          children: [
            {
              type: 'file',
              name: 'More Important Stuff.txt',
              modified: '2022-07-22T20:59:00.000Z',
              size: 7000,
            },
            {
              type: 'file',
              name: 'More Important Stuff 2.txt',
              modified: '2022-07-22T20:59:00.000Z',
              size: 1000,
            }
          ]
        },
        {
          type: 'file',
          name: 'Important Stuff.txt',
          modified: '2022-07-22T20:59:00.000Z',
          size: 5000,
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
      children: [
        {
          type: 'file',
          name: 'System Stuff.txt',
          modified: '2022-07-22T20:59:00.000Z',
          size: 15000,
        },
        {
          type: 'file',
          name: 'System Stuff 2.txt',
          modified: '2022-07-22T20:59:00.000Z',
          size: 22000,
        }
      ]
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

export async function getFolderDirectory() {
  return folderDirectory;
}
