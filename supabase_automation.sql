-- 1. Enable the pg_net extension to make HTTP requests
create extension if not exists pg_net;

-- 2. Create the function that triggers the webhook
create or replace function public.handle_new_member_email()
returns trigger as $$
begin
  -- Replace 'YOUR_PUBLIC_DOMAIN' with your actual Vercel/Public URL
  -- Example: 'https://mivn.online/api/webhooks/welcome'
  -- Note: This won't work with 'localhost' unless you use ngrok
  perform net.http_post(
    url := 'https://YOUR_PUBLIC_DOMAIN/api/webhooks/welcome',
    body := jsonb_build_object(
        'type', TG_OP,
        'table', TG_TABLE_NAME,
        'record', row_to_json(NEW)
    )
  );
  return new;
end;
$$ language plpgsql security definer;

-- 3. Create the trigger on the 'profiles' table
drop trigger if exists on_param_new_member on public.profiles;
create trigger on_param_new_member
after insert on public.profiles
for each row execute procedure public.handle_new_member_email();
