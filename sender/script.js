var applicationId = "E978DA5B",
    namespace = "urn:x-cast:uk.co.ecksdee",
    session = null;

var $wrapper = $(".js-wrapper"),
    $currentlyCasting = $(".js-currently-casting"),
    $urlToCast = $("#urlToCast"),
    $form = $("#toCast");

/**
 * Call initialization for Cast
 */
window["__onGCastApiAvailable"] = function(loaded, errorInfo) {
  if (loaded) {
    initialize();
  } else {
    console.log(errorInfo);
  }
}

function initialize() {
  initializeCastApi();
  $form.on("submit", function(event) {
    event.preventDefault();
    sendMessage($.trim($urlToCast.val()));
  });
}

function initializeCastApi() {
  chrome.cast.initialize(
    buildCastConfig(),
    function() { console.log("Initialized"); },
    onError
  );
}

function buildCastConfig() {
  var sessionRequest = new chrome.cast.SessionRequest(applicationId);
  return new chrome.cast.ApiConfig(
    sessionRequest,
    sessionListener,
    receiverListener
  );
}

function onError(message) {
  console.log("onError: ", message);
}

function onSuccess(message) {
  console.log("onSuccess: "+message);
}

/**
 * session listener during initialization
 */
function sessionListener(e) {
  console.log('New session ID:' + e.sessionId);
  session = e;
  session.addUpdateListener(sessionUpdateListener);
  session.addMessageListener(namespace, receiverMessage);
}

/**
 * listener for session updates
 */
function sessionUpdateListener(isAlive) {
  var message = isAlive ? 'Session Updated' : 'Session Removed';
  message += ': ' + session.sessionId;
  console.log(message);
  if (!isAlive) {
    session = null;
  }
};

/**
 * utility function to log messages from the receiver
 * @param {string} namespace The namespace of the message
 * @param {string} message A message string
 */
function receiverMessage(namespace, message) {
  $currentlyCasting.text(message);
  console.log("receiverMessage: "+namespace+", "+message);
};

/**
 * receiver listener during initialization
 */
function receiverListener(e) {
  $wrapper[(e == "available" ? "add" : "remove") + "Class"]("receiver-found");
}

/**
 * send a message to the receiver using the custom namespace
 * receiver CastMessageBus message handler will be invoked
 * @param {string} message A message string
 */
function sendMessage(message) {
  if (session != null) {
    session.sendMessage(
      namespace,
      message,
      onSuccess.bind(this, "Message sent: " + message),
      onError
    );
  }
  else {
    chrome.cast.requestSession(function(e) {
      session = e;
      session.sendMessage(
        namespace,
        message,
        onSuccess.bind(this, "Message sent: " + message),
        onError
      );
    }, onError);
  }
}
