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

-- ── CONTACT MESSAGES ────────────────────────────────────────
create table if not exists contact_messages (
  id          uuid primary key default gen_random_uuid(),
  first_name  text not null,
  middle_name text default '',
  last_name   text not null,
  email       text not null,
  message     text not null,
  is_read     boolean default false,
  created_at  timestamptz default now()
);

alter table contact_messages enable row level security;
create policy "Anon insert messages" on contact_messages for insert with check (true);
create policy "Anon read messages"   on contact_messages for select using (true);
create policy "Anon update messages" on contact_messages for update using (true);
create policy "Anon delete messages" on contact_messages for delete using (true);

-- ── JOB APPLICATIONS ────────────────────────────────────────
create table if not exists job_applications (
  id           uuid primary key default gen_random_uuid(),
  first_name   text not null,
  last_name    text not null,
  email        text not null,
  country      text not null,
  phone        text not null,
  message      text not null,
  is_read      boolean default false,
  created_at   timestamptz default now()
);

alter table job_applications enable row level security;
create policy "Anon insert applications" on job_applications for insert with check (true);
create policy "Anon read applications"   on job_applications for select using (true);
create policy "Anon update applications" on job_applications for update using (true);
create policy "Anon delete applications" on job_applications for delete using (true);

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

-- ── SUCCESS STORIES ─────────────────────────────────────────
create table if not exists success_stories (
  id            uuid primary key default gen_random_uuid(),
  story         text not null,
  photo_url     text default '/images/success-1.jpg',
  display_order integer default 0
);

-- ── COMPETITIVE ADVANTAGES ───────────────────────────────────
create table if not exists competitive_advantages (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  items         text not null,  -- newline-separated list
  display_order integer default 0
);

-- ── WHAT WE DO (mission + services) ─────────────────────────
-- Stored in site_config with keys: mission_text, service_tourism_body, service_education_body
-- (already handled by /admin/services page)

-- ============================================================
--  STORAGE BUCKET — team photos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('team-photos', 'team-photos', true)
on conflict do nothing;

-- ============================================================
--  ROW LEVEL SECURITY
-- ============================================================
alter table success_stories       enable row level security;
alter table competitive_advantages enable row level security;
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
create policy "Public read success_stories"       on success_stories       for select using (true);
create policy "Public read competitive_advantages" on competitive_advantages for select using (true);
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
create policy "Anon write success_stories"       on success_stories       for all using (true);
create policy "Anon write competitive_advantages" on competitive_advantages for all using (true);
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

-- Success Stories
insert into success_stories (story, photo_url, display_order) values
  ('ETTA didn''t just help me with my visa; they helped me find a home. The transition to the UK was seamless.', '/images/success-1.jpg', 1),
  ('I was overwhelmed by the application process for Canada. Today, I''m working at a top tech firm in Toronto.', '/images/team-manager-therese.jpg', 2),
  ('The cultural appreciation ETTA teaches is real. My study abroad was the most transformative year of my life.', '/images/success-2.jpg', 3),
  ('Professional precision is an understatement. ETTA handled my complex application with ease and care.', '/images/success-1.jpg', 4),
  ('Thanks to ETTA, I am now pursuing my dream degree in Australia with a partial scholarship.', '/images/team-manager-therese.jpg', 5)
on conflict do nothing;

-- Competitive Advantages
insert into competitive_advantages (title, items, display_order) values
  ('Enhance Customer Experience', 'Provide personalized and high-quality travel and study abroad services.
Continuously improve customer service to exceed client expectations.
Offer diverse and unique travel and educational experiences.', 1),
  ('Promote Cultural Exchange', 'Foster understanding and appreciation of different cultures through travel.
Create opportunities for clients to engage with local communities.', 2),
  ('Support Academic & Personal Growth', 'Develop programs that support academic achievements and development.
Offer guidance and resources to help students succeed internationally.', 3)
on conflict do nothing;

-- Mission text (stored in site_config)
insert into site_config (key, value, label, description) values
  ('mission_text', 'To empower individuals through enriching travel and educational experiences. By providing top-notch tourism services and comprehensive study abroad programs, we aim to broaden horizons, foster cultural understanding, and contribute to the personal and professional growth of our clients.', 'Mission Statement', 'Shown in the What We Do section')
on conflict (key) do nothing;

-- Team
insert into team_members (name, role, photo_url, display_order) values
  ('NTAKIYIMANA Emmanuel', 'Chief Executive Officer & Founder (CEO)', '/images/team-ceo-emmanuel.jpg', 1),
  ('UWASE T.',             'Chief Marketing Officer',                  '/images/team-cmo-uwase.jpg',    2),
  ('Kalisa T.H',           'Chief Operating Officer (COO)',            '/images/team-coo-kalisa.jpg',   3),
  ('Mujawayezu Therese',   'Manager',                                  '/images/team-manager-therese.jpg', 4)
on conflict do nothing;

-- Careers
insert into career_locations (country, flag, is_active, display_order) values
  ('Portugal',        '🇵🇹', true, 1),
  ('Norway',          '🇳🇴', true, 2),
  ('Serbia',          '🇷🇸', true, 3),
  ('Lithuania',       '🇱🇹', true, 4),
  ('Hungary',         '🇭🇺', true, 5),
  ('Czech Republic',  '🇨🇿', true, 6)
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
