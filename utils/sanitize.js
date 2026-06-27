const sanitizeHtml = require("sanitize-html");

const sanitizeText = (text) => {
    text = text.trim() ?? '';
    if (text == '') {
        return '';
    }
    text = sanitizeHtml(text, {
        allowedTags: [],
        allowedAttributes: {}
    });
    return text;
}

module.exports = sanitizeText;