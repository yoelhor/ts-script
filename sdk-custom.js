console.log("Transmit Security: Script successfully loaded test");

function TransmitSecurityInit() {
  // Load the SDK
  let scriptEleTS = document.createElement("script");
  scriptEleTS.setAttribute("src", "https://gray-pebble-0bb16110f.5.azurestaticapps.net/sdk.js");
  scriptEleTS.setAttribute("type", "text/javascript");
  scriptEleTS.setAttribute("crossorigin", "anonymous");
  scriptEleTS.setAttribute("id", "ts-platform-script");
  document.body.appendChild(scriptEleTS);
  TransmitSecurityInitSdk();
}

function TransmitSecurityInitSdk() {
  document.getElementById("ts-platform-script").addEventListener("load", function() {
    // Initialize the SDK
    window.tsPlatform.initialize({ clientId: "e9h3ui2ygm3hrkg7xhsmihsx1vg26vbp", drs: { serverPath: "https://api.transmitsecurity.io/risk-collect/" } });
    console.log("Transmit Security:  Initialized");
  });

  const button = document.getElementById("idSIButton9");
  if (button != null) {
    console.log("Transmit Security: Successfully registered the onclick event");
    button.addEventListener("click", function (e) {
      TransmitSecurityTriggerActionEvent();
    });
  }
  else {
    console.log("Transmit Security: Error cannot find button idSIButton9");
  }
}

function TransmitSecurityTriggerActionEvent(event) {
  console.log("Transmit Security: TriggerActionEvent started");

  window.tsPlatform.drs.triggerActionEvent("register", { "claimedUserId": "hashedemail@test.com" }).then((actionResponse) => {
    let actionToken = actionResponse.actionToken;
    console.log("Transmit Security: Token " + actionToken);

    // Inject the action token into the display name field
    if (document.getElementById("idisplayNameInput") != null) {
      document.getElementById("idisplayNameInput").value = actionToken;
      console.log("Transmit Security: Token is in 'idisplayNameInput'");
    }
    else {
      console.log("Transmit Security: Error cannot find the idisplayNameInput");
    }
  });
}

// Initialize the SDK
TransmitSecurityInit();
