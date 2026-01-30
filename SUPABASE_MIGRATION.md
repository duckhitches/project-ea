# Supabase Migration Guide

This guide will help you migrate from Appwrite to Supabase.

## 📋 Prerequisites

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Get your project credentials:
   - Project URL
   - Anon (public) key
   - Service role key (keep this secret!)

## 🚀 Step 1: Install Supabase Dependencies

```bash
cd ea
npm install @supabase/supabase-js @supabase/ssr
```

## 🗄️ Step 2: Set Up Database Schema

1. Open your Supabase Dashboard
2. Go to SQL Editor
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Run the SQL script
5. Verify that all tables were created successfully

## 🔐 Step 3: Update Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Remove or comment out Appwrite variables
# NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT=
# NEXT_PUBLIC_APPWRITE_PROJECT_ID=
# NEXT_PUBLIC_APPWRITE_DATABASE_ID=
# NEXT_PUBLIC_APPWRITE_LOGIN_HISTORY_COLLECTION_ID=
```

## 📦 Step 4: Database Schema Overview

### Tables Created:

1. **user_profiles** - Extended user profile information
   - `id` (UUID, references auth.users)
   - `name`, `bio`, `location`, `website`, `profile_picture`
   - Auto-created when user signs up

2. **login_history** - Login session tracking
   - `user_id`, `timestamp`, `ip_address`, `user_agent`
   - `device_type`, `location`, `logout_time`, `session_duration`

3. **interview_sessions** - AI interview data
   - `user_id`, `session_name`, `job_description`
   - `questions`, `answers`, `feedback`, `score`
   - `status`, `duration_minutes`

4. **user_preferences** - User settings
   - `theme`, `notifications_enabled`, `email_notifications`
   - `language`, `timezone`, `preferences` (JSONB)

### Security Features:

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies ensure users can only access their own data
- ✅ Automatic profile creation on signup
- ✅ Updated timestamp triggers

## 🔄 Step 5: Migration Checklist

- [ ] Install Supabase dependencies
- [ ] Create Supabase project
- [ ] Run database schema SQL
- [ ] Update environment variables
- [ ] Replace Appwrite client with Supabase client
- [ ] Update all API routes
- [ ] Update authentication flows
- [ ] Test user registration
- [ ] Test user login
- [ ] Test profile updates
- [ ] Test login history
- [ ] Test interview sessions
- [ ] Remove Appwrite dependencies

## 📝 Key Differences from Appwrite

### Authentication:
- **Appwrite**: `account.create()`, `account.createEmailSession()`
- **Supabase**: `supabase.auth.signUp()`, `supabase.auth.signInWithPassword()`

### Database:
- **Appwrite**: `databases.listDocuments()`, `databases.createDocument()`
- **Supabase**: `supabase.from('table').select()`, `supabase.from('table').insert()`

### User Data:
- **Appwrite**: User data in `account.get()` with `prefs` object
- **Supabase**: User in `auth.users`, profile in `user_profiles` table

## 🧪 Testing the Migration

1. **Test User Registration:**
   ```bash
   # Should create user in auth.users and user_profiles automatically
   ```

2. **Test Login:**
   ```bash
   # Should create session and return user data
   ```

3. **Test Profile Update:**
   ```bash
   # Should update user_profiles table
   ```

4. **Test Login History:**
   ```bash
   # Should insert into login_history table
   ```

## 🔍 Troubleshooting

### RLS Policy Errors
- Ensure RLS is enabled on all tables
- Check that policies are correctly applied
- Verify user is authenticated before queries

### Authentication Issues
- Check environment variables are set correctly
- Verify Supabase project settings
- Check browser console for errors

### Migration Issues
- Ensure all foreign key relationships are correct
- Verify UUID types match Supabase Auth user IDs
- Check that triggers are created successfully

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

