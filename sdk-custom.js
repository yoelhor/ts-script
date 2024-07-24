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

  console.log("Transmit Security: Successfully registered the onclick event");
  document.addEventListener("click", function (e) {
    if (e.target.id === 'idSIButton9') {
      TransmitSecurityTriggerActionEvent();
    }
  });
}

function getEmail() {
  try {
    const inputs = $Config['arrPaginatedInputs'][0]['inputs'];
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (input['name'] === 'email') {
        return input['value']
      }
    }
  } catch (err) {
    console.log("Failed to get email", err)
  }
}


function getCorrelationId() {
  try {
    return $Config['correlationId'];
  } catch (err) {
    console.log("Failed to get correlation id", err)
  }
}

function TransmitSecurityTriggerActionEvent(event) {
  console.log("Transmit Security: TriggerActionEvent started");
  const email = getEmail();
  const correlationId = getCorrelationId();
  window.tsPlatform.drs.triggerActionEvent("register", { "claimedUserId": email, "correlationId": correlationId }).then((actionResponse) => {
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
