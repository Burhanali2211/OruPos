export interface FileItem {
  file: File;
  path: string;
}

// Recursively read directory entries dropped into browser
export async function extractFilesFromItems(items: DataTransferItemList): Promise<FileItem[]> {
  const list: FileItem[] = [];

  async function traverseEntry(entry: any, currentPath: string): Promise<void> {
    if (!entry) return;
    if (entry.isFile) {
      return new Promise<void>((resolve) => {
        entry.file(
          (file: File) => {
            const relPath = currentPath ? `${currentPath}/${file.name}` : file.name;
            list.push({ file, path: relPath });
            resolve();
          },
          () => resolve()
        );
      });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const entries: any[] = await new Promise((resolve) => {
        reader.readEntries(
          (ents: any[]) => resolve(ents || []),
          () => resolve([])
        );
      });
      for (const child of entries) {
        await traverseEntry(child, currentPath ? `${currentPath}/${entry.name}` : entry.name);
      }
    }
  }

  const promises: Promise<void>[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.webkitGetAsEntry) {
      const entry = item.webkitGetAsEntry();
      if (entry) {
        promises.push(traverseEntry(entry, ""));
      }
    }
  }

  await Promise.all(promises);
  return list;
}
