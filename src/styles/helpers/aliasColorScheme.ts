export function aliasColorScheme(
  prefix: string,
  colorScheme: Record<string, string>
) : Record<string, string> {
  return Object.entries(colorScheme).reduce(
    (acc, [_, v], i) => ({
      ...acc,
      [`${prefix}${i + 1}`]: v,
    }),
    {}
  );
}
