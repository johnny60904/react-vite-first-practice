
export const primitiveType = {
	Null: 'Null',
	Undefined: 'Undefined',
	String: 'String',
	Number: 'Number',
	BigInt: 'BigInt',
	Boolean: 'Boolean',
	Symbol: 'Symbol',
} as const satisfies Record<string, string>;

export type PrimitiveType = keyof typeof primitiveType;



export const fundamentalType = {
	// Object   : 'Object',
	Function : 'Function',
	Error    : 'Error',
	Boolean  : 'Boolean',
	Symbol   : 'Symbol',
} as const satisfies Record<string, string>;

export type FundamentalType = keyof typeof fundamentalType;



export const collectionType = {
	Map     : 'Map',
	Set     : 'Set',
	WeakMap : 'WeakMap',
	WeakSet : 'WeakSet'
} as const satisfies Record<string, string>;

export type CollectionType = keyof typeof collectionType;



export const typedArrayType = {
	Int8Array: 'Int8Array',
	Int16Array: 'Int16Array',
	Int32Array: 'Int32Array',
	Uint8Array: 'Uint8Array',
	Uint8ClampedArray: 'Uint8ClampedArray',
	Uint16Array: 'Uint16Array',
	Uint32Array: 'Uint32Array',
	BigInt64Array: 'BigInt64Array',
	BigUint64Array: 'BigUint64Array',
	Float16Array: 'Float16Array',
	Float32Array: 'Float32Array',
	Float64Array: 'Float64Array',
} as const satisfies Record<string, string>;

type TypedArrayType = keyof typeof typedArrayType;



export const arrayType = {
	Array      : 'Array',
	...typedArrayType
} as const satisfies Record<string, string>;

export type ArrayType = keyof typeof arrayType;



export const numericType = {
	Number : 'Number',
	BigInt : 'BigInt',
	Math   : 'Math'
} as const satisfies Record<string, string>;

export type NumericType = keyof typeof numericType;



export const timeType = {
	Date : 'Date',
} as const satisfies Record<string, string>;

export type TimeType = keyof typeof timeType;



export const textType = {
	String : 'String',
	RegExp : 'RegExp',
} as const satisfies Record<string, string>;

export type TextType = keyof typeof textType;



export const bufferAndStructure = {
	ArrayBuffer       : 'ArrayBuffer',
	SharedArrayBuffer : 'SharedArrayBuffer',
	DataView          : 'DataView',
	JSON              : 'JSON'
} as const satisfies Record<string, string>;

export type BufferAndStructureType = keyof typeof bufferAndStructure;



export const asyncAndControlAbstractionType = {
	Promise                : 'Promise',
	Generator              : 'Generator',
	GeneratorFunction      : 'GeneratorFunction',
	AsyncFunction          : 'AsyncFunction',
	AsyncGenerator         : 'AsyncGenerator',
	AsyncGeneratorFunction : 'AsyncGeneratorFunction'
} as const satisfies Record<string, string>;

export type AsyncAndControlAbstractionType = keyof typeof asyncAndControlAbstractionType;



export const reflectionType = {
	Proxy   : 'Proxy',
	Reflect : 'Reflect'
} as const satisfies Record<string, string>;

export type ReflectionType = keyof typeof reflectionType;



export const webAndInternationalizationType = {
	Intl        : 'Intl',
	WebAssembly : 'WebAssembly'
} as const satisfies Record<string, string>;

export type WebAndInternationalizationType = keyof typeof webAndInternationalizationType;



export const dataType = {
	...primitiveType,
	...fundamentalType,
	...collectionType,
	...arrayType,
	...numericType,
	...timeType,
	...textType,
	...bufferAndStructure,
	Object                 : 'Object',
	Reflect                : 'Reflect',
	Proxy                  : 'Proxy',
	Intl                   : 'Intl',
	AsyncFunction          : 'AsyncFunction',
	GeneratorFunction      : 'GeneratorFunction',
	AsyncGeneratorFunction : 'AsyncGeneratorFunction'
} as const satisfies Record<string, string>;

export type DataType = keyof typeof dataType;



