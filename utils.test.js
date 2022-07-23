import { getChildrenByName } from './utils.js';

describe('getChildrenByName', () => {
  test('should return children by folder name', () => {
    const folderDirectory = {
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
        }
      ]
    }

    expect(getChildrenByName('More Documents', folderDirectory)).toEqual(folderDirectory.children);
  })

  test('should return nested children by folder name', () => {
    const folderDirectory = {
      type: 'folder',
      name: 'Documents',
      modified: '2022-07-22T20:59:00.000Z',
      size: 2000,
      children: [
        {
          type: 'folder',
          name: 'Documents 2',
          modified: '2022-07-22T20:59:00.000Z',
          size: 7000,
          children: [
            {
              type: 'folder',
              name: 'Documents 3',
              modified: '2022-07-22T20:59:00.000Z',
              size: 7000,
              children: [
                {
                  type: 'folder',
                  name: 'Documents 4',
                  modified: '2022-07-22T20:59:00.000Z',
                  size: 7000,
                }
              ]
            }
          ]
        }
      ]
    }

    const expectedChildren = [
      {
        type: 'folder',
        name: 'Documents 4',
        modified: '2022-07-22T20:59:00.000Z',
        size: 7000,
      }
    ]

    expect(getChildrenByName('Documents 3', folderDirectory)).toEqual(expectedChildren);
  })
})
