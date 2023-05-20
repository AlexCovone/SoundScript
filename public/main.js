// status fields and start button in UI
var phraseDiv;
var startRecognizeOnceAsyncButton;

// subscription key and region for speech services.
var subscriptionKey, serviceRegion, languageTargetOptions, languageSourceOptions;
var SpeechSDK;
var recognizer;

document.addEventListener('DOMContentLoaded', function () {
  startRecognizeOnceAsyncButton = document.getElementById('startRecognizeOnceAsyncButton');
  subscriptionKey = document.getElementById('subscriptionKey');
  serviceRegion = document.getElementById('serviceRegion');

  languageTargetOptions = document.getElementById('languageTargetOptions');
  languageSourceOptions = document.getElementById('languageSourceOptions');
  phraseDiv = document.getElementById('phraseDiv');

  // Form Inputs
  translationInput = document.getElementById('translationInput');
  sourceLanguageInput = document.getElementById('sourceLanguageInput');
  targetLanguageInput = document.getElementById('targetLanguageInput');

  startRecognizeOnceAsyncButton.addEventListener('click', function () {
    startRecognizeOnceAsyncButton.disabled = true;
    phraseDiv.innerHTML = '';

    if (subscriptionKey.value === '' || subscriptionKey.value === 'subscription') {
      alert('Please enter your Microsoft Cognitive Services Speech subscription key!');
      startRecognizeOnceAsyncButton.disabled = false;
      return;
    }
    var speechConfig = SpeechSDK.SpeechTranslationConfig.fromSubscription(subscriptionKey.value, serviceRegion.value);

    speechConfig.speechRecognitionLanguage = languageSourceOptions.value;
    let language = languageTargetOptions.value;
    speechConfig.addTargetLanguage(language);

    var audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer = new SpeechSDK.TranslationRecognizer(speechConfig, audioConfig);

    recognizer.recognizeOnceAsync(
      function (result) {
        startRecognizeOnceAsyncButton.disabled = false;
        let translation = result.translations.get(language);
        phraseDiv.innerHTML += translation;

        // Form Inputs for POST request
        translationInput.value = translation;
        sourceLanguageInput.value = languageSourceOptions.value;
        targetLanguageInput.value = languageTargetOptions.value;

        recognizer.close();
        recognizer = undefined;
      },
      function (err) {
        startRecognizeOnceAsyncButton.disabled = false;
        // TODO:
        // Add alert?
        phraseDiv.innerHTML += 'Requested device not found. Please initialize microphone.';
        console.log(err);
        window.console.log(err);

        recognizer.close();
        recognizer = undefined;
      }
    );
  });

  if (!!window.SpeechSDK) {
    SpeechSDK = window.SpeechSDK;
    startRecognizeOnceAsyncButton.disabled = false;

    document.getElementById('content').style.display = 'block';
    document.getElementById('warning').style.display = 'none';
  }
});
