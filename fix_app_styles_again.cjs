const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const regex = /(<\w+)([^>]*)style=\{\{([^}]*(?:background|backgroundColor):\s*'#(?:080E1C|141B2D|0D1526)'[^}]*)\}\}/gi;

content = content.replace(regex, (match, tag, attrString, styleContent) => {
    if (attrString.includes('className')) {
        if(/dummy-panel/.test(attrString)) return match;
        return tag + attrString.replace(/className=(['"`])(.*?)\1/, 'className=$1$2 dummy-panel$1') + 'style={{' + styleContent + '}}';
    } else {
        return tag + ' className="dummy-panel"' + attrString + 'style={{' + styleContent + '}}';
    }
});

fs.writeFileSync('src/App.jsx', content);
console.log("Replaced 080E1C successfully.");
