export const prefixerFactory =
  (prefix: string): EasyPrefixer =>
  (type, isSaga) =>
    `${prefix}/${type}${isSaga ? "_SAGA" : ""}`;
