-- ============================================================
--  ETTA WEBSITE — CMS SCHEMA
--  Run this in your Supabase SQL Editor
-- ============================================================

-- 1. TEAM MEMBERS
create table if not exists team_members (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  role         text not null,
  photo_url    text,
  display_order integer default 0,
  created_at   timestamptz default now()
);

-- 2. CAREER LOCATIONS
create table if not exists career_locations (
  id           uuid primary key default gen_random_uuid(),
  country      text not null,
  flag         text not null,
  is_active    boolean default true,
  display_order integer default 0
);

-- 3. SITE STATS
create table if not exists site_stats (
  id           uuid primary key default gen_random_uuid(),
  label        text not null,
  value        text not null,
  display_order integer default 0
);

-- 4. CONTACT INFO (single row — id = 'main')
create table if not exists contact_info (
  id           text primary key default 'main',
  phone_rw     text,
  phone_ke     text,
  phone_us     text,
  address_1    text,
  address_2    text
);

-- 5. ABOUT CARDS
create table if not exists about_cards (
  id           uuid primary key default gen_random_uuid(),
  number       text not null,
  title        text not null,
  body         text not null,
  display_order integer default 0
);

-- ============================================================
--  ROW LEVEL SECURITY — public can read, only admin can write
-- ============================================================
alter table team_members     enable row level security;
alter table career_locations enable row level security;
alter table site_stats       enable row level security;
alter table contact_info     enable row level security;
alter table about_cards      enable row level security;

-- Public read policies
create policy "Public read team_members"     on team_members     for select using (true);
create policy "Public read career_locations" on career_locations for select using (true);
create policy "Public read site_stats"       on site_stats       for select using (true);
create policy "Public read contact_info"     on contact_info     for select using (true);
create policy "Public read about_cards"      on about_cards      for select using (true);

-- Authenticated write policies
create policy "Auth write team_members"     on team_members     for all using (auth.role() = 'authenticated');
create policy "Auth write career_locations" on career_locations for all using (auth.role() = 'authenticated');
create policy "Auth write site_stats"       on site_stats       for all using (auth.role() = 'authenticated');
create policy "Auth write contact_info"     on contact_info     for all using (auth.role() = 'authenticated');
create policy "Auth write about_cards"      on about_cards      for all using (auth.role() = 'authenticated');

-- ============================================================
--  SEED DATA — current website content
-- ============================================================

-- Team
insert into team_members (name, role, photo_url, display_order) values
  ('NTAKIYIMANA Emmanuel', 'Chief Executive Officer & Founder (CEO)', '/images/team-ceo-emmanuel.jpg', 1),
  ('UWASE T.',             'Chief Marketing Officer',                  '/images/team-cmo-uwase.jpg',     2),
  ('Kalisa T.H',           'Chief Operating Officer (COO)',            '/images/team-coo-kalisa.jpg',    3),
  ('Mujawayezu Therese',   'Manager',                                  '/images/team-manager-therese.jpg', 4);

-- Careers
insert into career_locations (country, flag, is_active, display_order) values
  ('Portugal',  '🇵🇹', true, 1),
  ('Norway',    '🇳🇴', true, 2),
  ('Serbia',    '🇷🇸', true, 3),
  ('Lithuania', '🇱🇹', true, 4);

-- Stats
insert into site_stats (label, value, display_order) values
  ('Years of Experience',         '15+',     1),
  ('Trips Completed',             '250+',    2),
  ('Happy Travelers & Students',  '30,000+', 3);

-- Contact
insert into contact_info (id, phone_rw, phone_ke, phone_us, address_1, address_2) values
  ('main', '+250 785 316 178', '+254 112 538 982', '+1 817 500 3240', 'Kigali, Rwanda', 'Nairobi, Kenya')
on conflict (id) do nothing;

-- About cards
insert into about_cards (number, title, body, display_order) values
  ('01', 'About Us',     'Welcome to EMMA TOUR AND TRAVEL AGENCY LTD, your trusted partner in tourism and education consultancy. We specialize in creating unforgettable travel experiences and facilitating life-changing study abroad opportunities.', 1),
  ('02', 'Who We Are',   'Founded by a team of seasoned travel enthusiasts and education professionals, ETTA brings together years of expertise. Our deep understanding allows us to offer tailored services for unique needs.', 2),
  ('03', 'Our Vision',   'To be a global leader in the tourism and study abroad industry, recognized for our dedication to quality. We strive to create a world where travel and education are accessible to all.', 3),
  ('04', 'Our Approach', 'At ETTA, we believe in a client-centered approach. We take the time to understand your goals and preferences, allowing us to craft bespoke solutions that exceed your expectations.', 4);
