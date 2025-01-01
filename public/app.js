/* global CheckoutWebComponents */

// 将数量和价格相关的变量和函数移到全局作用域
let quantity = 1;
const pricePerItem = 50;
let flowComponent;

// 更新支付按钮金额的函数
function updatePayButtonAmount(amount) {
  // 使用 setTimeout 确保按钮已经渲染
  setTimeout(() => {
    const payButton = document.querySelector('.cko-pay-button');
    if (payButton) {
      payButton.textContent = `Pay $${amount.toFixed(2)}`;
    }
  }, 100);
}

// 初始化购物车功能
function initializeCart() {
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  const quantityDisplay = document.querySelector('.quantity');
  const subtotalPrice = document.querySelector('.subtotal span:last-child');

  quantityBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // 防止按钮提交表单
      if (this.textContent === '+' && quantity < 10) {
        quantity++;
      } else if (this.textContent === '-' && quantity > 1) {
        quantity--;
      }
      quantityDisplay.textContent = quantity;
      const totalAmount = quantity * pricePerItem;
      subtotalPrice.textContent = `$${totalAmount.toFixed(2)}`;
      
      // 更新支付按钮金额
      updatePayButtonAmount(totalAmount);
    });
  });
}

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
      // 初始化时更新支付按钮金额
      updatePayButtonAmount(quantity * pricePerItem);
      
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

  flowComponent = checkout.create("flow");
  flowComponent.mount(document.getElementById("flow-container"));
})();

// 在 DOM 加载完成后初始化购物车功能
document.addEventListener('DOMContentLoaded', function() {
  initializeCart();
});

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
