/* global CheckoutWebComponents */
(async () => {
  // Insert your public key here
  const PUBLIC_KEY = "pk_sbox_7ga23zp47ly2qrfhfen5pdpxa4u";

  const response = await fetch("/create-payment-sessions", { method: "POST" }); // Order
  const paymentSession = await response.json();

  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  const checkout = await CheckoutWebComponents({
    publicKey: PUBLIC_KEY,
    environment: "sandbox",
    locale: "en-GB",
    paymentSession,
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("Create Payment with PaymentId: ", paymentResponse.id);
    },
    onChange: (component) => {
      console.log(
        `onChange() -> isValid: "${component.isValid()}" for "${
          component.type
        }"`,
      );
    },
    onError: (component, error) => {
      console.log("onError", error, "Component", component.type);
    },
  });

  const flowComponent = checkout.create("flow");

  flowComponent.mount(document.getElementById("flow-container"));
})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

if (paymentStatus === "succeeded") {
  triggerToast("successToast");
}

if (paymentStatus === "failed") {
  triggerToast("failedToast");
}

if (paymentId) {
  console.log("Create Payment with PaymentId: ", paymentId);
}
