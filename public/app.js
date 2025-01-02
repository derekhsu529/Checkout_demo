/* global CheckoutWebComponents */

const pricePerItem = 50;
let flowComponent;

// 更新支付按钮金额的函数
function updatePayButtonAmount(amount) {
  setTimeout(() => {
    const payButton = document.querySelector('.cko-pay-button');
    if (payButton) {
      payButton.textContent = `Pay €${amount.toFixed(2)}`;
    }
  }, 100);
}

(async () => {
  const PUBLIC_KEY = "pk_sbox_7ga23zp47ly2qrfhfen5pdpxa4u";
  
  // 固定金额为单个商品价格
  const subtotal = pricePerItem;
  const response = await fetch("/create-payment-sessions", {//第一步：前端发起对后端的请求
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ amount: subtotal }) 
  });

  const paymentSession = await response.json();
  console.log(paymentSession);

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
      // 初始化时更新支付按钮金额
      updatePayButtonAmount(pricePerItem);
      
      // 显示购物车
      const cartContainer = document.querySelector('.cart-container');
      cartContainer.classList.remove('hidden');
      cartContainer.classList.add('visible');
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("Create Payment with PaymentId: ", paymentResponse.id);
    },
    onChange: (component) => {
      console.log(
        `onChange() -> isValid: "${component.isValid()}" for "${component.type}"`,
      );
    },
    onError: (component, error) => {
      console.log("onError", error, "Component", component.type);
    },
  });

  flowComponent = checkout.create("flow");//第三步：前端拿到数据后，建 session 的 flow，flow 的参数已经在 CheckoutWebComponents 中设置好了
  flowComponent.mount(document.getElementById("flow-container"));//第四步：渲染实例到 Container 上
})();

// 移除 initializeCart 函数和相关的事件监听器

// Toast 通知相关代码保持不变
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
