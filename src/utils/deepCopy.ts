export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const copy = obj.map((item) => deepCopy(item));
    return copy as T;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (obj instanceof Object) {
    const copy = Object.create(Object.getPrototypeOf(obj));
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (copy as any)[key] = deepCopy((obj as any)[key]);
      }
    }
    return copy;
  }

  throw new Error('깊은복사 함수 - 에러');
}
