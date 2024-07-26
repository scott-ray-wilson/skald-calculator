/* prevents duplicate party configs from being stored in db */
create function public.upsert_party_loadout(loadout jsonb)
    returns TABLE(id text)
    language plpgsql
as
$$
declare
    loadout_hash text;
begin
    loadout_hash := md5(loadout::text);

    return query (with cte as (
        insert into party_loadouts as l (hash, loadout)
            values (loadout_hash, loadout)
            on conflict (hash) do nothing
            returning l.id)
                  select c.id from cte as c
                  where exists (select 1 from cte) -- success
                  union all
                  select p.id
                  from party_loadouts as p
                  where p.hash = loadout_hash
                    and not exists (select 1 from cte));
end;
$$;

