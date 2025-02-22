async function sendEmail() {
    let senderEmail = document.getElementById('senderEmail').value;
    let senderPassword = document.getElementById('senderPassword').value;
    let recipientEmail = document.getElementById('recipientEmail').value;
    let description = document.getElementById('description').value;
    let fileLink = document.getElementById('fileLink').value;
    let messageElement = document.getElementById('message');
    
    if (!senderEmail || !senderPassword || !recipientEmail) {
        messageElement.innerText = 'Harap isi semua kolom email dan password!';
        messageElement.style.color = 'red';
        return;
    }
    
    if (!fileLink) {
        messageElement.innerText = 'Masukkan tautan file!';
        messageElement.style.color = 'red';
        return;
    }
    
    let data = { senderEmail, senderPassword, recipientEmail, description, fileLink };
    
    try {
        let response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        let result = await response.json();
        if (response.ok) {
            messageElement.innerText = 'Email berhasil dikirim!';
            messageElement.style.color = 'green';
        } else {
            messageElement.innerText = result.message || 'Gagal mengirim email!';
            messageElement.style.color = 'red';
        }
    } catch (error) {
        messageElement.innerText = 'Terjadi kesalahan! Coba lagi nanti.';
        messageElement.style.color = 'red';
    }
}
