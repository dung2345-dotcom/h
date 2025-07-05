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
const loginForm = document.getElementById('loginForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn gửi form mặc định

    const username = loginInput.value;
    const password = passwordInput.value;

    // **Quan trọng:** Đây chỉ là ví dụ ở phía trình duyệt.
    // Trong ứng dụng thực tế, bạn CẦN gửi 'username' và 'password'
    // lên máy chủ để xác thực an toàn với cơ sở dữ liệu.

    if (username === 'admin' && password === '12345') {
        alert('Đăng nhập thành công!');
        // Chuyển hướng đến trang chủ (thay 'trangchu.html' bằng URL thực tế của bạn)
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 500); // Chuyển hướng sau 0.5 giây
    } else if (username === '' || password === '') {
        alert('Vui lòng nhập tài khoản và mật khẩu.');
    } else {
        alert('Sai tài khoản hoặc mật khẩu!');
    }

    // Bạn có thể thêm logic để làm sạch các trường nhập liệu sau khi thử đăng nhập
    // loginInput.value = '';
    // passwordInput.value = '';
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