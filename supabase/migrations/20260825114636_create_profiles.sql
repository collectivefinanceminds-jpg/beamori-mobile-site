-- Beamori customer profile, one-to-one with auth.users.
-- id is the permanent Beamori customer identifier used by every future
-- system (orders, loyalty, membership, tasks, coupons).
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Each customer can read and update only their own profile.
create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Profiles are updatable by owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No insert/delete policy is defined: rows are created only by the trigger
-- below (which runs as security definer, bypassing RLS) and are never
-- deleted directly by customers.

-- Creates the profile row atomically whenever a new auth.users row is
-- created, so "auth.users exists but profiles is missing" can't happen.
-- security definer lets this trigger write to public.profiles even though
-- the inserting role (the auth system) has no RLS grant on that table.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', ''),
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keeps updated_at accurate without relying on the application to set it.
create function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute function public.handle_updated_at();
