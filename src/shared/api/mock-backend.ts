export const FILE_SYSTEM = {
  "/": [
    new FileSystemObject("dir", "etc", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
    new FileSystemObject("dir", "hello", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ],
  "/etc": [
    new FileSystemObject("file", "photo.txt", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ],
  "/hello": [
    new FileSystemObject("file", "resulsts.pdf", new FileSystemMetadata(500, new Date(), new Date(), new Date())),
  ]
}