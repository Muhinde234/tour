-- ============================================================
--  ETTA WEBSITE — CMS SCHEMA  (v2 — Full Scalable)
--  Run this in your Supabase SQL Editor
-- ============================================================

-- ── TEAM MEMBERS ────────────────────────────────────────────
create table if not exists team_members (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  role          text not null,
  photo_url     text default '',
  display_order integer default 0,
  created_at    timestamptz default now()
);

-- ── CAREER LOCATIONS ────────────────────────────────────────
create table if not exists career_locations (
  id            uuid primary key default gen_random_uuid(),
  country       text not null,
  flag          text not null default '🌍',
  is_active     boolean default true,
  display_order integer default 0
);

-- ── PERFORMANCE STATS ───────────────────────────────────────
create table if not exists site_stats (
  id            uuid primary key default gen_random_uuid(),
  label         text not null,
  value         text not null,
  display_order integer default 0
);

-- ── ABOUT CARDS ─────────────────────────────────────────────
create table if not exists about_cards (
  id            uuid primary key default gen_random_uuid(),
  number        text not null,
  title         text not null,
  body          text not null,
  display_order integer default 0
);

-- ── CONTACT INFO (single row) ────────────────────────────────
create table if not exists contact_info (
  id         text primary key default 'main',
  phone_rw   text default '',
  phone_ke   text default '',
  phone_us   text default '',
  address_1  text default '',
  address_2  text default ''
);

-- ── HERO SECTION (single row) ────────────────────────────────
create table if not exists hero_section (
  id                 text primary key default 'main',
  tagline            text default 'Say Yes To New World!',
  title              text default 'Your Trusted Partner in Tourism & Education Consultancy',
  subtitle           text default 'ETTA crafts unforgettable travel experiences and facilitates life-changing study abroad opportunities.',
  cta_primary_text   text default 'Start Your Journey',
  cta_secondary_text text default 'Learn More'
);

-- ── CORE VALUES ──────────────────────────────────────────────
create table if not exists site_values (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text not null,
  display_order integer default 0
);

-- ── WHY CHOOSE US ────────────────────────────────────────────
create table if not exists why_choose_us (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  body          text not null,
  display_order integer default 0
);

-- ── SITE CONFIG (key-value store) ────────────────────────────
create table if not exists site_config (
  key         text primary key,
  value       text not null,
  label       text,
  description text
);

-- ============================================================
--  STORAGE BUCKET — team photos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('team-photos', 'team-photos', true)
on conflict do nothing;

-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================
alter table team_members     enable row level security;
alter table career_locations enable row level security;
alter table site_stats       enable row level security;
alter table about_cards      enable row level security;
alter table contact_info     enable row level security;
alter table hero_section     enable row level security;
alter table site_values      enable row level security;
alter table why_choose_us    enable row level security;
alter table site_config      enable row level security;

-- Public read
create policy "Public read team_members"     on team_members     for select using (true);
create policy "Public read career_locations" on career_locations for select using (true);
create policy "Public read site_stats"       on site_stats       for select using (true);
create policy "Public read about_cards"      on about_cards      for select using (true);
create policy "Public read contact_info"     on contact_info     for select using (true);
create policy "Public read hero_section"     on hero_section     for select using (true);
create policy "Public read site_values"      on site_values      for select using (true);
create policy "Public read why_choose_us"    on why_choose_us    for select using (true);
create policy "Public read site_config"      on site_config      for select using (true);

-- Anon write (publishable key — tighten to auth.role()='authenticated' in production)
create policy "Anon write team_members"     on team_members     for all using (true);
create policy "Anon write career_locations" on career_locations for all using (true);
create policy "Anon write site_stats"       on site_stats       for all using (true);
create policy "Anon write about_cards"      on about_cards      for all using (true);
create policy "Anon write contact_info"     on contact_info     for all using (true);
create policy "Anon write hero_section"     on hero_section     for all using (true);
create policy "Anon write site_values"      on site_values      for all using (true);
create policy "Anon write why_choose_us"    on why_choose_us    for all using (true);
create policy "Anon write site_config"      on site_config      for all using (true);

-- Storage policies
create policy "Public read team-photos"  on storage.objects for select using (bucket_id = 'team-photos');
create policy "Anon upload team-photos"  on storage.objects for insert with check (bucket_id = 'team-photos');
create policy "Anon replace team-photos" on storage.objects for update using (bucket_id = 'team-photos');

-- ============================================================
--  SEED DATA
-- ============================================================

