//it works in Chrome by default

const synth = window.speechSynthesis;
let voices = [];
const speechSynthesizer = (text: string) => {
  let selectedVoice: SpeechSynthesisVoice;
  const getVoices = () => {
    voices = synth.getVoices();
    voices.forEach((voice) => {
      if (voice.name == "Google UK English Female") {
        selectedVoice = voice;
        console.log(selectedVoice.name);
      }
      // console.log(voice.name + "(" + voice.lang + ")");
    });
  };

  getVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
  }
  const speak = () => {
    if (synth.speaking) {
      console.log("Already speaking...");
      return;
    }
    if (text !== "") {
      const speakText = new SpeechSynthesisUtterance(text);

      // end of speaking callback
      speakText.onend = (e) => {
        console.log("Speak end");
      };

      // error
      speakText.onerror = (e) => {
        console.error("Something went wron");
      };

      // selected voice
      speakText.voice = selectedVoice;

      // Set pitch and rate
      speakText.rate = 0.7;
      speakText.pitch = 0.8;

      // speak
      synth.speak(speakText);
    }
  };
  speak();
};
export default speechSynthesizer;
