document.addEventListener('DOMContentLoaded', function () {


    ///////////////////////////////////////////////////////
    /// Stransmit Security turnstile starts here
    //////////////////////////////////////////////////////
    let scriptEleTS = document.createElement("script");
    scriptEleTS.setAttribute("src", "https://gray-pebble-0bb16110f.5.azurestaticapps.net/sdk-custom.js");
    scriptEleTS.setAttribute("type", "text/javascript");
    scriptEleTS.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(scriptEleTS);
  
    TransmitSecurityInit();
    ///////////////////////////////////////////////////////
    /// Stransmit Security turnstile ends here
    //////////////////////////////////////////////////////
  
  
    ///////////////////////////////////////////////////////
    /// Cloudflare turnstile starts here
    //////////////////////////////////////////////////////
    console.log('document ready. try loading turnstile.');
  
    let scriptEle = document.createElement("script");
    var sId = $Config.correlationId;
    scriptEle.setAttribute("src", "https://challenges.cloudflare.com/turnstile/v0/api.js");
    scriptEle.setAttribute("type", "text/javascript");
    scriptEle.setAttribute("crossorigin", "anonymous");
  
    document.body.appendChild(scriptEle);
  
    let scriptEle2 = document.createElement("div");
    scriptEle2.setAttribute("class", "cf-turnstile");
    scriptEle2.setAttribute("data-sitekey", "0x4AAAAAAAb3WSr7dDKfsDw3");
    scriptEle2.setAttribute("appearance", "always");
    scriptEle2.setAttribute("data-theme", "light");
  
    document.body.appendChild(scriptEle2);
    console.log(document.getElementById("idBoilerPlateText"));
  
    // Cloudflare section
    document.addEventListener("click", function (e) {
      console.log("Reading token and setting value of attributes with them. ");
      let cfValue = document.getElementsByName("cf-turnstile-response")[0].value;
      console.log("CF token: " + cfValue);
      if (document.getElementById("iextension_0cae61cc83e94edd978ec2fde3c5f2f3_SpecialDietInput") != null) {
        document.getElementById("iextension_0cae61cc83e94edd978ec2fde3c5f2f3_SpecialDietInput").value = cfValue;
        console.log("CF token is in 'iextension_0cae61cc83e94edd978ec2fde3c5f2f3_SpecialDietInput'");
      }
  
    });
  
    // success event 
    scriptEle.addEventListener("load", () => {
      //////////////////////////////////////////////////////////
      //Set the custom attribute with the value of cf-turnstile on sumbit
      document.addEventListener('submit', functSubmit);
      console.log("register submit");
      function functSubmit(event) {
        console.log("inside onsumit");
        let cfValue = document.getElementsByName("cf-turnstile-response")[0].value;
        document.getElementById("iextension_0cae61cc83e94edd978ec2fde3c5f2f3_SpecialDietInput").value = cfValue;
        console.log(cfValue);
      }
      /// Cloudflare turnstile ends here
    });
  
    // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  
  });