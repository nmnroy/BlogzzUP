const fs = require('fs');

const run = () => {
    let content = fs.readFileSync('src/Dashboard.jsx', 'utf8');

    // For #141B2D -> class="dummy-panel"
    content = content.replace(/(<\w+)([^>]*)style=\{\{([^}]*(?:background|backgroundColor):\s*'#141B2D'[^}]*)\}\}/g, (match, tag, attrString, styleContent) => {
        if (attrString.includes('className')) {
            return tag + attrString.replace(/className=(['"`])(.*?)\1/, 'className=$1$2 dummy-panel$1') + 'style={{' + styleContent + '}}';
        } else {
            return tag + ' className="dummy-panel"' + attrString + 'style={{' + styleContent + '}}';
        }
    });

    // For #0D1526 -> class="dummy-cell"
    content = content.replace(/(<\w+)([^>]*)style=\{\{([^}]*(?:background|backgroundColor):\s*'#0D1526'[^}]*)\}\}/g, (match, tag, attrString, styleContent) => {
        if (attrString.includes('className')) {
            return tag + attrString.replace(/className=(['"`])(.*?)\1/, 'className=$1$2 dummy-cell$1') + 'style={{' + styleContent + '}}';
        } else {
            return tag + ' className="dummy-cell"' + attrString + 'style={{' + styleContent + '}}';
        }
    });

    fs.writeFileSync('src/Dashboard.jsx', content);
    console.log("Successfully replaced inline styles with CSS classes in Dashboard.jsx.");
};

run();
