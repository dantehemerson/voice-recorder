class ScriptProcessorReplacement extends AudioWorkletProcessor {
  process(inputs, outputs) {
    this.port.postMessage(inputs[0]);
    return true;
  }
}

registerProcessor('script-processor-replacement', ScriptProcessorReplacement);
