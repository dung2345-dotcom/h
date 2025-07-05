document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  let timeoutId;

  if (dropdown && dropdownContent) {
    dropdown.addEventListener('mouseenter', function() {
      clearTimeout(timeoutId);
      dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', function() {
      timeoutId = setTimeout(function() {
        dropdownContent.style.display = 'none';
      }, 150); // Thời gian chờ (milliseconds) trước khi ẩn
    });

    dropdownContent.addEventListener('mouseenter', function() {
      clearTimeout(timeoutId); // Hủy bỏ việc ẩn nếu chuột vào menu
    });

    dropdownContent.addEventListener('mouseleave', function() {
      dropdownContent.style.display = 'none';
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const messageDiv = document.getElementById('message'); // Chúng ta có thể không cần div này nữa

    form.addEventListener('submit', function(event) {
      let hasErrors = false;
      messageDiv.innerHTML = ''; // Xóa thông báo cũ (dù có thể không còn cần)

      const usernameInput = document.getElementById('username');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const confirmPasswordInput = document.getElementById('confirm_password');

      if (usernameInput.value.trim() === '') {
        displayError('Vui lòng nhập tên đăng nhập.');
        hasErrors = true;
      }

      if (emailInput.value.trim() === '') {
        displayError('Vui lòng nhập địa chỉ email.');
        hasErrors = true;
      } else if (!isValidEmail(emailInput.value.trim())) {
        displayError('Địa chỉ email không hợp lệ.');
        hasErrors = true;
      }

      if (passwordInput.value.trim() === '') {
        displayError('Vui lòng nhập mật khẩu.');
        hasErrors = true;
      }

      if (confirmPasswordInput.value.trim() === '') {
        displayError('Vui lòng nhập lại mật khẩu.');
        hasErrors = true;
      } else if (passwordInput.value.trim() !== confirmPasswordInput.value.trim()) {
        displayError('Mật khẩu nhập lại không khớp.');
        hasErrors = true;
      }

      if (hasErrors) {
        event.preventDefault(); // Ngăn chặn việc gửi form nếu có lỗi
      } else {
        // Nếu không có lỗi ở phía trình duyệt, hiển thị hộp thoại thành công và chuyển hướng
        alert('Đăng ký thành công!');
        window.location.href = 'index.html'; // Chuyển hướng về trang chủ
        event.preventDefault(); // Ngăn chặn gửi form thực sự (nếu bạn chỉ muốn hiệu ứng này)
      }
    });

    function displayError(errorMessage) {
      const errorParagraph = document.createElement('p');
      errorParagraph.style.color = 'red';
      errorParagraph.textContent = errorMessage;
      messageDiv.appendChild(errorParagraph);
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  });
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