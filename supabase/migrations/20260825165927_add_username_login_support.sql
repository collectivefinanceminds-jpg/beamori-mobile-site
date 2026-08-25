-- Save email on profiles (kept in sync with auth.users) and enforce unique,
-- case-insensitive usernames so display_name can double as a login
-- identifier.
alter table public.profiles add column email text;

update public.profiles p
set email = u.email
from auth.users u
where p.id = u.id and p.email is null;

create unique index profiles_display_name_lower_key
  on public.profiles (lower(display_name));

-- Superseded by handle_new_user() below, which also sets email.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, phone, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', ''),
    new.raw_user_meta_data ->> 'phone',
    new.email
  );
  return new;
end;
$$;

-- Keeps profiles.email correct if a customer later changes their auth
-- email (e.g. via Supabase's secure email-change flow).
create function public.handle_user_email_updated()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_updated
  after update of email on auth.users
  for each row execute function public.handle_user_email_updated();

-- Public, low-risk: only reveals whether a username is taken (standard
-- signup UX everywhere), never an email address.
create function public.is_username_available(check_username text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1 from public.profiles where lower(display_name) = lower(check_username)
  );
$$;

grant execute on function public.is_username_available(text) to anon, authenticated;
