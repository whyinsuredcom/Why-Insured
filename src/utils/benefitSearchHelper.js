import { formatPolicyBenefitHeading } from './policyBenefitHeadingHelper.js';

/**
 * Searches and prioritizes matching benefits to the TOP of each section,
 * while keeping all 4 sections and all items available.
 *
 * Searches ONLY within the current plan's benefits:
 * - Benefit names / titles
 * - Coverage / value
 * - Benefit details / summary / subtitle / description
 * - Conditions / limits / points / tierData
 * - Optional rider names / optional rider details
 */

/**
 * Returns a flat sorted list of matched benefit items for the search dropdown.
 * Each result has: { id, title, subtitle, sectionTitle, score }
 */
export function getBenefitSearchResults(featuresSections = [], rawQuery = '') {
  if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
    return [];
  }

  const query = rawQuery.trim().toLowerCase();
  const queryTokens = query.split(/\s+/).filter(Boolean);
  const results = [];

  const calculateScore = (item) => {
    if (!item) return 0;
    let score = 0;
    const title = (item.title || '').toLowerCase();
    const badge = (item.badge || '').toLowerCase();
    const subtitle = (item.subtitle || '').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    const coverage = (item.coverage || '').toLowerCase();
    const pointsText = Array.isArray(item.points) ? item.points.join(' ').toLowerCase() : '';
    const detailsText = typeof item.details === 'object' && item.details !== null
      ? Object.values(item.details).join(' ').toLowerCase()
      : (typeof item.details === 'string' ? item.details.toLowerCase() : '');
    const limitsText = Array.isArray(item.limits) ? item.limits.join(' ').toLowerCase() : '';
    const tierText = item.tierData && Array.isArray(item.tierData.tiers)
      ? item.tierData.tiers.map(t => `${t.tier || ''} ${t.value || ''}`).join(' ').toLowerCase()
      : '';
    const tablesText = (item.tables ? item.tables.flatMap(t => [...(t.columns || []), ...(t.rows ? t.rows.flat() : []), ...(t.details || [])]).join(' ') : '') +
      (item.tableData ? [...(item.tableData.columns || []), ...(item.tableData.rows ? item.tableData.rows.flat() : []), item.tableNote || ''].join(' ') : '');
    const stepsText = Array.isArray(item.steps) ? item.steps.join(' ').toLowerCase() : '';
    const allText = `${title} ${badge} ${subtitle} ${summary} ${description} ${coverage} ${pointsText} ${detailsText} ${limitsText} ${tierText} ${tablesText.toLowerCase()} ${stepsText}`;

    const is2xQuery = /^(2x|2\s*x)$/i.test(query);
    if (is2xQuery) {
      const has2x = /\b2\s*x\b/i.test(allText) || /\b2x\b/i.test(allText) || title.includes('2x') || title.includes('2X');
      if (has2x) {
        return (title.includes('2x') || title.includes('2X')) ? 1000 : 600;
      }
      return 0; // Strictly do not match unrelated "2"
    }

    if (title === query) score += 1000;
    else if (title.startsWith(query)) score += 800;
    else if (title.includes(query)) score += 600;
    else if (badge.includes(query) || coverage.includes(query)) score += 500;
    else if (subtitle.includes(query) || summary.includes(query) || description.includes(query)) score += 400;
    else if (allText.includes(query)) score += 300;
    else if (queryTokens.length > 1 && queryTokens.every(token => {
      if (token.length <= 1) return false;
      const esc = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${esc}\\b`, 'i').test(allText) || allText.includes(token);
    })) score += 250;
    return score;
  };

  (featuresSections || []).forEach((sec) => {
    const formattedSecTitle = formatPolicyBenefitHeading(sec.title || '');
    (sec.items || []).forEach((item) => {
      const score = calculateScore(item);
      if (score > 0) {
        results.push({
          id: item.id,
          title: item.title || '',
          subtitle: item.subtitle || '',
          sectionTitle: formattedSecTitle,
          score
        });
      }
    });
  });

  return results.sort((a, b) => b.score - a.score);
}

export function getFilteredAndPrioritizedFeaturesSections(featuresSections = [], rawQuery = '') {
  if (!rawQuery || typeof rawQuery !== 'string' || !rawQuery.trim()) {
    const formattedSections = (featuresSections || []).map((sec) => ({
      ...sec,
      title: formatPolicyBenefitHeading(sec.title || '')
    }));
    return {
      sections: formattedSections,
      totalMatches: 0,
      hasActiveSearch: false,
      matchedItemIds: new Set()
    };
  }

  const query = rawQuery.trim().toLowerCase();
  const queryTokens = query.split(/\s+/).filter(Boolean);
  const matchedItemIds = new Set();
  let totalMatches = 0;

  const calculateItemScore = (item) => {
    if (!item) return 0;

    let score = 0;
    const title = (item.title || '').toLowerCase();
    const badge = (item.badge || '').toLowerCase();
    const subtitle = (item.subtitle || '').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    const description = (item.description || '').toLowerCase();
    const coverage = (item.coverage || '').toLowerCase();
    
    // Points, conditions, details arrays
    const pointsText = Array.isArray(item.points) ? item.points.join(' ').toLowerCase() : '';
    const detailsText = typeof item.details === 'object' && item.details !== null
      ? Object.values(item.details).join(' ').toLowerCase()
      : (typeof item.details === 'string' ? item.details.toLowerCase() : '');
    const limitsText = Array.isArray(item.limits) ? item.limits.join(' ').toLowerCase() : '';
    const tierText = item.tierData && Array.isArray(item.tierData.tiers)
      ? item.tierData.tiers.map(t => `${t.tier || ''} ${t.value || ''}`).join(' ').toLowerCase()
      : '';
    const tablesText = (item.tables ? item.tables.flatMap(t => [...(t.columns || []), ...(t.rows ? t.rows.flat() : []), ...(t.details || [])]).join(' ') : '') +
      (item.tableData ? [...(item.tableData.columns || []), ...(item.tableData.rows ? item.tableData.rows.flat() : []), item.tableNote || ''].join(' ') : '');
    const stepsText = Array.isArray(item.steps) ? item.steps.join(' ').toLowerCase() : '';

    const allText = `${title} ${badge} ${subtitle} ${summary} ${description} ${coverage} ${pointsText} ${detailsText} ${limitsText} ${tierText} ${tablesText.toLowerCase()} ${stepsText}`;

    const is2xQuery = /^(2x|2\s*x)$/i.test(query);
    if (is2xQuery) {
      const has2x = /\b2\s*x\b/i.test(allText) || /\b2x\b/i.test(allText) || title.includes('2x') || title.includes('2X');
      if (has2x) {
        return (title.includes('2x') || title.includes('2X')) ? 1000 : 600;
      }
      return 0; // Strictly do not match unrelated "2"
    }

    // 1. Exact title match
    if (title === query) {
      score += 1000;
    } else if (title.startsWith(query)) {
      score += 800;
    } else if (title.includes(query)) {
      score += 600;
    } else if (badge.includes(query) || coverage.includes(query)) {
      score += 500;
    } else if (subtitle.includes(query) || summary.includes(query) || description.includes(query)) {
      score += 400;
    } else if (allText.includes(query)) {
      score += 300;
    } else if (queryTokens.length > 1 && queryTokens.every(token => {
      if (token.length <= 1) return false;
      const esc = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp(`\\b${esc}\\b`, 'i').test(allText) || allText.includes(token);
    })) {
      score += 250;
    }

    return score;
  };

  const processedSections = (featuresSections || []).map((sec) => {
    const scoredItems = (sec.items || []).map((item, originalIndex) => {
      const score = calculateItemScore(item);
      if (score > 0) {
        matchedItemIds.add(item.id);
        totalMatches++;
      }
      return {
        ...item,
        _searchScore: score,
        _isMatched: score > 0,
        _originalIndex: originalIndex
      };
    });

    // Sort: matching items first (sorted by score descending), then non-matching items in original order
    const sortedItems = [...scoredItems].sort((a, b) => {
      if (a._isMatched && !b._isMatched) return -1;
      if (!a._isMatched && b._isMatched) return 1;
      if (a._isMatched && b._isMatched) {
        return b._searchScore - a._searchScore;
      }
      return a._originalIndex - b._originalIndex;
    });

    return {
      ...sec,
      title: formatPolicyBenefitHeading(sec.title || ''),
      items: sortedItems
    };
  });

  return {
    sections: processedSections,
    totalMatches,
    hasActiveSearch: true,
    matchedItemIds
  };
}
