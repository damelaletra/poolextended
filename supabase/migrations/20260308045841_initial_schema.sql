-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  subscription_status TEXT DEFAULT 'inactive', -- 'inactive', 'active', 'trialing', 'canceled'
  stripe_customer_id TEXT,
  is_admin BOOLEAN DEFAULT false,
  download_credits INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tracks table
CREATE TABLE public.tracks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  version TEXT, -- "Extended Mix", "Acapella", "Remix"
  genre TEXT NOT NULL,
  bpm NUMERIC,
  key TEXT,
  duration_seconds INTEGER,
  audio_url TEXT NOT NULL,
  image_url TEXT,
  preview_url TEXT, -- Short version for non-subscribed users (optional)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create downloads table (to limit monthly downloads per user or track history)
CREATE TABLE public.downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  track_id UUID REFERENCES public.tracks(id) ON DELETE CASCADE NOT NULL,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Function to handle new user registration automatically creating a profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function when a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view their own profile."
  ON public.profiles FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Policies for tracks (Everyone can view tracks, but only admins can edit/delete)
CREATE POLICY "Tracks are viewable by everyone."
  ON public.tracks FOR SELECT
  USING ( true );

CREATE POLICY "Only admins can insert tracks."
  ON public.tracks FOR INSERT
  WITH CHECK ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true) );

CREATE POLICY "Only admins can update tracks."
  ON public.tracks FOR UPDATE
  USING ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true) );

CREATE POLICY "Only admins can delete tracks."
  ON public.tracks FOR DELETE
  USING ( EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true) );

-- Policies for downloads
CREATE POLICY "Users can view their own downloads."
  ON public.downloads FOR SELECT
  USING ( auth.uid() = user_id );

CREATE POLICY "Users can insert downloads if they are subscribed or have credits."
  ON public.downloads FOR INSERT
  WITH CHECK ( auth.uid() = user_id ); -- You might want to add more complex logic here later.
