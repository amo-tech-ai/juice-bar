console.log('🥤 Juice Bar - Global JavaScript Loaded');

// Cart functionality
class JuiceBarCart {
  constructor() {
    this.init();
  }

  init() {
    console.log('Initializing Juice Bar Cart...');
    this.bindEvents();
  }

  bindEvents() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', this.addToCart.bind(this));
    });
  }

  async addToCart(event) {
    const button = event.target;
    const productId = button.dataset.productId;
    
    console.log('Adding to cart:', productId);
    
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      });
      
      if (response.ok) {
        console.log('Product added to cart successfully!');
        this.updateCartCount();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new JuiceBarCart();
  console.log('🎉 Juice Bar theme ready!');
});
