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
  return new Date(date).toLocaleDateString();
}

export function getFileSizeInKB(bytes) {
  return `${bytes / 1000} KB`
}