function getTaggedType(value: unknown): string {
	return Object.prototype.toString.call(value).slice(8, -1);
}



export function isString(value: unknown, allowBlank: boolean = false): value is string {
	if (allowBlank) 
		return (typeof value === 'string') || (value instanceof String);

	return (
		(
			(typeof value === 'string') && 
			(value.trim().length > 0)
		) || 
		(
			(value instanceof String) && 
			(value.trim().length > 0)
		)
	);
}

export function isNumber(value: unknown): value is number {
	return (typeof value === 'number') || (value instanceof Number);
}

export function isBigInt(value: unknown): value is bigint {
	return (typeof value === 'bigint') || (value instanceof BigInt);
}

export function isBoolean(value: unknown): value is boolean {
	return (typeof value === 'boolean') || (value instanceof Boolean);
}

export function isSymbol(value: unknown): value is symbol {
	return (typeof value === 'symbol') || (value instanceof Symbol);
}

export function isNull(value: unknown): value is null {
	return value === null;
}

export function isUndefined(value: unknown): value is undefined {
	return (typeof value === 'undefined') || (value === undefined);
}

export function isArray(value: unknown): value is unknown[] {
	return (Array.isArray(value)) && (getTaggedType(value) === 'Array');
}

export function isArrayOf<T>(value: T | T[]): value is T[] {
	return (Array.isArray(value)) && (getTaggedType(value) === 'Array');
}



export function isPrimitiveType(value: unknown): value is PrimitiveType {
	if (value === null) return true;
	switch (typeof value) {
		case 'undefined':
		case 'string':
		case 'number':
		case 'bigint':
		case 'boolean':
		case 'symbol':
			return true;
		default:
			break;
	}
	// Boxed primitive objects
	if (
		(value instanceof Boolean) || 
		(value instanceof Symbol)
	) {
		return true;
	}
	return false;
}

export function getPrimitiveType(value: unknown): PrimitiveType {
	if (value === null) return 'Null';
	switch (typeof value) {
		case 'undefined':
			return 'Undefined';
		case 'string':
			return 'String';
		case 'number':
			return 'Number';
		case 'bigint':
			return 'BigInt';
		case 'boolean':
			return 'Boolean';
		case 'symbol':
			return 'Symbol';
		default:
			break;
	}
	if (value instanceof Boolean) {
		return 'Boolean';
	}
	if (value instanceof Symbol) {
		return 'Symbol';
	}
	throw new Error(`Unsupported type: "${typeof value}".`);
}



export function isTypedArrayType(value: unknown): value is TypedArrayType {
	if (value === null || value === undefined) return false;
	const tag: string = getTaggedType(value);
	if (
		(ArrayBuffer.isView(value)) && 
		!(value instanceof DataView) && 
		(Object.hasOwn(typedArrayType, tag))
	) {
		return true;
	}
	return false;
};

export function getTypedArrayType(value: unknown): TypedArrayType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (
		(ArrayBuffer.isView(value)) && 
		!(value instanceof DataView) && 
		(Object.hasOwn(typedArrayType, tag))
	) {
		switch (tag) {
			case 'Int8Array':
				return 'Int8Array';
			case 'Int16Array':
				return 'Int16Array';
			case 'Int32Array':
				return 'Int32Array';
			case 'Uint8Array':
				return 'Uint8Array';
			case 'Uint8ClampedArray':
				return 'Uint8ClampedArray';
			case 'Uint16Array':
				return 'Uint16Array';
			case 'Uint32Array':
				return 'Uint32Array';
			case 'BigInt64Array':
				return 'BigInt64Array';
			case 'BigUint64Array':
				return 'BigUint64Array';
			case 'Float16Array':
				return 'Float16Array';
			case 'Float32Array':
				return 'Float32Array';
			case 'Float64Array':
				return 'Float64Array';
			default:
				break;
		}
	}
	throw new Error(`Unsupported type: "${tag}".`);
};



export function isArrayType(value: unknown): value is ArrayType {
	if (value === null || value === undefined) return false;
	const tag: string = getTaggedType(value);
	if (
		(
			(Array.isArray(value)) && 
			(tag === 'Array')
		) || 
		(
			isTypedArrayType(value)
		)
	) return true;
	return false;
};

