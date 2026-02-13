/**
 * YouTube Channels Configuration
 * Contains channel IDs and information for both whatwhatboy channels
 */

// YouTube Channel Configuration
const YOUTUBE_CHANNELS = [
    {
        id: 'UCusYWir4F6r5AY6A9Ddv7jg',
        handle: '@whatwhatboy101',
        name: 'whatwhatboy101',
        url: 'https://www.youtube.com/@whatwhatboy101'
    },
    {
        // Note: You need to get the actual channel ID for @whatwhatboy98
        // Visit https://www.youtube.com/@whatwhatboy98, view page source,
        // and search for "channelId" to find the actual channel ID
        id: 'UC-PLACEHOLDER-98', // Replace with actual channel ID
        handle: '@whatwhatboy98',
        name: 'whatwhatboy98',
        url: 'https://www.youtube.com/@whatwhatboy98'
    }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = YOUTUBE_CHANNELS;
}
