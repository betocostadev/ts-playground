export function advancedExample<T>(arg: T): T {
    return arg;
}

export function logWithTimestamp(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
}

export function createDecorator<T>(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
}