// Comments System - Saves messages in your browser
let comments = [];

function loadComments() {
    const saved = localStorage.getItem('charlesPortfolioComments');
    if (saved) {
        comments = JSON.parse(saved);
        displayComments();
    }
}

function displayComments() {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="color:#999; text-align:center;">✨ No comments yet. Be the first to congratulate Charles! ✨</p>';
        return;
    }
    
    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-name">⭐ ${escapeHtml(comment.name)}</div>
            <div class="comment-text">${escapeHtml(comment.text)}</div>
            <div class="comment-date">📅 ${comment.date}</div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function addComment(name, text) {
    if (!name.trim() || !text.trim()) {
        alert('Please enter both your name and a comment');
        return false;
    }
    
    const comment = {
        name: name.trim(),
        text: text.trim(),
        date: new Date().toLocaleString()
    };
    
    comments.unshift(comment);
    localStorage.setItem('charlesPortfolioComments', JSON.stringify(comments));
    displayComments();
    return true;
}

function setupCommentButton() {
    const submitBtn = document.getElementById('submitComment');
    if (!submitBtn) return;
    
    submitBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('commentName');
        const textInput = document.getElementById('commentText');
        
        if (addComment(nameInput.value, textInput.value)) {
            nameInput.value = '';
            textInput.value = '';
            alert('✅ Your comment has been posted!');
        }
    });
}

function setupCVDownload() {
    const cvBtn = document.getElementById('downloadCV');
    if (!cvBtn) return;
    
    cvBtn.addEventListener('click', () => {
        const pdfPath = 'my-cv.pdf';
        
        fetch(pdfPath, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    const link = document.createElement('a');
                    link.href = pdfPath;
                    link.download = 'Charles_Nzula_Kalungu_CV.pdf';
                    link.click();
                } else {
                    alert('📄 To add your real CV PDF:\n1. Save your CV as "my-cv.pdf"\n2. Place it in the same folder as index.html\n\nFor now, a text version will download.');
                    downloadTextCV();
                }
            })
            .catch(() => downloadTextCV());
    });
}

function downloadTextCV() {
    const cvContent = `CHARLES NZULA KALUNGU

PERSONAL PROFILE
A recent graduate of Masinde Muliro University of Science and Technology with a Bachelor of Science degree in Mathematics and Information Technology (Second Class Honours, Upper Division). Currently volunteering at MMUST TVET College. Possesses strong skills in data entry, records management and Microsoft Office applications.

WORK EXPERIENCE
Volunteer | MMUST TVET College (August 2025 - Present)
- Administrative and clerical duties
- Document management and record keeping
- Daily office operations support

Administrative Attachment Trainee | MMUST TVET College (May 2025 - August 2025)
- Managed correspondence and front-desk services
- Microsoft Excel for student records
- Prepared reports using Word and PowerPoint

EDUCATION
BSc Mathematics & Information Technology - Second Class Honours (Upper Division)
Masinde Muliro University of Science and Technology | 2019-2023

SKILLS
Data Entry, Records Management, Microsoft Office (Excel, Word, PowerPoint), Front Desk Services, Correspondence Handling, Customer Service

REFERENCES
Prof. Stephen Odebero - sodebero@mmust.ac.ke - 0722 995 895
Dr. Sabella Kiprono - Skiprono@mmust.ac.ke - +254 726 808 258
Ms. Mable Wambani - nwambani@mmust.ac.ke - +254 711 516 679`;

    const blob = new Blob([cvContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Charles_Nzula_Kalungu_CV.txt';
    link.click();
    URL.revokeObjectURL(link.href);
}

// Click on photos to enlarge them
function setupPhotoClick() {
    const photos = document.querySelectorAll('.profile-img, .achievement-card img');
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.backgroundColor = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modal.style.zIndex = '9999';
            modal.style.cursor = 'pointer';
            
            const img = document.createElement('img');
            img.src = photo.src;
            img.style.maxWidth = '90%';
            img.style.maxHeight = '90%';
            img.style.borderRadius = '10px';
            
            modal.appendChild(img);
            modal.onclick = () => modal.remove();
            document.body.appendChild(modal);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadComments();
    setupCommentButton();
    setupCVDownload();
    setupPhotoClick();
});