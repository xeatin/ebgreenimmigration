create table public.post_translations (
  cache_key text not null,
  lang text not null,
  data jsonb not null,
  created_at timestamptz not null default now(),
  primary key (cache_key, lang)
);

alter table public.post_translations enable row level security;

create policy "Public read translations"
on public.post_translations
for select
to anon, authenticated
using (true);
