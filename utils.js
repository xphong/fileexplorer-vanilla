export function getChildrenByName(name, folderDirectory) {
  if (name === folderDirectory.name) {
    return folderDirectory.children;
  }

  if (!!folderDirectory.children?.length) {
    return folderDirectory.children.map((child) => getChildrenByName(name, child)).filter((child) => !!child?.length)[0];
  }

  return [];
}

export function getDateFormat(date) {
  const isValidDate = Date.parse(date);

  if (isNaN(isValidDate)) {
    return;
  }

  return new Date(date).toLocaleDateString();
}

export function getFileSizeInKB(bytes) {
  if (typeof bytes !== 'number') {
    return;
  }

  return `${bytes / 1000} KB`;
}
