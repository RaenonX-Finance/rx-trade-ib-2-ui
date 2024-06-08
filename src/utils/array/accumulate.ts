export function* toAccumulated(arr: number[]): Generator<number> {
  let sum = 0;
  for (const element of arr) {
    sum += element;
    yield sum;
  }
}
