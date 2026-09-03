
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomBooking
 * 
 */
export type RoomBooking = $Result.DefaultSelection<Prisma.$RoomBookingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Rooms
 * const rooms = await prisma.room.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Rooms
   * const rooms = await prisma.room.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomBooking`: Exposes CRUD operations for the **RoomBooking** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomBookings
    * const roomBookings = await prisma.roomBooking.findMany()
    * ```
    */
  get roomBooking(): Prisma.RoomBookingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Room: 'Room',
    RoomBooking: 'RoomBooking'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "room" | "roomBooking"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomBooking: {
        payload: Prisma.$RoomBookingPayload<ExtArgs>
        fields: Prisma.RoomBookingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomBookingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomBookingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          findFirst: {
            args: Prisma.RoomBookingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomBookingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          findMany: {
            args: Prisma.RoomBookingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>[]
          }
          create: {
            args: Prisma.RoomBookingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          createMany: {
            args: Prisma.RoomBookingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomBookingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>[]
          }
          delete: {
            args: Prisma.RoomBookingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          update: {
            args: Prisma.RoomBookingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          deleteMany: {
            args: Prisma.RoomBookingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomBookingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomBookingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>[]
          }
          upsert: {
            args: Prisma.RoomBookingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomBookingPayload>
          }
          aggregate: {
            args: Prisma.RoomBookingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomBooking>
          }
          groupBy: {
            args: Prisma.RoomBookingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomBookingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomBookingCountArgs<ExtArgs>
            result: $Utils.Optional<RoomBookingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    room?: RoomOmit
    roomBooking?: RoomBookingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    bookings: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | RoomCountOutputTypeCountBookingsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountBookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomBookingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    capacity: number | null
  }

  export type RoomSumAggregateOutputType = {
    capacity: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    capacity: number | null
    location: string | null
    facilities: string | null
    priorityNotes: string | null
    isCombo: boolean | null
    comboChildCodes: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    capacity: number | null
    location: string | null
    facilities: string | null
    priorityNotes: string | null
    isCombo: boolean | null
    comboChildCodes: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    name: number
    code: number
    capacity: number
    location: number
    facilities: number
    priorityNotes: number
    isCombo: number
    comboChildCodes: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    capacity?: true
  }

  export type RoomSumAggregateInputType = {
    capacity?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    capacity?: true
    location?: true
    facilities?: true
    priorityNotes?: true
    isCombo?: true
    comboChildCodes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    capacity?: true
    location?: true
    facilities?: true
    priorityNotes?: true
    isCombo?: true
    comboChildCodes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    capacity?: true
    location?: true
    facilities?: true
    priorityNotes?: true
    isCombo?: true
    comboChildCodes?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    name: string
    code: string
    capacity: number
    location: string
    facilities: string
    priorityNotes: string | null
    isCombo: boolean
    comboChildCodes: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    capacity?: boolean
    location?: boolean
    facilities?: boolean
    priorityNotes?: boolean
    isCombo?: boolean
    comboChildCodes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    bookings?: boolean | Room$bookingsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    capacity?: boolean
    location?: boolean
    facilities?: boolean
    priorityNotes?: boolean
    isCombo?: boolean
    comboChildCodes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    capacity?: boolean
    location?: boolean
    facilities?: boolean
    priorityNotes?: boolean
    isCombo?: boolean
    comboChildCodes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    capacity?: boolean
    location?: boolean
    facilities?: boolean
    priorityNotes?: boolean
    isCombo?: boolean
    comboChildCodes?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "capacity" | "location" | "facilities" | "priorityNotes" | "isCombo" | "comboChildCodes" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bookings?: boolean | Room$bookingsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      bookings: Prisma.$RoomBookingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      capacity: number
      location: string
      facilities: string
      priorityNotes: string | null
      isCombo: boolean
      comboChildCodes: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bookings<T extends Room$bookingsArgs<ExtArgs> = {}>(args?: Subset<T, Room$bookingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly code: FieldRef<"Room", 'String'>
    readonly capacity: FieldRef<"Room", 'Int'>
    readonly location: FieldRef<"Room", 'String'>
    readonly facilities: FieldRef<"Room", 'String'>
    readonly priorityNotes: FieldRef<"Room", 'String'>
    readonly isCombo: FieldRef<"Room", 'Boolean'>
    readonly comboChildCodes: FieldRef<"Room", 'String'>
    readonly isActive: FieldRef<"Room", 'Boolean'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.bookings
   */
  export type Room$bookingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    where?: RoomBookingWhereInput
    orderBy?: RoomBookingOrderByWithRelationInput | RoomBookingOrderByWithRelationInput[]
    cursor?: RoomBookingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomBookingScalarFieldEnum | RoomBookingScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomBooking
   */

  export type AggregateRoomBooking = {
    _count: RoomBookingCountAggregateOutputType | null
    _avg: RoomBookingAvgAggregateOutputType | null
    _sum: RoomBookingSumAggregateOutputType | null
    _min: RoomBookingMinAggregateOutputType | null
    _max: RoomBookingMaxAggregateOutputType | null
  }

  export type RoomBookingAvgAggregateOutputType = {
    participantCount: number | null
  }

  export type RoomBookingSumAggregateOutputType = {
    participantCount: number | null
  }

  export type RoomBookingMinAggregateOutputType = {
    id: string | null
    bookingNumber: string | null
    roomId: string | null
    bookingDate: Date | null
    dateStr: string | null
    startTime: string | null
    endTime: string | null
    purpose: string | null
    unitName: string | null
    applicantName: string | null
    applicantPhone: string | null
    participantCount: number | null
    facilityNotes: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomBookingMaxAggregateOutputType = {
    id: string | null
    bookingNumber: string | null
    roomId: string | null
    bookingDate: Date | null
    dateStr: string | null
    startTime: string | null
    endTime: string | null
    purpose: string | null
    unitName: string | null
    applicantName: string | null
    applicantPhone: string | null
    participantCount: number | null
    facilityNotes: string | null
    status: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomBookingCountAggregateOutputType = {
    id: number
    bookingNumber: number
    roomId: number
    bookingDate: number
    dateStr: number
    startTime: number
    endTime: number
    purpose: number
    unitName: number
    applicantName: number
    applicantPhone: number
    participantCount: number
    facilityNotes: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomBookingAvgAggregateInputType = {
    participantCount?: true
  }

  export type RoomBookingSumAggregateInputType = {
    participantCount?: true
  }

  export type RoomBookingMinAggregateInputType = {
    id?: true
    bookingNumber?: true
    roomId?: true
    bookingDate?: true
    dateStr?: true
    startTime?: true
    endTime?: true
    purpose?: true
    unitName?: true
    applicantName?: true
    applicantPhone?: true
    participantCount?: true
    facilityNotes?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomBookingMaxAggregateInputType = {
    id?: true
    bookingNumber?: true
    roomId?: true
    bookingDate?: true
    dateStr?: true
    startTime?: true
    endTime?: true
    purpose?: true
    unitName?: true
    applicantName?: true
    applicantPhone?: true
    participantCount?: true
    facilityNotes?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomBookingCountAggregateInputType = {
    id?: true
    bookingNumber?: true
    roomId?: true
    bookingDate?: true
    dateStr?: true
    startTime?: true
    endTime?: true
    purpose?: true
    unitName?: true
    applicantName?: true
    applicantPhone?: true
    participantCount?: true
    facilityNotes?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomBookingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomBooking to aggregate.
     */
    where?: RoomBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomBookings to fetch.
     */
    orderBy?: RoomBookingOrderByWithRelationInput | RoomBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomBookings
    **/
    _count?: true | RoomBookingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomBookingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomBookingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomBookingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomBookingMaxAggregateInputType
  }

  export type GetRoomBookingAggregateType<T extends RoomBookingAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomBooking]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomBooking[P]>
      : GetScalarType<T[P], AggregateRoomBooking[P]>
  }




  export type RoomBookingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomBookingWhereInput
    orderBy?: RoomBookingOrderByWithAggregationInput | RoomBookingOrderByWithAggregationInput[]
    by: RoomBookingScalarFieldEnum[] | RoomBookingScalarFieldEnum
    having?: RoomBookingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomBookingCountAggregateInputType | true
    _avg?: RoomBookingAvgAggregateInputType
    _sum?: RoomBookingSumAggregateInputType
    _min?: RoomBookingMinAggregateInputType
    _max?: RoomBookingMaxAggregateInputType
  }

  export type RoomBookingGroupByOutputType = {
    id: string
    bookingNumber: string
    roomId: string
    bookingDate: Date
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount: number
    facilityNotes: string | null
    status: string
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomBookingCountAggregateOutputType | null
    _avg: RoomBookingAvgAggregateOutputType | null
    _sum: RoomBookingSumAggregateOutputType | null
    _min: RoomBookingMinAggregateOutputType | null
    _max: RoomBookingMaxAggregateOutputType | null
  }

  type GetRoomBookingGroupByPayload<T extends RoomBookingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomBookingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomBookingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomBookingGroupByOutputType[P]>
            : GetScalarType<T[P], RoomBookingGroupByOutputType[P]>
        }
      >
    >


  export type RoomBookingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingNumber?: boolean
    roomId?: boolean
    bookingDate?: boolean
    dateStr?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    unitName?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    participantCount?: boolean
    facilityNotes?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomBooking"]>

  export type RoomBookingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingNumber?: boolean
    roomId?: boolean
    bookingDate?: boolean
    dateStr?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    unitName?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    participantCount?: boolean
    facilityNotes?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomBooking"]>

  export type RoomBookingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bookingNumber?: boolean
    roomId?: boolean
    bookingDate?: boolean
    dateStr?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    unitName?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    participantCount?: boolean
    facilityNotes?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomBooking"]>

  export type RoomBookingSelectScalar = {
    id?: boolean
    bookingNumber?: boolean
    roomId?: boolean
    bookingDate?: boolean
    dateStr?: boolean
    startTime?: boolean
    endTime?: boolean
    purpose?: boolean
    unitName?: boolean
    applicantName?: boolean
    applicantPhone?: boolean
    participantCount?: boolean
    facilityNotes?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomBookingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bookingNumber" | "roomId" | "bookingDate" | "dateStr" | "startTime" | "endTime" | "purpose" | "unitName" | "applicantName" | "applicantPhone" | "participantCount" | "facilityNotes" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["roomBooking"]>
  export type RoomBookingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type RoomBookingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }
  export type RoomBookingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
  }

  export type $RoomBookingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomBooking"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bookingNumber: string
      roomId: string
      bookingDate: Date
      dateStr: string
      startTime: string
      endTime: string
      purpose: string
      unitName: string
      applicantName: string
      applicantPhone: string
      participantCount: number
      facilityNotes: string | null
      status: string
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomBooking"]>
    composites: {}
  }

  type RoomBookingGetPayload<S extends boolean | null | undefined | RoomBookingDefaultArgs> = $Result.GetResult<Prisma.$RoomBookingPayload, S>

  type RoomBookingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomBookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomBookingCountAggregateInputType | true
    }

  export interface RoomBookingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomBooking'], meta: { name: 'RoomBooking' } }
    /**
     * Find zero or one RoomBooking that matches the filter.
     * @param {RoomBookingFindUniqueArgs} args - Arguments to find a RoomBooking
     * @example
     * // Get one RoomBooking
     * const roomBooking = await prisma.roomBooking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomBookingFindUniqueArgs>(args: SelectSubset<T, RoomBookingFindUniqueArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomBooking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomBookingFindUniqueOrThrowArgs} args - Arguments to find a RoomBooking
     * @example
     * // Get one RoomBooking
     * const roomBooking = await prisma.roomBooking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomBookingFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomBookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomBooking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingFindFirstArgs} args - Arguments to find a RoomBooking
     * @example
     * // Get one RoomBooking
     * const roomBooking = await prisma.roomBooking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomBookingFindFirstArgs>(args?: SelectSubset<T, RoomBookingFindFirstArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomBooking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingFindFirstOrThrowArgs} args - Arguments to find a RoomBooking
     * @example
     * // Get one RoomBooking
     * const roomBooking = await prisma.roomBooking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomBookingFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomBookingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomBookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomBookings
     * const roomBookings = await prisma.roomBooking.findMany()
     * 
     * // Get first 10 RoomBookings
     * const roomBookings = await prisma.roomBooking.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomBookingWithIdOnly = await prisma.roomBooking.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomBookingFindManyArgs>(args?: SelectSubset<T, RoomBookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomBooking.
     * @param {RoomBookingCreateArgs} args - Arguments to create a RoomBooking.
     * @example
     * // Create one RoomBooking
     * const RoomBooking = await prisma.roomBooking.create({
     *   data: {
     *     // ... data to create a RoomBooking
     *   }
     * })
     * 
     */
    create<T extends RoomBookingCreateArgs>(args: SelectSubset<T, RoomBookingCreateArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomBookings.
     * @param {RoomBookingCreateManyArgs} args - Arguments to create many RoomBookings.
     * @example
     * // Create many RoomBookings
     * const roomBooking = await prisma.roomBooking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomBookingCreateManyArgs>(args?: SelectSubset<T, RoomBookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomBookings and returns the data saved in the database.
     * @param {RoomBookingCreateManyAndReturnArgs} args - Arguments to create many RoomBookings.
     * @example
     * // Create many RoomBookings
     * const roomBooking = await prisma.roomBooking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomBookings and only return the `id`
     * const roomBookingWithIdOnly = await prisma.roomBooking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomBookingCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomBookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomBooking.
     * @param {RoomBookingDeleteArgs} args - Arguments to delete one RoomBooking.
     * @example
     * // Delete one RoomBooking
     * const RoomBooking = await prisma.roomBooking.delete({
     *   where: {
     *     // ... filter to delete one RoomBooking
     *   }
     * })
     * 
     */
    delete<T extends RoomBookingDeleteArgs>(args: SelectSubset<T, RoomBookingDeleteArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomBooking.
     * @param {RoomBookingUpdateArgs} args - Arguments to update one RoomBooking.
     * @example
     * // Update one RoomBooking
     * const roomBooking = await prisma.roomBooking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomBookingUpdateArgs>(args: SelectSubset<T, RoomBookingUpdateArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomBookings.
     * @param {RoomBookingDeleteManyArgs} args - Arguments to filter RoomBookings to delete.
     * @example
     * // Delete a few RoomBookings
     * const { count } = await prisma.roomBooking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomBookingDeleteManyArgs>(args?: SelectSubset<T, RoomBookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomBookings
     * const roomBooking = await prisma.roomBooking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomBookingUpdateManyArgs>(args: SelectSubset<T, RoomBookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomBookings and returns the data updated in the database.
     * @param {RoomBookingUpdateManyAndReturnArgs} args - Arguments to update many RoomBookings.
     * @example
     * // Update many RoomBookings
     * const roomBooking = await prisma.roomBooking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomBookings and only return the `id`
     * const roomBookingWithIdOnly = await prisma.roomBooking.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomBookingUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomBookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomBooking.
     * @param {RoomBookingUpsertArgs} args - Arguments to update or create a RoomBooking.
     * @example
     * // Update or create a RoomBooking
     * const roomBooking = await prisma.roomBooking.upsert({
     *   create: {
     *     // ... data to create a RoomBooking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomBooking we want to update
     *   }
     * })
     */
    upsert<T extends RoomBookingUpsertArgs>(args: SelectSubset<T, RoomBookingUpsertArgs<ExtArgs>>): Prisma__RoomBookingClient<$Result.GetResult<Prisma.$RoomBookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomBookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingCountArgs} args - Arguments to filter RoomBookings to count.
     * @example
     * // Count the number of RoomBookings
     * const count = await prisma.roomBooking.count({
     *   where: {
     *     // ... the filter for the RoomBookings we want to count
     *   }
     * })
    **/
    count<T extends RoomBookingCountArgs>(
      args?: Subset<T, RoomBookingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomBookingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomBookingAggregateArgs>(args: Subset<T, RoomBookingAggregateArgs>): Prisma.PrismaPromise<GetRoomBookingAggregateType<T>>

    /**
     * Group by RoomBooking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomBookingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomBookingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomBookingGroupByArgs['orderBy'] }
        : { orderBy?: RoomBookingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomBookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomBooking model
   */
  readonly fields: RoomBookingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomBooking.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomBookingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomBooking model
   */
  interface RoomBookingFieldRefs {
    readonly id: FieldRef<"RoomBooking", 'String'>
    readonly bookingNumber: FieldRef<"RoomBooking", 'String'>
    readonly roomId: FieldRef<"RoomBooking", 'String'>
    readonly bookingDate: FieldRef<"RoomBooking", 'DateTime'>
    readonly dateStr: FieldRef<"RoomBooking", 'String'>
    readonly startTime: FieldRef<"RoomBooking", 'String'>
    readonly endTime: FieldRef<"RoomBooking", 'String'>
    readonly purpose: FieldRef<"RoomBooking", 'String'>
    readonly unitName: FieldRef<"RoomBooking", 'String'>
    readonly applicantName: FieldRef<"RoomBooking", 'String'>
    readonly applicantPhone: FieldRef<"RoomBooking", 'String'>
    readonly participantCount: FieldRef<"RoomBooking", 'Int'>
    readonly facilityNotes: FieldRef<"RoomBooking", 'String'>
    readonly status: FieldRef<"RoomBooking", 'String'>
    readonly notes: FieldRef<"RoomBooking", 'String'>
    readonly createdAt: FieldRef<"RoomBooking", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomBooking", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomBooking findUnique
   */
  export type RoomBookingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter, which RoomBooking to fetch.
     */
    where: RoomBookingWhereUniqueInput
  }

  /**
   * RoomBooking findUniqueOrThrow
   */
  export type RoomBookingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter, which RoomBooking to fetch.
     */
    where: RoomBookingWhereUniqueInput
  }

  /**
   * RoomBooking findFirst
   */
  export type RoomBookingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter, which RoomBooking to fetch.
     */
    where?: RoomBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomBookings to fetch.
     */
    orderBy?: RoomBookingOrderByWithRelationInput | RoomBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomBookings.
     */
    cursor?: RoomBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomBookings.
     */
    distinct?: RoomBookingScalarFieldEnum | RoomBookingScalarFieldEnum[]
  }

  /**
   * RoomBooking findFirstOrThrow
   */
  export type RoomBookingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter, which RoomBooking to fetch.
     */
    where?: RoomBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomBookings to fetch.
     */
    orderBy?: RoomBookingOrderByWithRelationInput | RoomBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomBookings.
     */
    cursor?: RoomBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomBookings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomBookings.
     */
    distinct?: RoomBookingScalarFieldEnum | RoomBookingScalarFieldEnum[]
  }

  /**
   * RoomBooking findMany
   */
  export type RoomBookingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter, which RoomBookings to fetch.
     */
    where?: RoomBookingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomBookings to fetch.
     */
    orderBy?: RoomBookingOrderByWithRelationInput | RoomBookingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomBookings.
     */
    cursor?: RoomBookingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomBookings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomBookings.
     */
    skip?: number
    distinct?: RoomBookingScalarFieldEnum | RoomBookingScalarFieldEnum[]
  }

  /**
   * RoomBooking create
   */
  export type RoomBookingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomBooking.
     */
    data: XOR<RoomBookingCreateInput, RoomBookingUncheckedCreateInput>
  }

  /**
   * RoomBooking createMany
   */
  export type RoomBookingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomBookings.
     */
    data: RoomBookingCreateManyInput | RoomBookingCreateManyInput[]
  }

  /**
   * RoomBooking createManyAndReturn
   */
  export type RoomBookingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * The data used to create many RoomBookings.
     */
    data: RoomBookingCreateManyInput | RoomBookingCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomBooking update
   */
  export type RoomBookingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomBooking.
     */
    data: XOR<RoomBookingUpdateInput, RoomBookingUncheckedUpdateInput>
    /**
     * Choose, which RoomBooking to update.
     */
    where: RoomBookingWhereUniqueInput
  }

  /**
   * RoomBooking updateMany
   */
  export type RoomBookingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomBookings.
     */
    data: XOR<RoomBookingUpdateManyMutationInput, RoomBookingUncheckedUpdateManyInput>
    /**
     * Filter which RoomBookings to update
     */
    where?: RoomBookingWhereInput
    /**
     * Limit how many RoomBookings to update.
     */
    limit?: number
  }

  /**
   * RoomBooking updateManyAndReturn
   */
  export type RoomBookingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * The data used to update RoomBookings.
     */
    data: XOR<RoomBookingUpdateManyMutationInput, RoomBookingUncheckedUpdateManyInput>
    /**
     * Filter which RoomBookings to update
     */
    where?: RoomBookingWhereInput
    /**
     * Limit how many RoomBookings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomBooking upsert
   */
  export type RoomBookingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomBooking to update in case it exists.
     */
    where: RoomBookingWhereUniqueInput
    /**
     * In case the RoomBooking found by the `where` argument doesn't exist, create a new RoomBooking with this data.
     */
    create: XOR<RoomBookingCreateInput, RoomBookingUncheckedCreateInput>
    /**
     * In case the RoomBooking was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomBookingUpdateInput, RoomBookingUncheckedUpdateInput>
  }

  /**
   * RoomBooking delete
   */
  export type RoomBookingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
    /**
     * Filter which RoomBooking to delete.
     */
    where: RoomBookingWhereUniqueInput
  }

  /**
   * RoomBooking deleteMany
   */
  export type RoomBookingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomBookings to delete
     */
    where?: RoomBookingWhereInput
    /**
     * Limit how many RoomBookings to delete.
     */
    limit?: number
  }

  /**
   * RoomBooking without action
   */
  export type RoomBookingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomBooking
     */
    select?: RoomBookingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomBooking
     */
    omit?: RoomBookingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomBookingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const RoomScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    capacity: 'capacity',
    location: 'location',
    facilities: 'facilities',
    priorityNotes: 'priorityNotes',
    isCombo: 'isCombo',
    comboChildCodes: 'comboChildCodes',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomBookingScalarFieldEnum: {
    id: 'id',
    bookingNumber: 'bookingNumber',
    roomId: 'roomId',
    bookingDate: 'bookingDate',
    dateStr: 'dateStr',
    startTime: 'startTime',
    endTime: 'endTime',
    purpose: 'purpose',
    unitName: 'unitName',
    applicantName: 'applicantName',
    applicantPhone: 'applicantPhone',
    participantCount: 'participantCount',
    facilityNotes: 'facilityNotes',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomBookingScalarFieldEnum = (typeof RoomBookingScalarFieldEnum)[keyof typeof RoomBookingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    code?: StringFilter<"Room"> | string
    capacity?: IntFilter<"Room"> | number
    location?: StringFilter<"Room"> | string
    facilities?: StringFilter<"Room"> | string
    priorityNotes?: StringNullableFilter<"Room"> | string | null
    isCombo?: BoolFilter<"Room"> | boolean
    comboChildCodes?: StringNullableFilter<"Room"> | string | null
    isActive?: BoolFilter<"Room"> | boolean
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    bookings?: RoomBookingListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    facilities?: SortOrder
    priorityNotes?: SortOrderInput | SortOrder
    isCombo?: SortOrder
    comboChildCodes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    bookings?: RoomBookingOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    code?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    capacity?: IntFilter<"Room"> | number
    location?: StringFilter<"Room"> | string
    facilities?: StringFilter<"Room"> | string
    priorityNotes?: StringNullableFilter<"Room"> | string | null
    isCombo?: BoolFilter<"Room"> | boolean
    comboChildCodes?: StringNullableFilter<"Room"> | string | null
    isActive?: BoolFilter<"Room"> | boolean
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    bookings?: RoomBookingListRelationFilter
  }, "id" | "name" | "code">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    facilities?: SortOrder
    priorityNotes?: SortOrderInput | SortOrder
    isCombo?: SortOrder
    comboChildCodes?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    code?: StringWithAggregatesFilter<"Room"> | string
    capacity?: IntWithAggregatesFilter<"Room"> | number
    location?: StringWithAggregatesFilter<"Room"> | string
    facilities?: StringWithAggregatesFilter<"Room"> | string
    priorityNotes?: StringNullableWithAggregatesFilter<"Room"> | string | null
    isCombo?: BoolWithAggregatesFilter<"Room"> | boolean
    comboChildCodes?: StringNullableWithAggregatesFilter<"Room"> | string | null
    isActive?: BoolWithAggregatesFilter<"Room"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type RoomBookingWhereInput = {
    AND?: RoomBookingWhereInput | RoomBookingWhereInput[]
    OR?: RoomBookingWhereInput[]
    NOT?: RoomBookingWhereInput | RoomBookingWhereInput[]
    id?: StringFilter<"RoomBooking"> | string
    bookingNumber?: StringFilter<"RoomBooking"> | string
    roomId?: StringFilter<"RoomBooking"> | string
    bookingDate?: DateTimeFilter<"RoomBooking"> | Date | string
    dateStr?: StringFilter<"RoomBooking"> | string
    startTime?: StringFilter<"RoomBooking"> | string
    endTime?: StringFilter<"RoomBooking"> | string
    purpose?: StringFilter<"RoomBooking"> | string
    unitName?: StringFilter<"RoomBooking"> | string
    applicantName?: StringFilter<"RoomBooking"> | string
    applicantPhone?: StringFilter<"RoomBooking"> | string
    participantCount?: IntFilter<"RoomBooking"> | number
    facilityNotes?: StringNullableFilter<"RoomBooking"> | string | null
    status?: StringFilter<"RoomBooking"> | string
    notes?: StringNullableFilter<"RoomBooking"> | string | null
    createdAt?: DateTimeFilter<"RoomBooking"> | Date | string
    updatedAt?: DateTimeFilter<"RoomBooking"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }

  export type RoomBookingOrderByWithRelationInput = {
    id?: SortOrder
    bookingNumber?: SortOrder
    roomId?: SortOrder
    bookingDate?: SortOrder
    dateStr?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    unitName?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    participantCount?: SortOrder
    facilityNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
  }

  export type RoomBookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    bookingNumber?: string
    AND?: RoomBookingWhereInput | RoomBookingWhereInput[]
    OR?: RoomBookingWhereInput[]
    NOT?: RoomBookingWhereInput | RoomBookingWhereInput[]
    roomId?: StringFilter<"RoomBooking"> | string
    bookingDate?: DateTimeFilter<"RoomBooking"> | Date | string
    dateStr?: StringFilter<"RoomBooking"> | string
    startTime?: StringFilter<"RoomBooking"> | string
    endTime?: StringFilter<"RoomBooking"> | string
    purpose?: StringFilter<"RoomBooking"> | string
    unitName?: StringFilter<"RoomBooking"> | string
    applicantName?: StringFilter<"RoomBooking"> | string
    applicantPhone?: StringFilter<"RoomBooking"> | string
    participantCount?: IntFilter<"RoomBooking"> | number
    facilityNotes?: StringNullableFilter<"RoomBooking"> | string | null
    status?: StringFilter<"RoomBooking"> | string
    notes?: StringNullableFilter<"RoomBooking"> | string | null
    createdAt?: DateTimeFilter<"RoomBooking"> | Date | string
    updatedAt?: DateTimeFilter<"RoomBooking"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
  }, "id" | "bookingNumber">

  export type RoomBookingOrderByWithAggregationInput = {
    id?: SortOrder
    bookingNumber?: SortOrder
    roomId?: SortOrder
    bookingDate?: SortOrder
    dateStr?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    unitName?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    participantCount?: SortOrder
    facilityNotes?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomBookingCountOrderByAggregateInput
    _avg?: RoomBookingAvgOrderByAggregateInput
    _max?: RoomBookingMaxOrderByAggregateInput
    _min?: RoomBookingMinOrderByAggregateInput
    _sum?: RoomBookingSumOrderByAggregateInput
  }

  export type RoomBookingScalarWhereWithAggregatesInput = {
    AND?: RoomBookingScalarWhereWithAggregatesInput | RoomBookingScalarWhereWithAggregatesInput[]
    OR?: RoomBookingScalarWhereWithAggregatesInput[]
    NOT?: RoomBookingScalarWhereWithAggregatesInput | RoomBookingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomBooking"> | string
    bookingNumber?: StringWithAggregatesFilter<"RoomBooking"> | string
    roomId?: StringWithAggregatesFilter<"RoomBooking"> | string
    bookingDate?: DateTimeWithAggregatesFilter<"RoomBooking"> | Date | string
    dateStr?: StringWithAggregatesFilter<"RoomBooking"> | string
    startTime?: StringWithAggregatesFilter<"RoomBooking"> | string
    endTime?: StringWithAggregatesFilter<"RoomBooking"> | string
    purpose?: StringWithAggregatesFilter<"RoomBooking"> | string
    unitName?: StringWithAggregatesFilter<"RoomBooking"> | string
    applicantName?: StringWithAggregatesFilter<"RoomBooking"> | string
    applicantPhone?: StringWithAggregatesFilter<"RoomBooking"> | string
    participantCount?: IntWithAggregatesFilter<"RoomBooking"> | number
    facilityNotes?: StringNullableWithAggregatesFilter<"RoomBooking"> | string | null
    status?: StringWithAggregatesFilter<"RoomBooking"> | string
    notes?: StringNullableWithAggregatesFilter<"RoomBooking"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomBooking"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomBooking"> | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    name: string
    code: string
    capacity: number
    location?: string
    facilities: string
    priorityNotes?: string | null
    isCombo?: boolean
    comboChildCodes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: RoomBookingCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    capacity: number
    location?: string
    facilities: string
    priorityNotes?: string | null
    isCombo?: boolean
    comboChildCodes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    bookings?: RoomBookingUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: RoomBookingUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bookings?: RoomBookingUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    name: string
    code: string
    capacity: number
    location?: string
    facilities: string
    priorityNotes?: string | null
    isCombo?: boolean
    comboChildCodes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingCreateInput = {
    id?: string
    bookingNumber: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutBookingsInput
  }

  export type RoomBookingUncheckedCreateInput = {
    id?: string
    bookingNumber: string
    roomId: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomBookingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutBookingsNestedInput
  }

  export type RoomBookingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingCreateManyInput = {
    id?: string
    bookingNumber: string
    roomId: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomBookingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RoomBookingListRelationFilter = {
    every?: RoomBookingWhereInput
    some?: RoomBookingWhereInput
    none?: RoomBookingWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type RoomBookingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    facilities?: SortOrder
    priorityNotes?: SortOrder
    isCombo?: SortOrder
    comboChildCodes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    facilities?: SortOrder
    priorityNotes?: SortOrder
    isCombo?: SortOrder
    comboChildCodes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    capacity?: SortOrder
    location?: SortOrder
    facilities?: SortOrder
    priorityNotes?: SortOrder
    isCombo?: SortOrder
    comboChildCodes?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    capacity?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomBookingCountOrderByAggregateInput = {
    id?: SortOrder
    bookingNumber?: SortOrder
    roomId?: SortOrder
    bookingDate?: SortOrder
    dateStr?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    unitName?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    participantCount?: SortOrder
    facilityNotes?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomBookingAvgOrderByAggregateInput = {
    participantCount?: SortOrder
  }

  export type RoomBookingMaxOrderByAggregateInput = {
    id?: SortOrder
    bookingNumber?: SortOrder
    roomId?: SortOrder
    bookingDate?: SortOrder
    dateStr?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    unitName?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    participantCount?: SortOrder
    facilityNotes?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomBookingMinOrderByAggregateInput = {
    id?: SortOrder
    bookingNumber?: SortOrder
    roomId?: SortOrder
    bookingDate?: SortOrder
    dateStr?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    purpose?: SortOrder
    unitName?: SortOrder
    applicantName?: SortOrder
    applicantPhone?: SortOrder
    participantCount?: SortOrder
    facilityNotes?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomBookingSumOrderByAggregateInput = {
    participantCount?: SortOrder
  }

  export type RoomBookingCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput> | RoomBookingCreateWithoutRoomInput[] | RoomBookingUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomBookingCreateOrConnectWithoutRoomInput | RoomBookingCreateOrConnectWithoutRoomInput[]
    createMany?: RoomBookingCreateManyRoomInputEnvelope
    connect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
  }

  export type RoomBookingUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput> | RoomBookingCreateWithoutRoomInput[] | RoomBookingUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomBookingCreateOrConnectWithoutRoomInput | RoomBookingCreateOrConnectWithoutRoomInput[]
    createMany?: RoomBookingCreateManyRoomInputEnvelope
    connect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type RoomBookingUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput> | RoomBookingCreateWithoutRoomInput[] | RoomBookingUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomBookingCreateOrConnectWithoutRoomInput | RoomBookingCreateOrConnectWithoutRoomInput[]
    upsert?: RoomBookingUpsertWithWhereUniqueWithoutRoomInput | RoomBookingUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomBookingCreateManyRoomInputEnvelope
    set?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    disconnect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    delete?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    connect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    update?: RoomBookingUpdateWithWhereUniqueWithoutRoomInput | RoomBookingUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomBookingUpdateManyWithWhereWithoutRoomInput | RoomBookingUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomBookingScalarWhereInput | RoomBookingScalarWhereInput[]
  }

  export type RoomBookingUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput> | RoomBookingCreateWithoutRoomInput[] | RoomBookingUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomBookingCreateOrConnectWithoutRoomInput | RoomBookingCreateOrConnectWithoutRoomInput[]
    upsert?: RoomBookingUpsertWithWhereUniqueWithoutRoomInput | RoomBookingUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomBookingCreateManyRoomInputEnvelope
    set?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    disconnect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    delete?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    connect?: RoomBookingWhereUniqueInput | RoomBookingWhereUniqueInput[]
    update?: RoomBookingUpdateWithWhereUniqueWithoutRoomInput | RoomBookingUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomBookingUpdateManyWithWhereWithoutRoomInput | RoomBookingUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomBookingScalarWhereInput | RoomBookingScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutBookingsInput = {
    create?: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutBookingsInput
    connect?: RoomWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutBookingsInput
    upsert?: RoomUpsertWithoutBookingsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutBookingsInput, RoomUpdateWithoutBookingsInput>, RoomUncheckedUpdateWithoutBookingsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type RoomBookingCreateWithoutRoomInput = {
    id?: string
    bookingNumber: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomBookingUncheckedCreateWithoutRoomInput = {
    id?: string
    bookingNumber: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomBookingCreateOrConnectWithoutRoomInput = {
    where: RoomBookingWhereUniqueInput
    create: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput>
  }

  export type RoomBookingCreateManyRoomInputEnvelope = {
    data: RoomBookingCreateManyRoomInput | RoomBookingCreateManyRoomInput[]
  }

  export type RoomBookingUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomBookingWhereUniqueInput
    update: XOR<RoomBookingUpdateWithoutRoomInput, RoomBookingUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomBookingCreateWithoutRoomInput, RoomBookingUncheckedCreateWithoutRoomInput>
  }

  export type RoomBookingUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomBookingWhereUniqueInput
    data: XOR<RoomBookingUpdateWithoutRoomInput, RoomBookingUncheckedUpdateWithoutRoomInput>
  }

  export type RoomBookingUpdateManyWithWhereWithoutRoomInput = {
    where: RoomBookingScalarWhereInput
    data: XOR<RoomBookingUpdateManyMutationInput, RoomBookingUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomBookingScalarWhereInput = {
    AND?: RoomBookingScalarWhereInput | RoomBookingScalarWhereInput[]
    OR?: RoomBookingScalarWhereInput[]
    NOT?: RoomBookingScalarWhereInput | RoomBookingScalarWhereInput[]
    id?: StringFilter<"RoomBooking"> | string
    bookingNumber?: StringFilter<"RoomBooking"> | string
    roomId?: StringFilter<"RoomBooking"> | string
    bookingDate?: DateTimeFilter<"RoomBooking"> | Date | string
    dateStr?: StringFilter<"RoomBooking"> | string
    startTime?: StringFilter<"RoomBooking"> | string
    endTime?: StringFilter<"RoomBooking"> | string
    purpose?: StringFilter<"RoomBooking"> | string
    unitName?: StringFilter<"RoomBooking"> | string
    applicantName?: StringFilter<"RoomBooking"> | string
    applicantPhone?: StringFilter<"RoomBooking"> | string
    participantCount?: IntFilter<"RoomBooking"> | number
    facilityNotes?: StringNullableFilter<"RoomBooking"> | string | null
    status?: StringFilter<"RoomBooking"> | string
    notes?: StringNullableFilter<"RoomBooking"> | string | null
    createdAt?: DateTimeFilter<"RoomBooking"> | Date | string
    updatedAt?: DateTimeFilter<"RoomBooking"> | Date | string
  }

  export type RoomCreateWithoutBookingsInput = {
    id?: string
    name: string
    code: string
    capacity: number
    location?: string
    facilities: string
    priorityNotes?: string | null
    isCombo?: boolean
    comboChildCodes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateWithoutBookingsInput = {
    id?: string
    name: string
    code: string
    capacity: number
    location?: string
    facilities: string
    priorityNotes?: string | null
    isCombo?: boolean
    comboChildCodes?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutBookingsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
  }

  export type RoomUpsertWithoutBookingsInput = {
    update: XOR<RoomUpdateWithoutBookingsInput, RoomUncheckedUpdateWithoutBookingsInput>
    create: XOR<RoomCreateWithoutBookingsInput, RoomUncheckedCreateWithoutBookingsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutBookingsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutBookingsInput, RoomUncheckedUpdateWithoutBookingsInput>
  }

  export type RoomUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateWithoutBookingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    capacity?: IntFieldUpdateOperationsInput | number
    location?: StringFieldUpdateOperationsInput | string
    facilities?: StringFieldUpdateOperationsInput | string
    priorityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    isCombo?: BoolFieldUpdateOperationsInput | boolean
    comboChildCodes?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingCreateManyRoomInput = {
    id?: string
    bookingNumber: string
    bookingDate: Date | string
    dateStr: string
    startTime: string
    endTime: string
    purpose: string
    unitName: string
    applicantName: string
    applicantPhone: string
    participantCount?: number
    facilityNotes?: string | null
    status?: string
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomBookingUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomBookingUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    bookingNumber?: StringFieldUpdateOperationsInput | string
    bookingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    dateStr?: StringFieldUpdateOperationsInput | string
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    purpose?: StringFieldUpdateOperationsInput | string
    unitName?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantPhone?: StringFieldUpdateOperationsInput | string
    participantCount?: IntFieldUpdateOperationsInput | number
    facilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}