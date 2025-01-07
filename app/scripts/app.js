let client;

init();

async function init() {
    client = await app.initialized();
    client.events.on('app.activated', renderText);

    const getSuggestionButton = document.getElementById('getSuggestionButton');
    getSuggestionButton.addEventListener('click', getSuggestion);
}

async function renderText() {
    const contactData = await client.data.get('contact');
    const {
        contact: { name }
    } = contactData;
}

async function getSuggestion() {
    try {
        const response = await fetch('https://private-internal.internal.dev.tabist.co.jp/v1/properties/B13HUSA/faqs');
        const data = await response.json();

        const textElement = document.getElementById('apptext');
        textElement.innerHTML = `
            <button id="copyButton">Copy</button>
            <pre><code>${JSON.stringify(data, null, 2)}</code></pre>
        `;

        const copyButton = document.getElementById('copyButton');
        copyButton.addEventListener('click', copyToClipboard);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//async function getSuggestion() {
//    try {
//        const response = await fetch('https://private-internal.internal.dev.tabist.co.jp/v1/properties/B13HUSA/faqs');
//        const data = await response.json();
//        console.log('----- API Response:', data);
//        console.log('----- API Response:', data.message);
//        const textElement = document.getElementById('apptext');
//        textElement.innerHTML = `<pre><code>${JSON.stringify(data, null, 2)}</code></pre>`;
//
//        const copyButton = document.getElementById('copyButton');
//        copyButton.style.display = 'inline-block';
//    } catch (error) {
//        console.error('Error fetching data:', error);
//    }
//}

function copyToClipboard() {
    const textElement = document.getElementById('apptext');
    const textToCopy = textElement.innerText;

    alert("!!..Text Copied..!!")
//    navigator.clipboard.writeText(textToCopy).then(() => {
//        console.log('Copied to clipboard');
//    }).catch(err => {
//        console.error('Error copying to clipboard:', err);
//    });
}
