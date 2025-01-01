# Checkout Payment Demo

A demonstration project showcasing a payment checkout system integrated with a shopping cart interface. This project uses Checkout.com's Web Components for payment processing and features a responsive design with real-time updates.

## Project Overview

This project demonstrates:
- Integration with Checkout.com's payment system
- Real-time shopping cart functionality with quantity controls
- Dynamic price updates
- Responsive design principles
- Toast notifications for payment status

## Project Structure

project/
├── public/
│ ├── index.html # Main HTML with payment and cart UI
│ ├── style.css # CSS styles for the application
│ ├── app.js # Client-side JavaScript for payment and cart
│ └── logo.png # Company logo
├── server.js # Express server for payment processing
├── .gitignore # Git ignore configuration
└── README.md # Project documentation


## Technical Stack

### Frontend
- HTML5
- CSS3
- JavaScript (ES6+)
- Checkout.com Web Components
- Font Awesome Icons

### Backend
- Node.js
- Express.js

## Prerequisites

Before running this project, ensure you have:
1. Node.js installed
2. A Checkout.com account with API credentials
3. Git for version control

## Installation

1. Clone the repository:
git clone [repository-url]
cd checkout-payment-demo

2. Install dependencies:
npm install

3. Configure your Checkout.com credentials in `app.js`:
const PUBLIC_KEY = "your_public_key_here";

## Running the Project

1. Start the server:
node server.js


2. Open your browser and navigate to:
http://localhost:3000


## Key Features

### Payment Processing
- Secure payment handling through Checkout.com
- Real-time payment status updates
- Toast notifications for success/failure

### Shopping Cart
- Dynamic quantity adjustments
- Real-time price calculations
- Responsive cart interface
- Company logo integration

## Usage

1. The shopping cart displays on the right side with:
   - Product details
   - Quantity controls
   - Real-time price updates

2. The payment form on the left side:
   - Updates total amount based on cart
   - Processes payments securely
   - Shows status notifications

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Checkout.com for their Web Components
- Font Awesome for icons