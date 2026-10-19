let completedBooks = [
    {
        id: '1',
        title: 'Meditations',
        author: 'Marcus Aurelius',
        tags: ['Philosophy', 'Classic'],
        isFavorite: true,
        reflection: {
            question1: "What is the single most compelling argument or takeaway from this book?",
            answer1: "You have power over your mind - not outside events. Realize this, and you will find strength.",
            question2: "How can you apply an insight or framework from this book to your daily life?",
            answer2: "Pause before reacting to external stressors and assess what is within my immediate control."
        }
    }
];

let activeTag = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    initLibraryFilters();
    renderLibrary();
});

function initLibraryFilters() {
    const searchInput = document.getElementById('librarySearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderLibrary();
        });
    }

    const tagContainer = document.getElementById('libraryTagFilters');
    if (tagContainer) {
        tagContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('tag-chip')) {
                tagContainer.querySelectorAll('.tag-chip').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                activeTag = e.target.dataset.tag;
                renderLibrary();
            }
        });
    }
}

function renderLibrary() {
    const grid = document.getElementById('libraryGrid');
    if (!grid) return;

    const filtered = completedBooks.filter(book => {
        const matchesTag = (activeTag === 'all') || book.tags.includes(activeTag);
        const matchesSearch = book.title.toLowerCase().includes(searchQuery) ||
                              book.author.toLowerCase().includes(searchQuery) ||
                              (book.reflection?.answer1?.toLowerCase().includes(searchQuery)) ||
                              (book.reflection?.answer2?.toLowerCase().includes(searchQuery));
        return matchesTag && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
                <p class="empty-state">No reflections found matching your criteria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(book => `
        <article class="insight-card">
            <div class="insight-card-header">
                <div>
                    <h3>${escapeHtml(book.title)}</h3>
                    <div class="insight-author">by ${escapeHtml(book.author)}</div>
                </div>
                ${book.isFavorite ? '<i class="fas fa-bookmark favorite-badge" title="Favorited on Dashboard"></i>' : ''}
            </div>

            <div class="insight-tags">
                ${book.tags.map(tag => `<span class="insight-tag">${escapeHtml(tag)}</span>`).join('')}
            </div>

            ${book.reflection ? `
                <div class="reflection-block">
                    <div class="reflection-qa">
                        <label>${escapeHtml(book.reflection.question1)}</label>
                        <p>"${escapeHtml(book.reflection.answer1)}"</p>
                    </div>
                    <div class="reflection-qa">
                        <label>${escapeHtml(book.reflection.question2)}</label>
                        <p>"${escapeHtml(book.reflection.answer2)}"</p>
                    </div>
                </div>
            ` : ''}
        </article>
    `).join('');
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, match => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        return escapeMap[match];
    });
}