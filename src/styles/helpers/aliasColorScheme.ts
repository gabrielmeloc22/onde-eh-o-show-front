export function aliasColorScheme<T extends Object>(prefix: string, colorScheme: Record<string, string>) {
  return Object.entries(colorScheme).reduce(
    (acc, [_, v], i) => ({
      ...acc,
      [`${prefix}${i + 1}`]: v,
    }),
    {} as { -readonly [key in keyof T]: string }
  );
}
