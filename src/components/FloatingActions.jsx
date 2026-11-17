import React from 'react';
import { FEATURE_FLAGS } from '../config/features';
import AiChatAssistant from './AiChatAssistant';
import UploadPolicyButton from './UploadPolicyButton';

/**
 * FloatingActions Component
 * 
 * Single fixed parent container on the bottom-right of the viewport.
 * Vertically stacks the two independent action buttons:
 * 1. Chat with WHYINSURED (top)
 * 2. Upload Your Policy (bottom)
 * 
 * Controlled centrally via FEATURE_FLAGS. When both features are disabled,
 * the container returns null to prevent leaving empty wrappers or blank spacing.
 */
export default function FloatingActions() {
  const showChat = FEATURE_FLAGS.AI_CHAT_WIDGET;
  const showUpload = FEATURE_FLAGS.POLICY_UPLOAD_WIDGET;

  // When both floating widgets are disabled, render nothing
  if (!showChat && !showUpload) {
    return null;
  }

  return (
    <div
      id="whyinsured-floating-actions"
      className="fixed right-3 bottom-2.5 sm:right-6 sm:bottom-6 z-[90] flex flex-col items-end gap-2 sm:gap-3 pointer-events-none select-none"
    >
      {/* 1. Chat with WHYINSURED Button (Top) */}
      {showChat && <AiChatAssistant />}

      {/* 2. Upload Your Policy Button (Bottom) */}
      {showUpload && <UploadPolicyButton />}
    </div>
  );
}
