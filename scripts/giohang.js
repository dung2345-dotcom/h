document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartItems = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    // Cập nhật số lượng hiển thị trên icon giỏ hàng
    function updateCartCount() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    // Cập nhật tổng tiền
    function updateCartTotal() {
        const total = cart.reduce((sum, item) => {
            const price = parseInt(item.price.replace(/\D/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        cartTotalAmount.innerHTML = `<span style="color: #f44336; font-weight: bold;">${total.toLocaleString('vi-VN')} đ</span>`;
    }

    // Hiển thị sản phẩm trong giỏ hàng
    function renderCartItems() {
        if (cart.length === 0) {
            cartItems.innerHTML = '<div style="text-align: center; padding: 20px;">Giỏ hàng trống</div>';
            return;
        }

        cartItems.innerHTML = `
            ${cart.map((item, index) => `
                <div class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #eee;">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px;">
                    <div class="cart-item-details" style="flex-grow: 1;">
                        <div class="cart-item-name" style="margin-bottom: 8px; font-size: 0.9em;">${item.name}</div>
                        <div style="color: #f44336; font-size: 1.1em; font-weight: bold; margin-bottom: 8px;">${item.price}</div>
                        <div class="cart-item-quantity" style="display: flex; align-items: center;">
                            <button onclick="updateQuantity(${index}, ${item.quantity - 1})" style="padding: 4px 10px; background-color: #f5f5f5; border: 1px solid #ddd; cursor: pointer; border-radius: 3px;">-</button>
                            <span style="margin: 0 15px; font-weight: bold;">${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, ${item.quantity + 1})" style="padding: 4px 10px; background-color: #f5f5f5; border: 1px solid #ddd; cursor: pointer; border-radius: 3px;">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${index})" style="color: #f44336; font-size: 1.5em; border: none; background: none; cursor: pointer; padding: 5px; margin-left: 10px;">×</button>
                </div>
            `).join('')}
            <div style="text-align: right; padding: 10px; border-top: 1px solid #eee; margin-top: 10px;">
                <button onclick="clearCart()" style="background-color: #f44336; color: white; padding: 8px 15px; border: none; border-radius: 3px; cursor: pointer;">Xóa tất cả</button>
            </div>
        `;
    }

    // Thêm hàm xóa toàn bộ giỏ hàng
    window.clearCart = function() {
        if (confirm('Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?')) {
            cart = [];
            localStorage.removeItem('cart'); // Xóa dữ liệu giỏ hàng khỏi localStorage
            updateCartCount();
            updateCartTotal();
            renderCartItems();
        }
    };

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotal();
        renderCartItems();
    }

    // Cập nhật số lượng sản phẩm
    window.updateQuantity = function(index, newQuantity) {
        if (newQuantity <= 0) {
            removeFromCart(index);
            return;
        }
        cart[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotal();
        renderCartItems();
    };

    // Xóa sản phẩm khỏi giỏ hàng
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartTotal();
        renderCartItems();
    };

    // Xử lý nút "Thêm vào giỏ hàng"
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent === 'THÊM VÀO GIỎ HÀNG') {
            button.addEventListener('click', function() {
                const productContainer = this.closest('div').parentElement;
                const productName = productContainer.querySelector('p').textContent;
                const productPrice = productContainer.querySelector('span:last-child').textContent;
                const productImage = productContainer.closest('div[style*="border"]').querySelector('div[style*="position: relative"] img').src;

                addToCart({
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
                
                // Hiển thị thông báo
                alert('Đã thêm sản phẩm vào giỏ hàng!');
            });
        }
    });

    // Xử lý hiển thị/ẩn giỏ hàng
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Đóng giỏ hàng khi click ra ngoài
    document.addEventListener('click', function(e) {
        if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.style.display = 'none';
        }
    });

    // Khởi tạo giỏ hàng khi trang load
    updateCartCount();
    updateCartTotal();
    renderCartItems();
});