export function getArrayType(value: unknown): ArrayType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (
		(Array.isArray(value)) && 
		(tag === 'Array')
	) return 'Array';
	if (isTypedArrayType(value)) return getTypedArrayType(value);
	throw new Error(`Unsupported type: "${tag}".`);
};



export function isCollectionType(value: unknown): value is CollectionType {
	if (value === null || value === undefined) return false;
	const tag: string = getTaggedType(value);
	if (
		((value instanceof Map) && (tag === 'Map')) || 
		((value instanceof Set) && (tag === 'Set')) || 
		((value instanceof WeakMap) && (tag === 'WeakMap')) || 
		((value instanceof WeakSet) && (tag === 'WeakSet'))
	) return true;
	return false;
}

export function getCollectionType(value: unknown): CollectionType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (
		(value instanceof Map) && 
		(tag === 'Map')
	) return 'Map';
	if (
		(value instanceof Set) && 
		(tag === 'Set')
	) return 'Set';
	if (
		(value instanceof WeakMap) && 
		(tag === 'WeakMap')
	) return 'WeakMap';
	if (
		(value instanceof WeakSet) && 
		(tag === 'WeakSet')
	) return 'WeakSet';
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isFundamentalType(value: unknown): value is FundamentalType {
	if (value === null || value === undefined) return false;
	switch (typeof value) {
		case 'boolean':
		case 'symbol':
		case 'function':
			return true;
		default:
			break;
	}
	if (
		(value instanceof Boolean) || 
		(value instanceof Symbol) || 
		(value instanceof Error)
	) return true;
	return false;
}

export function getFundamentalType(value: unknown): FundamentalType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	switch (typeof value) {
		case 'boolean':
			return 'Boolean';
		case 'symbol':
			return 'Symbol';
		case 'function':
			return 'Function';
		default:
			break;
	}
	if (value instanceof Boolean) return 'Boolean';
	if (value instanceof Symbol) return 'Symbol';
	if (value instanceof Error) return 'Error';
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isNumericType(value: unknown): value is NumericType {
	if (value === null || value === undefined) return false;
	switch (typeof value) {
		case 'number':
		case 'bigint':
			return true;
		default:
			break;
	}
	if (
		(value instanceof Number) || 
		(value instanceof BigInt)
	) return true;
	if (value === Math) return true;
	return false;
}

export function getNumericType(value: unknown): NumericType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	switch (typeof value) {
		case 'number':
			return 'Number';
		case 'bigint':
			return 'BigInt';
		default:
			break;
	}
	if (value instanceof Number) return 'Number';
	if (value instanceof BigInt) return 'BigInt';
	if (value === Math) return 'Math';
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isTimeType(value: unknown): value is TimeType {
	if (value === null || value === undefined) return false;
	const tag: string = getTaggedType(value);
	if (
		(value instanceof Date) && 
		(tag === 'Date')
	) return true;
	return false;
}

export function getTimeType(value: unknown): TimeType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (
		(value instanceof Date) && 
		(tag === 'Date')
	) return 'Date';
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isTextType(value: unknown): value is TextType {
	if (value === null || value === undefined) return false;
	const tag: string = getTaggedType(value);
	if (
		(
			(typeof value === 'string') && 
			(tag === 'String')
		) || 
		(
			value instanceof String
		) || 
		(
			value instanceof RegExp
		)
	) return true;
	return false;
}

export function getTextType(value: unknown): TextType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (
		(
			(typeof value === 'string') && 
			(tag === 'String')
		) || 
		(value instanceof String)
	) return 'String';
	if (value instanceof RegExp) return 'RegExp';
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isBufferAndStructureType(value: unknown): value is BufferAndStructureType {
	if (value === null || value === undefined) return false;
	if (ArrayBuffer.isView(value) && value instanceof DataView) return true; 
	if (value instanceof ArrayBuffer) return true;
	if (
		(typeof SharedArrayBuffer !== 'undefined') && 
		(value instanceof SharedArrayBuffer)
	) return true;
	if (value === JSON) return true;
	return false;
}

