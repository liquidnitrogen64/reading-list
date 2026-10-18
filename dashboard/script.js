//data models
let books = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        status: 'want-to-read', //'want-to-read', 'currently-reading', 'completed'
        tags: ['Fiction', 'Classic'],
        notes: '',
        reflection: null,
        isFavorite: false
    }
];

//core actions
function moveToCurrentlyReading(bookId) {
    const book = books.find(b => b.id === bookId)
    if (book) {
        book.status = 'currently-reading';
        renderDashboard();
    }
}

const GENRE_QUESTIONS = {
    fiction: [
        {id: "q1", label: "What central decision or conflict shaped the main character's outcome?"},
        {id: "q2", label: "What underlying theme or message does the ending leave you with?"}
    ],
    nonfiction: [
        {id: "q1", label: "What is the single most compelling argument or takeaway from this book?"},
        {id: "q2", label: "How can you apply an insight or framework from this book to your daily life?"}
    ],
    history: [
        {id: "q1", label: "What key lesson or pattern from this era/life remains relevant today?"},
        {id: "q2", label: "What surprised or challenged your perspective about this person or event?"}
    ],
    poetry: [
        {id: "q1", label: "Which line or image resonated with you most deeply, and why?"},
        {id: "q2", label: "What shift in emotion or atmosphere did the collection evoke?"}
    ],
    default: [
        {id: "q1", label: "What is the single most important lesson or takeaway from this book?"},
        {id: "q2", label: "How did reading this book change or expand your perspective?"}
    ]
};

function getQuestionsForTags(tags = []) {
    const primaryTag = tags[0]?.toLowerCase() || '';

    if(['fiction', 'fantasy', 'sci-fi', 'romance', 'mystery', 'thriller', 'classic'].includes(primaryTag)) {
        return GENRE_QUESTIONS.fiction;
    }
    if (['non-fiction', 'philosophy', 'personal growth'].includes(primaryTag)) {
        return GENRE_QUESTIONS.nonfiction;
    }
    if (['biography', 'memoir', 'history'].includes(primaryTag)) {
        return GENRE_QUESTIONS.history;
    }
    if (['poetry'].includes(primaryTag)) {
        return GENRE_QUESTIONS.poetry;
    }
    return GENRE_QUESTIONS.default;
}

function openReflectionModal (bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    document.getElementById('modalBookTitle').innerText = book.title;

    //render genre questions (why does the :p face look like that is the :) better? no it really isnt im never typing a face in here ever again)
    const questions = getQuestionsForTags(book.tags);
    const questionsContainer = document.getElementById('dynamicQuestions');

    questionsContainer.innerHTML = questions.map((q, idx) => `)
        <div class="input-wrapper">
            <label for="${q.id}">${q.label}</label>
            <textarea id="${q.id}" rows="3" required placeholder="Write your thoughts.."></textarea>
        </div>
    `).join('');

    document.getElementById('reflectionModal').style.display = 'flex';

    document.getElementById('reflectionForm').onsubmit = (e) => {
        e.preventDefault();

        book.reflection = {
            question1: document.getElementById('q1').value,
            question2: document.getElementById('q2').value
        };

        book.status = 'completed';
        const dest = document.querySelector('input[name="destination"]:checked').value;
        book.isFavorite = (dest === 'dashboard');

        document.getElementById('reflectionModal').style.display = 'none';
        renderDashboard();
    };

}