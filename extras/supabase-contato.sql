-- Formulário de contato do site da G.W.E.N.
-- Rode no SQL Editor do Supabase. Quem visita o site só consegue INSERIR; ler fica só para você no painel.

create table if not exists public.gwen_site_messages (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nome        text not null check (char_length(nome) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 200),
  assunto     text not null check (assunto in ('sugestao','problema','caso','beta','outro')),
  mensagem    text not null check (char_length(mensagem) between 1 and 5000),
  publicar    boolean not null default false,
  versao      text,
  anexo_path  text,
  anexo_nome  text,
  pagina      text,
  lida        boolean not null default false
);

alter table public.gwen_site_messages enable row level security;

drop policy if exists "site insere mensagens" on public.gwen_site_messages;
create policy "site insere mensagens" on public.gwen_site_messages
  for insert to anon with check (true);

-- bucket privado para os anexos (até 10 MB, só os tipos aceitos no formulário)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('gwen-site-anexos', 'gwen-site-anexos', false, 10485760,
        array['image/png','image/jpeg','image/webp','image/gif','application/pdf','text/plain','application/zip','application/x-zip-compressed'])
on conflict (id) do nothing;

drop policy if exists "site envia anexos" on storage.objects;
create policy "site envia anexos" on storage.objects
  for insert to anon with check (bucket_id = 'gwen-site-anexos');