export function getBufferAndStructureType(value: unknown): BufferAndStructureType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (ArrayBuffer.isView(value) && value instanceof DataView) return 'DataView'; 
	if (value instanceof ArrayBuffer) return 'ArrayBuffer';
	if (
		(typeof SharedArrayBuffer !== 'undefined') && 
		(value instanceof SharedArrayBuffer)
	) return 'SharedArrayBuffer';
	if (value === JSON) return 'JSON';
	throw new Error(`Unsupported type: "${tag}".`);
}



export const specialType = {
	Reflect                : 'Reflect',
	Proxy                  : 'Proxy',
	Math                   : 'Math',
	JSON                   : 'JSON',
	Intl                   : 'Intl',
	AsyncFunction          : 'AsyncFunction',
	GeneratorFunction      : 'GeneratorFunction',
	AsyncGeneratorFunction : 'AsyncGeneratorFunction'
} as const satisfies Record<string, string>;

export type SpecialType = keyof typeof specialType;


export function isSpecialType(value: unknown): value is SpecialType {
	if (value === null || value === undefined) return false;
	if (
		(value === Reflect) || 
		(value === Proxy) || 
		(value === Math) || 
		(value === JSON)
	) return true;
	if (
		(typeof Intl !== 'undefined') && 
		(value === Intl)
	) return true;
	if (typeof value === 'function') {
		const tag = getTaggedType(value);
		return (
			(
				(tag === 'AsyncFunction') || 
				(tag === 'GeneratorFunction') || 
				(tag === 'AsyncGeneratorFunction')
			) && (
				Object.hasOwn(dataType, tag)
			)
		) ? true : false;
	}
	return false;
}

export function getSpecialType(value: unknown): SpecialType {
	const tag: string = getTaggedType(value);
	if (value === null || value === undefined) throw new Error(`Unsupported type: "${tag}".`);
	if (value === Reflect) return 'Reflect';
	if (value === Proxy)   return 'Proxy';
	if (value === Math)    return 'Math';
	if (value === JSON)    return 'JSON';
	if (
		(typeof Intl !== 'undefined') && 
		(value === Intl)
	) return 'Intl';
	if (typeof value === 'function') {
		const tag = getTaggedType(value);
		if (Object.hasOwn(dataType, tag)) {
			if (tag === 'AsyncFunction')          return 'AsyncFunction';
			if (tag === 'GeneratorFunction')      return 'GeneratorFunction';
			if (tag === 'AsyncGeneratorFunction') return 'AsyncGeneratorFunction';
		}
	}
	throw new Error(`Unsupported type: "${tag}".`);
}



export function isDataType(value: unknown): value is DataType {
  	if (
		(isPrimitiveType(value)) || 
		(isArrayType(value)) || 
  		(isCollectionType(value)) || 
  		(isFundamentalType(value)) || 
  		(isNumericType(value)) || 
  		(isTimeType(value)) || 
  		(isTextType(value)) || 
  		(isBufferAndStructureType(value)) || 
  		(isSpecialType(value))
	) return true;
	
	// Fallback
  	const tag = getTaggedType(value);
  	if (Object.hasOwn(dataType, tag)) return true;
	
  	return false;
}

export function getType(value: unknown): DataType {
  	if (isPrimitiveType(value))          return getPrimitiveType(value);
  	if (isArrayType(value))              return getArrayType(value);
  	if (isCollectionType(value))         return getCollectionType(value);
  	if (isFundamentalType(value))        return getFundamentalType(value);
  	if (isNumericType(value))            return getNumericType(value);
  	if (isTimeType(value))               return getTimeType(value);
  	if (isTextType(value))               return getTextType(value);
  	if (isBufferAndStructureType(value)) return getBufferAndStructureType(value);
  	if (isSpecialType(value))            return getSpecialType(value);
	
	// Fallback
  	const tag = getTaggedType(value);
  	if (Object.hasOwn(dataType, tag)) return tag as DataType;
	
  	return 'Object';
}
