type KeysWithOptional<T> = {
  [K in keyof T]-?: {} extends { [P in K]: T[K] } ? K : never;
}[keyof T];

type MergedProperties<A, B, K extends keyof A & keyof B> = {
  [P in K]: A[P] | Exclude<B[P], undefined>;
};

type Identity<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type MergeImplement<A, B> = Identity<
  Pick<B, Exclude<keyof B, keyof A>> &
    Pick<A, Exclude<keyof A, KeysWithOptional<A>>> &
    Pick<A, Exclude<KeysWithOptional<A>, keyof B>> &
    MergedProperties<B, A, KeysWithOptional<A> & keyof B>
>;

export type Merge<L extends readonly [...any]> = L extends [infer A, ...infer B]
  ? MergeImplement<A, Merge<B>>
  : unknown;

const findObj = <T extends object>(
  objs: T[],
  p: string | number | symbol
): any => objs.find((o) => p in o) || objs[0];

const Merged = Symbol("Merged");

export default function merge<T extends object[]>(...objs: [...T]): Merge<T> {
  objs.unshift({
    [Symbol.for("nodejs.util.inspect.custom")]() {
      const obj: any = {};
      for (const o of objs) for (const k in o) obj[k] = o[k];
      return obj;
    },
  });
  // @ts-ignore
  objs = Object.freeze(
    objs
      .map((i) => (Merged in i ? (i[Merged] as [...T]).slice(1) : (i as T)))
      .flat()
  );
  return new Proxy(objs[0], {
    has: (t, p) => objs.some((o) => p in o),
    get: (t, p) => (p === Merged ? objs : findObj(objs, p)[p]),
    set: (t, p, v) => Reflect.set(findObj(objs, p), p, v),
    deleteProperty: (t, p) => Reflect.deleteProperty(findObj(objs, p), p),
    ownKeys: (t) =>
      objs.reduce(
        (p, c) => p.concat(Reflect.ownKeys(c).filter((i) => !p.includes(i))),
        Reflect.ownKeys(t)
      ),
    defineProperty: (t, p, a) => Reflect.defineProperty(findObj(objs, p), p, a),
    getOwnPropertyDescriptor: (t, p) =>
      Reflect.getOwnPropertyDescriptor(findObj(objs, p), p),
  }) as Merge<T>;
}
