const fs = require('fs');

const run = () => {
    let content = fs.readFileSync('src/App.jsx', 'utf8');

    // Add dummy-panel to elements with hardcoded dark backgrounds
    content = content.replace(/(<\w+)([^>]*)style=\{\{([^}]*(?:background|backgroundColor):\s*'#(?:141B2D|111827|0D1526|1E293B|0F172A)'[^}]*)\}\}/gi, (match, tag, attrString, styleContent) => {
        if (attrString.includes('className')) {
            if(/dummy-panel/.test(attrString)) return match;
            return tag + attrString.replace(/className=(['"`])(.*?)\1/, 'className=$1$2 dummy-panel$1') + 'style={{' + styleContent + '}}';
        } else {
            return tag + ' className="dummy-panel"' + attrString + 'style={{' + styleContent + '}}';
        }
    });

    fs.writeFileSync('src/App.jsx', content);
    console.log("Successfully replaced inline styles with CSS classes in App.jsx.");
};

run();
