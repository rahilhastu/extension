function listenForClicks() {
  // document.addEventListener("click", (e) => {
  function getMeaning(tabs) {
    browser.tabs.sendMessage(
      tabs[0].id,
      {
        command: "beastify",
      },
      (data) => {
        console.log("Data from Content Script: ", data);
        if (data != undefined) {
          document.querySelector("#word").innerHTML = data;
          function onCreated(windowInfo) {
            console.log(`Created window: ${windowInfo.id}`);
          }

          function onError(error) {
            console.log(`Error: ${error}`);
          }
          var creating = browser.tabs.create({
            url: `https://wordsinasentence.com/${data}-in-a-sentence/`,
          });
          creating.then(onCreated, onError);
        } else {
          reportExecuteScriptError();
        }
      }
    );
  }
  function reportError(error) {
    console.error(`Could not get the meaning: ${error}`);
  }
  // if (e.target.classList.contains("img_meaning")) {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then(getMeaning)
    .catch(reportError);
  // }
  // });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute Meaning content script: ${error.message}`);
}

browser.tabs
  .executeScript({ file: "/content_scripts/meaning.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
