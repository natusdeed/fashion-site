/**
 * Video Validation Utilities
 * 
 * Ensures videos comply with site rules:
 * - File size < 5MB
 * - Quality standards
 * - Proper format
 */

export interface VideoValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validates video file size
 * @param fileSizeBytes - File size in bytes
 * @param maxSizeMB - Maximum size in MB (default: 5MB)
 * @returns Validation result
 */
export function validateVideoFileSize(
  fileSizeBytes: number,
  maxSizeMB: number = 5
): VideoValidationResult {
  const maxSizeBytes = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  const fileSizeMB = fileSizeBytes / (1024 * 1024);
  
  const errors: string[] = [];
  const warnings: string[] = [];

  if (fileSizeBytes > maxSizeBytes) {
    errors.push(
      `Video file size (${fileSizeMB.toFixed(2)}MB) exceeds maximum allowed size (${maxSizeMB}MB). ` +
      `This will hurt page performance and user experience.`
    );
  } else if (fileSizeMB > maxSizeMB * 0.9) {
    warnings.push(
      `Video file size (${fileSizeMB.toFixed(2)}MB) is close to the limit (${maxSizeMB}MB). ` +
      `Consider optimizing further.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates video URL and provides recommendations
 * @param videoUrl - Video URL to validate
 * @returns Validation result with recommendations
 */
export function validateVideoUrl(videoUrl: string): VideoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check file extension
  const extension = videoUrl.split('.').pop()?.toLowerCase();
  if (extension !== 'mp4') {
    errors.push(
      `Video format should be MP4 (H.264 codec) for best compatibility. ` +
      `Found: ${extension || 'unknown'}.`
    );
  }

  // Check if URL is valid
  try {
    new URL(videoUrl);
  } catch {
    // Relative URL is fine, but warn if it doesn't start with /
    if (!videoUrl.startsWith('/') && !videoUrl.startsWith('./')) {
      warnings.push(
        `Video URL should be absolute or relative path starting with '/'. ` +
        `Current: ${videoUrl}`
      );
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates video configuration for autoplay
 * @param autoplay - Whether video should autoplay
 * @param muted - Whether video is muted
 * @returns Validation result
 */
export function validateAutoplayConfig(
  autoplay: boolean,
  muted: boolean
): VideoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // CRITICAL RULE: Autoplay MUST be muted
  if (autoplay && !muted) {
    errors.push(
      `CRITICAL: Videos with autoplay MUST be muted. ` +
      `Browser policies prevent autoplay with sound, and it creates poor UX. ` +
      `Set muted={true} when autoplay={true}.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validates that fallback image is provided
 * @param posterUrl - Poster/fallback image URL
 * @param imageUrl - Alternative image URL
 * @returns Validation result
 */
export function validateFallbackImage(
  posterUrl?: string,
  imageUrl?: string
): VideoValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!posterUrl && !imageUrl) {
    errors.push(
      `CRITICAL: Every video MUST have a fallback image (posterUrl or imageUrl). ` +
      `This is required for mobile performance, accessibility, and when video fails to load.`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Comprehensive video validation
 * @param config - Video configuration
 * @returns Combined validation result
 */
export function validateVideoConfig(config: {
  videoUrl: string;
  autoplay?: boolean;
  muted?: boolean;
  posterUrl?: string;
  imageUrl?: string;
  fileSizeBytes?: number;
}): VideoValidationResult {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];

  // Validate URL
  const urlValidation = validateVideoUrl(config.videoUrl);
  allErrors.push(...urlValidation.errors);
  allWarnings.push(...urlValidation.warnings);

  // Validate autoplay config
  const autoplayValidation = validateAutoplayConfig(
    config.autoplay || false,
    config.muted || false
  );
  allErrors.push(...autoplayValidation.errors);
  allWarnings.push(...autoplayValidation.warnings);

  // Validate fallback image
  const fallbackValidation = validateFallbackImage(
    config.posterUrl,
    config.imageUrl
  );
  allErrors.push(...fallbackValidation.errors);
  allWarnings.push(...fallbackValidation.warnings);

  // Validate file size if provided
  if (config.fileSizeBytes !== undefined) {
    const sizeValidation = validateVideoFileSize(config.fileSizeBytes);
    allErrors.push(...sizeValidation.errors);
    allWarnings.push(...sizeValidation.warnings);
  }

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };
}

/**
 * Logs validation results to console (development only)
 */
export function logValidationResults(
  result: VideoValidationResult,
  context: string = "Video Validation"
): void {
  if (typeof window === 'undefined') return; // Server-side only

  if (result.errors.length > 0) {
    console.error(`❌ ${context} - ERRORS:`, result.errors);
  }
  
  if (result.warnings.length > 0) {
    console.warn(`⚠️ ${context} - WARNINGS:`, result.warnings);
  }
  
  if (result.isValid && result.warnings.length === 0) {
    console.log(`✅ ${context} - All checks passed`);
  }
}
