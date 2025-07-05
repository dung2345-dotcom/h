document.addEventListener('DOMContentLoaded', function() {
            const searchTerm = localStorage.getItem('searchTerm');
            document.getElementById('searchTermDisplay').textContent = searchTerm;

            // Dữ liệu mẫu với URL
            const sampleData = [
                {
                    title: "RAM",
                    description: "Bộ nhớ RAM máy tính với nhiều dung lượng và tốc độ khác nhau",
                    url: "ram.html"
                },
                {
                    title: "Mainboard",
                    description: "Bo mạch chủ máy tính từ các thương hiệu uy tín",
                    url: "mainboard.html"
                },
                {
                    title: "CPU",
                    description: "Bộ vi xử lý Intel và AMD cho hiệu năng mạnh mẽ",
                    url: "cpu.html"
                },
                {
                    title: "VGA",
                    description: "Card màn hình đồ họa chất lượng cao cho gaming và đồ họa",
                    url: "vga.html"
                },
                {
                    title: "SSD-HDD-M.2 NVME",
                    description: "Các loại ổ cứng lưu trữ tốc độ cao, dung lượng lớn",
                    url: "storage.html"
                },
                {
                    title: "PSU-Nguồn Máy tính",
                    description: "Nguồn máy tính công suất cao, ổn định từ các hãng nổi tiếng",
                    url: "psu.html"
                },
                {
                    title: "Case-Thùng vỏ máy tính",
                    description: "Vỏ case máy tính đa dạng kiểu dáng, kích thước",
                    url: "case.html"
                },
                {
                    title: "Màn hình máy tính PC",
                    description: "Màn hình máy tính chất lượng cao, đa dạng kích thước và tần số",
                    url: "monitor.html"
                }
            ];

            const resultsContainer = document.getElementById('resultsContainer');
            
            const results = sampleData.filter(item => 
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (results.length > 0) {
                results.forEach(result => {
                    const resultElement = document.createElement('div');
                    resultElement.className = 'result-item';
                    resultElement.innerHTML = `
                        <a href="${result.url}">
                            <h3>${result.title}</h3>
                            <p>${result.description}</p>
                        </a>
                    `;
                    resultsContainer.appendChild(resultElement);
                });
            } else {
                resultsContainer.innerHTML = `
                    <div class="no-results">
                        Không tìm thấy kết quả nào cho "${searchTerm}"
                    </div>
                `;
            }
        });
const responses ={
	"lo":"xin chào,bạn cần giúp đỡ gì không?",
	"hello":"xin chào,bạn cần giúp đỡ gì không?",	
"hi":"xin chào,bạn cần giúp đỡ gì không?",
	"không":"cảm ơn bạn đã phản hồi",
	"ko":"cảm ơn bạn đã phản hồi",
"xin chào":"xin chào,bạn cần giúp đỡ gì không?",
"tìm cho tôi gia sư":"bạn cần gia sư môn gì",
"thời gian dạy học bắt đầu từ khi nào":"-Thời gian sáng từ 7h đến 11h<br>-Thời gian sáng từ 13h đến 17h<br>-Thời gian sáng từ 18h đến 22h",
"thời gian dạy học":"-Thời gian sáng từ 7h đến 11h<br>-Thời gian sáng từ 13h đến 17h<br>-Thời gian sáng từ 18h đến 22h",
"default": "Xin lỗi, tôi không hiểu yêu cầu của bạn. Vui lòng liên hệ với đội ngũ hỗ trợ qua email:dungxnguyen6789@gmail.com hoặc số điện thoại: 25062008",
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
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            window.location.href = 'mailto:support@example.com';
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
           appendMessage('bot', "Cảm ơn bạn đã phản hồi!");
        };
const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}// JavaScript Document
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
