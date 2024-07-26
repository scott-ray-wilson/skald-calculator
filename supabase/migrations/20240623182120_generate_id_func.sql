-- MODIFIED FROM https://blog.andyet.com/2016/02/23/generating-shortids-in-postgres/

create or replace function public.generate_id()
    returns text
    set search_path = ''
as
$$
declare
    key   text;
    qry   text;
    found text;
begin
    -- generate the first part of a query as a string with safely
    -- escaped table name, using || to concat the parts
    qry := 'select id from public.party_loadouts where id=';

    -- This loop will probably only run once per call until we've generated
    -- millions of ids.
    loop

        -- Generate our string bytes and re-encode as a base64 string.
        key := encode(extensions.gen_random_bytes(6), 'base64');

        -- Base64 encoding contains 2 URL unsafe characters by default.
        -- The URL-safe version has these replacements.
        key := replace(key, '/', '_'); -- url safe replacement
        key := replace(key, '+', '-');
        -- url safe replacement

        -- Concat the generated key (safely quoted) with the generated query
        -- and run it.
        -- SELECT id FROM "test" WHERE id='blahblah' INTO found
        -- Now "found" will be the duplicated id or NULL.
        execute qry || quote_literal(key) into found;

        -- Check to see if found is NULL.
        -- If we checked to see if found = NULL it would always be FALSE
        -- because (NULL = NULL) is always FALSE.
        if found is null then

            -- If we didn't find a collision then leave the LOOP.
            exit;
        end if;

        -- We haven't EXITed yet, so return to the top of the LOOP
        -- and try again.
    end loop;

    return key;
end;
$$ language 'plpgsql'