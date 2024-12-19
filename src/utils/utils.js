export const getTruncatedContent = (content) => {
    const truncateIndex = content.indexOf("[+");
    if (truncateIndex !== -1) {
        return content.substring(0, truncateIndex); // Return content before '[+'
    }
    return content; // Return the full content if no truncation pattern is found
};