-- Team
insert into team_members (name, role, photo_url, display_order) values
  ('NTAKIYIMANA Emmanuel', 'Chief Executive Officer & Founder (CEO)', '/images/team-ceo-emmanuel.jpg', 1),
  ('UWASE T.',             'Chief Marketing Officer',                  '/images/team-cmo-uwase.jpg',    2),
  ('Kalisa T.H',           'Chief Operating Officer (COO)',            '/images/team-coo-kalisa.jpg',   3),
  ('Mujawayezu Therese',   'Manager',                                  '/images/team-manager-therese.jpg', 4)
on conflict do nothing;

-- Careers
insert into career_locations (country, flag, is_active, display_order) values
  ('Portugal',  '🇵🇹', true, 1),
  ('Norway',    '🇳🇴', true, 2),
  ('Serbia',    '🇷🇸', true, 3),
  ('Lithuania', '🇱🇹', true, 4)
on conflict do nothing;

-- Stats
insert into site_stats (label, value, display_order) values
  ('Years of Experience',        '15+',     1),
  ('Trips Completed',            '250+',    2),
  ('Happy Travelers & Students', '30,000+', 3)
on conflict do nothing;

-- Contact
insert into contact_info (id, phone_rw, phone_ke, phone_us, address_1, address_2) values
  ('main', '+250 785 316 178', '+254 112 538 982', '+1 817 500 3240', 'Kigali, Rwanda', 'Nairobi, Kenya')
on conflict (id) do nothing;

-- Hero
insert into hero_section (id, tagline, title, subtitle, cta_primary_text, cta_secondary_text) values
  ('main',
   'Say Yes To New World!',
   'Your Trusted Partner in Tourism & Education Consultancy',
   'ETTA crafts unforgettable travel experiences and facilitates life-changing study abroad opportunities — with a passion for exploration and a commitment to educational excellence.',
   'Start Your Journey',
   'Learn More')
on conflict (id) do nothing;

-- About cards
insert into about_cards (number, title, body, display_order) values
  ('01', 'About Us',     'Welcome to EMMA TOUR AND TRAVEL AGENCY LTD, your trusted partner in tourism and education consultancy. We specialize in creating unforgettable travel experiences and facilitating life-changing study abroad opportunities.', 1),
  ('02', 'Who We Are',   'Founded by a team of seasoned travel enthusiasts and education professionals, ETTA brings together years of expertise. Our deep understanding allows us to offer tailored services for unique needs.', 2),
  ('03', 'Our Vision',   'To be a global leader in the tourism and study abroad industry, recognized for our dedication to quality. We strive to create a world where travel and education are accessible to all.', 3),
  ('04', 'Our Approach', 'At ETTA, we believe in a client-centered approach. We take the time to understand your goals and preferences, allowing us to craft bespoke solutions that exceed your expectations.', 4)
on conflict do nothing;

-- Values
insert into site_values (title, body, display_order) values
  ('Excellency',           'We strive for the highest standards in all our services, ensuring every detail of your journey is handled with professional precision.', 1),
  ('Integrity',            'We conduct our business with absolute honesty and transparency, building lasting trust with our clients and partners.', 2),
  ('Innovation',           'We continuously seek new ways to enhance our offerings, providing added value through modern travel and education solutions.', 3),
  ('Customer Focus',       'Your satisfaction is our top priority. We listen, adapt, and deliver experiences tailored specifically to your aspirations.', 4),
  ('Cultural Appreciation','We promote understanding and respect for diverse cultures through our programs, fostering global citizenship.', 5)
on conflict do nothing;

-- Why Choose Us
insert into why_choose_us (title, body, display_order) values
  ('Expertise',           'Our team comprises industry experts with extensive knowledge and experience in global travel logistics and international education systems.', 1),
  ('Personalized Service','We offer customized solutions tailored specifically to your academic goals and travel preferences.', 2),
  ('Global Network',      'Our partnerships with top educational institutions and travel providers worldwide enable us to offer the best opportunities and exclusive experiences.', 3)
on conflict do nothing;

-- Site config
insert into site_config (key, value, label, description) values
  ('company_name',   'EMMA TOUR AND TRAVEL AGENCY LTD', 'Company Name',    'Full legal company name'),
  ('company_abbr',   'ETTA',                             'Abbreviation',    'Short brand name'),
  ('tagline',        'Say Yes To New World!',             'Tagline',         'Main brand tagline'),
  ('email',          '',                                  'Email Address',   'Public contact email'),
  ('website',        'www.emmatourtravel.com',            'Website',         'Public website URL'),
  ('founded_year',   '2009',                              'Founded Year',    'Year the company was founded')
on conflict (key) do nothing;
