create table public.party_loadouts
(
    id         text primary key         default public.generate_id(),
    loadout    jsonb,
    hash       text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.party_loadouts
    enable row level security;

create unique index index_hash_on_party_loadouts on party_loadouts (hash);

create policy anyone_can_select on party_loadouts for select to anon using (true);
create policy anyone_can_insert on party_loadouts for insert to anon with check (true);

