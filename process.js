const Reddit = require('snoowrap');
const dayjs = require('dayjs');
dayjs.extend(require('dayjs/plugin/utc'));

/**
 * @param {Reddit} reddit
 */
module.exports = async (reddit) => {
    console.log('Retrieving wiki content...');
    const wikiPage = await reddit.getSubreddit(process.env.SUBREDDIT).getWikiPage(process.env.WIKI_PAGE).content_md;
    const threadContent = wikiPage;

    console.log('Retrieving current thread content...');
    const currentSubmission = await reddit.getSubmission(process.env.THREAD_ID).fetch();

    if (currentSubmission.selftext.trim() !== threadContent.trim()) {
        console.log('Updating thread content to:');
        console.log(threadContent);

        await reddit.getSubmission(process.env.THREAD_ID).edit(threadContent);

        console.log('Updated. Old content:');
        console.log(currentSubmission.selftext);
    } else {
        console.log('Thread is up to date.');
    }
};