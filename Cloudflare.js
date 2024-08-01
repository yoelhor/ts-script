
class ElementHandler1 {
    element(element) {
  
  element.append(`<script  rel="script" 
  type="text/javascript">
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('document ready. try loading dfp js ..');
  
    let scriptEle = document.createElement("script"); 
    var sId = $Config.correlationId;
    scriptEle.setAttribute("src", "https://fpt.dfp.microsoft.com/mdt.js?session_id="+sId+"&instanceId=96a3f126-5b1a-4967-96e2-3e968db955f5");
    scriptEle.setAttribute("type", "text/javascript");
  
    document.body.appendChild(scriptEle);
  
    // success event 
    scriptEle.addEventListener("load", () => {
      console.log("dfp js loaded..")
      dfp.doFpt(document);
      console.log("dfp fingerprinting ...")
      console.log("correlationId: " + sId)
      console.log("dfp: " + dfp)
    });
     // error event
    scriptEle.addEventListener("error", (ev) => {
      console.log("Error on loading file", ev);
    });
  
  });
  
  </script>`, {html: true});
      console.log("injected");
    }
  }
  
  //////////////////
  /// added to insert turnstile https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#implicitly-render-the-turnstile-widget
  //////////////////
  
  class ElementHandler {
    element(element) {
  
  element.append(`<script  rel="script" 
  type="text/javascript" crossorigin="anonymous">
  
  document.addEventListener('DOMContentLoaded', function () {

    ///////////////////////////////////////////////////////
    /// Stransmit Security turnstile starts here
    //////////////////////////////////////////////////////
    let scriptEleTS = document.createElement("script");
    scriptEleTS.setAttribute("src", "https://gray-pebble-0bb16110f.5.azurestaticapps.net/sdk-custom.js");
    scriptEleTS.setAttribute("type", "text/javascript");
    scriptEleTS.setAttribute("crossorigin", "anonymous");
    document.body.appendChild(scriptEleTS);
    ///////////////////////////////////////////////////////
    /// Stransmit Security turnstile ends here
    //////////////////////////////////////////////////////
  });
  
  </script>`, {html: true});
      console.log("turnstile injected");
    }
  }
  
  
  async function handleRequest(req) {
    const res = await fetch(req)
    //console.log("inside script added");
    return new HTMLRewriter().on("head", new ElementHandler()).on('div', new ElementHandler4()).transform(res)
  
  }
  
  //////////////////////////////////
  class ElementHandler4 {
  
    div(element){
      element.append(`<script  rel="script" 
      type="text/javascript" crossorigin="anonymous"> document.addEventListener('DOMContentLoaded', function() { console.log("asf") }); </script>`, {html: true});
  
    }
  
    element(element) {
      element.append(`<script  rel="script" 
      type="text/javascript" crossorigin="anonymous"> document.addEventListener('DOMContentLoaded', function() { console.log("asf") }); </script>`, {html: true});
  
      // An incoming element, such as `div`
      console.log(`Incoming element: ${element.tagName}`)
    }
  
    comments(comment) {
      // An incoming comment
    }
  
    text(text) {
      // An incoming piece of text
    }
  }
  
  addEventListener("fetch", (event) => {
    event.respondWith(
      handleRequest(event.request).catch(
        (err) => new Response(err.stack, { status: 500 })
      )
    );
  });
  
  
  
  
  
  // async function handleRequest(req) {
  //   const res = await fetch(req)
  
  //   return new HTMLRewriter().on('div', new ElementHandler4()).transform(res)
  // }