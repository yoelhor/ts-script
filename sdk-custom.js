console.log("Transmit Security:  Script successfully loaded");

function TransmitSecurityInit(event) {

  // Load the SDK
  let scriptEleTS = document.createElement("script");
  scriptEleTS.setAttribute("src", "https://gray-pebble-0bb16110f.5.azurestaticapps.net/sdk.js");
  scriptEleTS.setAttribute("type", "text/javascript");
  scriptEleTS.setAttribute("crossorigin", "anonymous");
  document.body.appendChild(scriptEleTS);

  //const form = document.querySelector("form");
  //form.addEventListener("submit", TransmitSecurityTriggerActionEvent);

  setTimeout(TransmitSecurityInitSdk, 5000);
}

function TransmitSecurityInitSdk() {
  // Initialize the SDK
  window.tsPlatform.initialize({ clientId: "e9h3ui2ygm3hrkg7xhsmihsx1vg26vbp", drs: { serverPath: "https://api.transmitsecurity.io/risk-collect/" } });
  console.log("Transmit Security:  Intialized");


  if (document.getElementById("headerLogo") != null) {

    console.log("Transmit Security: Successfully registered the onclick event");
    
    document.getElementById("headerLogo").addEventListener("click", function (e) {
      TransmitSecurityTriggerActionEvent();
    });
  }
  else {
    console.log("Transmit Security: Error cannot find the headerLogo");
  }
}

function TransmitSecurityTriggerActionEvent(event) {

  console.log("Transmit Security: TriggerActionEvent started");

  // Prevent the default form submission
  //event.preventDefault();

  window.tsPlatform.drs.triggerActionEvent("register", { "claimedUserId": "hashedemail@test.com" }).then((actionResponse) => {
    let actionToken = actionResponse.actionToken;
    console.log("Transmit Security: Reading the action token");
    //document.getElementById("ts-drs-response").value = actionToken;
    console.log("Transmit Security: Token " + actionToken);

    // Inject the action token into the display name field
    if (document.getElementById("idisplayNameInput") != null) {
      document.getElementById("idisplayNameInput").value = actionToken;
      console.log("Transmit Security: Token is in 'idisplayNameInput'");
    }

    event.target.submit();

  });

  // Return false to prevent the form from submitting before async completes
  return false;
}

// Initialize the SDK
TransmitSecurityInit();