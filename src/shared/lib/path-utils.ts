const PATH_SEPARATOR = "/";

export function joinPath(pathElements: string[]): string {
  let joinedPath = pathElements.join(PATH_SEPARATOR);
  if (joinedPath.length === 0) {
    joinedPath = PATH_SEPARATOR;
  }
  return joinedPath;
}

export function concatPath(prefix: string, suffix: string): string {
  if (prefix === PATH_SEPARATOR) {
    return prefix + suffix;
  }
  return prefix + PATH_SEPARATOR + suffix;
}