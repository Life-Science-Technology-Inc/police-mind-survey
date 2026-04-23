import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API 키를 가져옵니다
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

const createUnconfiguredClient = () => {
  const missingConfigError = { message: 'Supabase is not configured.' };

  const unresolvedQuery = {
    eq: () => unresolvedQuery,
    neq: () => unresolvedQuery,
    gt: () => unresolvedQuery,
    gte: () => unresolvedQuery,
    lt: () => unresolvedQuery,
    lte: () => unresolvedQuery,
    or: () => unresolvedQuery,
    order: () => unresolvedQuery,
    limit: async () => ({ data: null, error: missingConfigError }),
    single: async () => ({ data: null, error: missingConfigError }),
    maybeSingle: async () => ({ data: null, error: missingConfigError }),
    then: (resolve) => Promise.resolve(resolve({ data: null, error: missingConfigError })),
  };

  return {
    from: () => ({
      select: () => unresolvedQuery,
      insert: async () => ({ data: null, error: missingConfigError }),
      update: () => ({
        eq: async () => ({ data: null, error: missingConfigError }),
      }),
      delete: () => ({
        eq: async () => ({ data: null, error: missingConfigError }),
      }),
      upsert: async () => ({ data: null, error: missingConfigError }),
    }),
    rpc: async () => ({ data: null, error: missingConfigError }),
    auth: {
      getUser: async () => ({ data: { user: null }, error: missingConfigError }),
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: missingConfigError }),
        download: async () => ({ data: null, error: missingConfigError }),
      }),
    },
  };
};

if (!isSupabaseConfigured) {
  console.warn('Supabase env is missing. The app will render, but data features are disabled.');
}

const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      },
      // RLS 정책이 적용되도록 설정
      db: {
        schema: 'public'
      },
      // CORS 관련 설정 추가
      headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      // 전역 헤더 설정
      global: {
        headers: {
          'X-Client-Info': 'survey-app@1.0.0',
          'X-Requested-With': 'XMLHttpRequest'
        },
      },
    })
  : createUnconfiguredClient();

// RLS를 위한 헬퍼 함수들 (RPC 기반 시스템에서는 실제 인증 불필요)
export const ensureUserSession = async () => {
  // RPC 함수 기반 시스템에서는 인증 세션이 불필요
  // 익명 사용자로 처리하여 RLS 정책 우회
  return { id: 'anonymous-user', email: null };
};

export const getCurrentUserId = async () => {
  const user = await ensureUserSession();
  return user?.id || 'anonymous';
};

export default supabase;
