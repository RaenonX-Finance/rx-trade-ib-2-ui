export const isSubset = <T>(superSet: T[], toContain: T[]) => toContain.every((element) => superSet.includes(element));
