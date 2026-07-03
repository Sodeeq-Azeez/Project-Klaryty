-- Oyelakin Close Platform Database Schema

-- Users Table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  role TEXT NOT NULL CHECK (role IN ('admin', 'resident', 'security')),
  full_name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Houses Table
CREATE TABLE houses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  house_number TEXT NOT NULL UNIQUE,
  resident_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Visitors Table
CREATE TABLE visitors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  resident_id UUID REFERENCES users(id) NOT NULL,
  visitor_name TEXT NOT NULL,
  access_code VARCHAR(6) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'verified', 'expired')),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Dues Table
CREATE TABLE dues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  house_id UUID REFERENCES houses(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('cleared', 'owing')),
  date_paid DATE,
  recorded_by UUID REFERENCES users(id), -- The admin who recorded the payment
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Notices Table
CREATE TABLE notices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;
ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE dues ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies (Update these as needed for strict security)
CREATE POLICY "Public profiles are viewable by everyone in the estate."
  ON users FOR SELECT USING (true);

CREATE POLICY "Users can update own profile."
  ON users FOR UPDATE USING (auth.uid() = id);

-- For testing purposes in development, you can allow all access, but be sure to secure these before going to production
CREATE POLICY "Allow all access to houses" ON houses FOR ALL USING (true);
CREATE POLICY "Allow all access to visitors" ON visitors FOR ALL USING (true);
CREATE POLICY "Allow all access to dues" ON dues FOR ALL USING (true);
CREATE POLICY "Allow all access to notices" ON notices FOR ALL USING (true);
