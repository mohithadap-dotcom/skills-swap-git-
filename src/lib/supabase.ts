import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const signInMock = () => {
  // Simulate a logged in user for demo purposes
  const mockUser = {
    id: 'mock-user-123',
    email: 'demo@skillswap.nagpur',
    user_metadata: {
      full_name: 'Nagpur Developer (Demo)',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      user_name: 'octocat'
    }
  };
  return mockUser;
};
