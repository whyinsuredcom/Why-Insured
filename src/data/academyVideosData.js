/**
 * WHYINSURED – Insurance Academy Video Directory (Compatibility Layer)
 * Re-exports from comprehensive academyData.js with backward compatibility
 */
export * from './academyData.js';
import { ACADEMY_VIDEOS, ACADEMY_CATEGORIES } from './academyData.js';
export { ACADEMY_VIDEOS, ACADEMY_CATEGORIES };
export default ACADEMY_VIDEOS;
