import { WebMidi } from "webmidi";

WebMidi
  .enable()
  .then(() => console.log("WebMidi enabled!"))
  .catch(err => alert(err));

export const onEnabled = () => {
    // WebMidi.inputs.forEach(input => console.log(input));
    // WebMidi.outputs.forEach(output => console.log(output.manufacturer, output.name));

    return WebMidi.inputs;
}