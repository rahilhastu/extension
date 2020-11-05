(function () {
  if (window.hasRun) {
    return;
  }
  var word_for_sentence;
  document.addEventListener("dblclick", () => {
    word_for_sentence = window.getSelection().toString();
    console.log(word_for_sentence);
  });

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      return Promise.resolve(word_for_sentence);
    }
  });
})();
