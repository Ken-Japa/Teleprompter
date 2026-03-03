/**
 * A reusable pool for TypedArrays to mitigate high-frequency allocation overhead.
 * By reusing buffers, we significantly reduce garbage collection (GC) pressure 
 * during real-time speech matching.
 */
class MatchBufferPool {
    private int32Buckets: Map<number, Int32Array[]> = new Map();
    private uint16Buckets: Map<number, Uint16Array[]> = new Map();

    private readonly SIZES = [256, 512, 1024, 2048, 4096];

    constructor() {
        this.SIZES.forEach(size => {
            this.int32Buckets.set(size, []);
            this.uint16Buckets.set(size, []);
        });
    }

    private getClosestSize(requestedSize: number): number {
        for (const size of this.SIZES) {
            if (requestedSize <= size) return size;
        }
        return requestedSize; // Fallback to exact size if larger than 4096
    }

    /**
     * Retrieves a zeroed-out Int32Array buffer.
     */
    public acquireInt32(minSize: number = 256): Int32Array {
        const size = this.getClosestSize(minSize);
        const bucket = this.int32Buckets.get(size || 256);

        const buffer = (bucket && bucket.pop()) || new Int32Array(size);
        buffer.fill(0);
        return buffer;
    }

    /**
     * Returns an Int32Array buffer to the pool.
     */
    public releaseInt32(buffer: Int32Array): void {
        const size = buffer.length;
        const bucket = this.int32Buckets.get(size);

        if (bucket && bucket.length < 10) {
            bucket.push(buffer);
        }
    }

    /**
     * Retrieves a zeroed-out Uint16Array buffer.
     */
    public acquireUint16(minSize: number = 256): Uint16Array {
        const size = this.getClosestSize(minSize);
        const bucket = this.uint16Buckets.get(size || 256);

        const buffer = (bucket && bucket.pop()) || new Uint16Array(size);
        buffer.fill(0);
        return buffer;
    }

    /**
     * Returns a Uint16Array buffer to the pool.
     */
    public releaseUint16(buffer: Uint16Array): void {
        const size = buffer.length;
        const bucket = this.uint16Buckets.get(size);

        if (bucket && bucket.length < 20) {
            bucket.push(buffer);
        }
    }
}

/**
 * Singleton instance of the buffer pool for the voice matcher system.
 */
export const matchBufferPool = new MatchBufferPool();

