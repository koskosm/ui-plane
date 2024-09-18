export function loadPosts() {
  const context = require.context('../data/json-posts', false, /\.json$/);
  const posts = context.keys().map(key => context(key));
  return posts;
}