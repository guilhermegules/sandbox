type CustomArrayItem<T> = T | null | undefined;

export class CustomArray<T> {
  private array: CustomArrayItem<T>[];
  private length: number = 0;
  private capacity: number = 0;

  constructor(capacity: number) {
    if (capacity < 0) {
      throw new Error("Capacity cannot be lower than zero");
    }

    this.capacity = capacity;
    this.array = Array.from({ length: this.capacity });
  }

  public size(): number {
    return this.length;
  }

  public isEmpty(): boolean {
    return this.size() === 0;
  }

  public get(index: number) {
    return this.array[index];
  }

  public set(index: number, element: T) {
    this.array[index] = element;
  }

  public clear(): void {
    for (let index = 0; index < this.capacity; index++) {
      this.array[index] = null;
    }
    this.length = 0;
  }

  public add(element: T): void {
    // Resize the array
    if (this.length + 1 >= this.capacity) {
      this.capacity = this.capacity === 0 ? 1 : this.capacity * 2; // Double the size

      const newArray = Array.from({
        length: this.capacity,
      }) as CustomArrayItem<T>[];

      for (let index = 0; index < newArray.length; index++) {
        newArray[index] = this.array[index];
      }

      this.array = newArray;
    }

    this.array[this.length++] = element;
  }

  public removeAt(indexToRemove: number): CustomArrayItem<T> {
    if (indexToRemove >= this.length && indexToRemove < 0) {
      throw new Error("Index out of bounds");
    }

    const item = this.array[indexToRemove];

    this.array = this.array.filter((_, index) => index !== indexToRemove);

    this.capacity = --this.length;

    return item;
  }

  public remove(element: CustomArrayItem<T>): boolean {
    for (let index = 0; index < this.length; index++) {
      const item = this.array[index];
      if (item === element) {
        this.removeAt(index);
        return true;
      }
    }
    return false;
  }

  public indexOf(element: CustomArrayItem<T>): number {
    for (let index = 0; index < this.length; index++) {
      const item = this.array[index];
      if (item === element) {
        return index;
      }
    }

    return -1;
  }

  public contains(element: CustomArrayItem<T>): boolean {
    return this.indexOf(element) !== -1;
  }
}
