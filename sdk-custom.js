function TransmitSecurityInit(event) {

  // Load the SDK
  let scriptEleTS = document.createElement("script");
  scriptEleTS.setAttribute("src", "https://gray-pebble-0bb16110f.5.azurestaticapps.net/sdk.js");
  scriptEleTS.setAttribute("type", "text/javascript");
  scriptEleTS.setAttribute("crossorigin", "anonymous");
  document.body.appendChild(scriptEleTS);

  // Initialize the SDK
  window.tsPlatform.initialize({ clientId: "e9h3ui2ygm3hrkg7xhsmihsx1vg26vbp", drs: { serverPath: "https://api.transmitsecurity.io/risk-collect/" } });
  console.log("TS intialized");

  //const form = document.querySelector("form");
  //form.addEventListener("submit", TransmitSecurityTriggerActionEvent);

  if (document.getElementById("idisplayNameInput") != null) {

    document.getElementById("idisplayNameInput").addEventListener("click", function (e) {
      TransmitSecurityTriggerActionEvent();
    });
  }

}

function TransmitSecurityTriggerActionEvent(event) {

  console.log("TransmitSecurityTriggerActionEvent started");

  // Prevent the default form submission
  event.preventDefault();

  window.tsPlatform.drs.triggerActionEvent("register", { "claimedUserId": "hashedemail@test.com" }).then((actionResponse) => {
    let actionToken = actionResponse.actionToken;
    console.log("Reading the TS token");
    //document.getElementById("ts-drs-response").value = actionToken;
    console.log("TS token: " + actionToken);

    // Inject the action token into the display name field
    if (document.getElementById("idisplayNameInput") != null) {
      document.getElementById("idisplayNameInput").value = actionToken;
      console.log("TS token is in 'idisplayNameInput'");
    }

    event.target.submit();

  });

  // Return false to prevent the form from submitting before async completes
  return false;
}