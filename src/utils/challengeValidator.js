/**
 * challengeValidator.js
 * Validates student's code and DOM state against the challenge criteria.
 */

export function runChallengeValidation({ lesson, iframeDoc, code }) {
  if (!lesson || !lesson.challenge) {
    return { passed: true, message: 'لا توجد شروط تحقق لهذا الدرس.' };
  }

  const { challenge } = lesson;

  // 1. If custom validator function exists as a function
  if (typeof challenge.validate === 'function') {
    try {
      return challenge.validate({ iframeDoc, code });
    } catch (err) {
      return {
        passed: false,
        message: `حدث خطأ أثناء فحص الحل: ${err.message}`
      };
    }
  }

  // 2. If validator function string is provided
  if (challenge.validateFnString) {
    try {
      const validatorFn = new Function('iframeDoc', 'code', `
        try {
          ${challenge.validateFnString}
        } catch (e) {
          return { passed: false, message: 'خطأ أثناء تقييم الحل: ' + e.message };
        }
      `);
      const result = validatorFn(iframeDoc, code);
      if (result && typeof result.passed === 'boolean') {
        return result;
      }
      return { passed: false, message: 'لم يتم استرجاع نتيجة فحص صالحة.' };
    } catch (err) {
      return {
        passed: false,
        message: `تعذر تشغيل محرك الفحص: ${err.message}`
      };
    }
  }

  return { passed: true, message: 'أحسنت! تم تشغيل الكود بنجاح.' };
}
