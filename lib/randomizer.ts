const UniqueID = (prefix: string) => {
  return [
    prefix,
    Date.now().toString().slice(-4),
    Math.floor(Math.random() * 10000).toString(),
  ].join("");
};

export { UniqueID };
