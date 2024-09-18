import { loadPosts } from '../utils/jsonLoader';

export const posts = loadPosts();

if (!posts || posts.length === 0) {
  console.error('No posts loaded or posts array is empty');
}
