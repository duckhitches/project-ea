class MicProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this._bufferSize = 2048;
        this._buffer = new Float32Array(this._bufferSize);
        this._bytesWritten = 0;
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        if (input.length > 0) {
            const float32Data = input[0];

            // Convert Float32 to Int16
            const int16Data = new Int16Array(float32Data.length);
            for (let i = 0; i < float32Data.length; i++) {
                const s = Math.max(-1, Math.min(1, float32Data[i]));
                int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
            }

            this.port.postMessage({ type: 'pcm', buffer: int16Data.buffer }, [int16Data.buffer]);
        }
        return true;
    }
}

registerProcessor('mic-processor', MicProcessor);
