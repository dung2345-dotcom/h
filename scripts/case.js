// Xử lý dropdown menu sản phẩm
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  let timeoutId;

  if (dropdown && dropdownContent) {
    // Xử lý sự kiện hover cho dropdown
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(timeoutId);
      dropdownContent.style.display = 'block';
      dropdownContent.style.zIndex = '9999'; // Thêm z-index cao hơn
    });

    dropdown.addEventListener('mouseleave', function() {
      timeoutId = setTimeout(function() {
        if (!dropdownContent.matches(':hover')) {
          dropdownContent.style.display = 'none';
        }
      }, 100); // Giảm thời gian delay
    });

    dropdownContent.addEventListener('mouseenter', function() {
      clearTimeout(timeoutId);
      dropdownContent.style.display = 'block';
    });

    dropdownContent.addEventListener('mouseleave', function() {
      dropdownContent.style.display = 'none';
    });

    // Thêm xử lý click cho thiết bị di động
    dropdown.addEventListener('click', function(e) {
      e.preventDefault();
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });
  }
});

// Xử lý slideshow
document.addEventListener('DOMContentLoaded', function() {
    let index = 0;
    const images = document.querySelectorAll('#slideshow img');
    const slideInterval = 5000;
    let autoSlideTimer;
    
    // Hiển thị ảnh đầu tiên ngay khi trang tải xong
    if (images.length > 0) {
        images[0].classList.add('active');
    }
    
    function showImage(n) {
        images.forEach((img, i) => {
            img.classList.remove('active');
            if (i === n) {
                img.classList.add('active');
                img.style.opacity = 0;
                setTimeout(() => {
                    img.style.opacity = 1;
                }, 50);
            }
        });
    }

    function nextImage() {
        index = (index + 1) % images.length;
        showImage(index);
        resetAutoSlide();
    }

    function prevImage() {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
        resetAutoSlide();
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(nextImage, slideInterval);
    }

    // Khởi tạo auto slide
    autoSlideTimer = setInterval(nextImage, slideInterval);

    // Thêm các nút điều hướng
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    if (prevButton) prevButton.addEventListener('click', prevImage);
    if (nextButton) nextButton.addEventListener('click', nextImage);
});

// Xử lý chatbot
const responses = {
    "lo": "xin chào, bạn cần giúp đỡ gì không?",
    "hello": "xin chào, bạn cần giúp đỡ gì không?",
    "hi": "xin chào, bạn cần giúp đỡ gì không?",
    "không": "cảm ơn bạn đã phản hồi",
    "ko": "cảm ơn bạn đã phản hồi",
    "xin chào": "xin chào, bạn cần giúp đỡ gì không?",
    "tìm cho tôi gia sư": "bạn cần gia sư môn gì",
    "thời gian dạy học bắt đầu từ khi nào": "-Thời gian sáng từ 7h đến 11h<br>-Thời gian chiều từ 13h đến 17h<br>-Thời gian tối từ 18h đến 22h",
    "thời gian dạy học": "-Thời gian sáng từ 7h đến 11h<br>-Thời gian chiều từ 13h đến 17h<br>-Thời gian tối từ 18h đến 22h",
    "default": "Xin lỗi, tôi không hiểu yêu cầu của bạn. Vui lòng liên hệ với đội ngũ hỗ trợ qua email: dungxnguyen6789@gmail.com hoặc số điện thoại: 25062008"
};

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();




    }
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    if (sender === 'bot' && message === responses["default"]) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            window.location.href = 'mailto:dungxnguyen6789@gmail.com';
        };
        
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', "Cảm ơn bạn đã phản hồi!");
        };
        
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}


// Xử lý tìm kiếm
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.tk input[type="text"]');
    const searchButton = document.querySelector('.tk button');

    if (searchInput && searchButton) {
        // Xử lý sự kiện khi nhấn nút tìm kiếm
        searchButton.addEventListener('click', function() {
            performSearch();
        });

        // Xử lý sự kiện khi nhấn Enter trong ô tìm kiếm
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm !== '') {
            // Lưu từ khóa tìm kiếm vào localStorage để sử dụng ở trang kết quả
            localStorage.setItem('searchTerm', searchTerm);
            // Chuyển hướng đến trang kết quả tìm kiếm
            window.location.href = 'ketquatimkiem.html';
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cart-total-amount');
    let cart = [];
    let isCartOpen = false;

    // Hiển thị/ẩn giỏ hàng
    cartButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isCartOpen = !isCartOpen;
        cartDropdown.style.display = isCartOpen ? 'block' : 'none';
    });

    // Ngăn chặn sự kiện click trong dropdown lan ra ngoài
    cartDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Đóng giỏ hàng chỉ khi click bên ngoài
    document.addEventListener('click', function(e) {
        if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
            isCartOpen = false;
            cartDropdown.style.display = 'none';
        }
    });

    // Xử lý thêm vào giỏ hàng
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('THÊM VÀO GIỎ HÀNG')) {
            button.addEventListener('click', function() {
                const productContainer = button.closest('div[style*="border"]');
                const productName = productContainer.querySelector('p').textContent;
                const productPrice = productContainer.querySelector('span[style*="color: #f44336"]').textContent;
                const productImage = productContainer.querySelector('img').src;

                addToCart({
                    name: productName,
                    price: productPrice,
                    image: productImage
                });
            });
        }
    });

    function addToCart(product) {
        cart.push(product);
        updateCartUI();
    }

    function updateCartUI() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div>${item.name}</div>
                    <div>${item.price}</div>
                </div>
                <button onclick="removeFromCart(${index})">×</button>
            `;
            cartItems.appendChild(itemElement);

            total += parseInt(item.price.replace(/[^\d]/g, ''));
        });

        cartTotal.textContent = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(total);
    }

    window.removeFromCart = function(index) {
		cart.splice(index, 1);
        updateCartUI();
    };
});
    function showQRCode() {
        const modal = document.getElementById('qrModal');
        const paymentAmount = document.getElementById('paymentAmount');
        modal.style.display = 'flex';

        // Thêm đồng hồ đếm ngược
        let timeLeft = 5 * 60; // 5 phút = 300 giây
        const countdownElement = document.createElement('div');
        countdownElement.id = 'countdown';
        paymentAmount.appendChild(countdownElement);

        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `Thời gian còn lại: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                modal.style.display = 'none';
                alert('Hết thời gian thanh toán!');
            }
            timeLeft--;
        }, 1000);

        // Xóa đồng hồ đếm ngược khi đóng modal
        const closeModal = () => {
            clearInterval(countdown);
            if (countdownElement.parentNode) {
                countdownElement.parentNode.removeChild(countdownElement);
            }
            modal.style.display = 'none';
        };

        document.querySelector('.close-qr').onclick = closeModal;
        window.onclick = (event) => {
            if (event.target === modal) {
                closeModal();
            }
        };
    }

// Đóng modal khi click vào nút close
document.querySelector('.close-qr').addEventListener('click', function() {
    document.getElementById('qrModal').style.display = 'none';
});

// Đóng modal khi click bên ngoài
window.addEventListener('click', function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});