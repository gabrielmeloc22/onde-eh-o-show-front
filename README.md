# 🎶 Onde é o Show 
<p align="left">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
<p>

Onde é o Show é um agregador de serviços de venda de ingresso que mostra onde os<br/>
seus artistas favoritos vão estar se apresentando no Brasil!

### TODO

- [X] ~~Integração com o backend (Ainda em desenvolvimento)~~
- [X] ~~Seleção de artistas e live-search com a Api do Spotify~~
- [X] ~~Verificação em rotas que precisam de autenticação~~ 
- [ ] Implementar a feature de notificações (comunicando com o back-end)
- [ ] Criar rotas dinamicas para cada artista
- [ ] Criar página de perfil do usuário


## 🛠️ Abrir e rodar o projeto
> **Note**
> Como há dois repositórios, um para o front-end e outro para o back-end, você irá precisar rodar dois projetos. Futuramente, a ideia é criar um monorepo.

### Front-end
- Clone este repositório e instale as depedências
```sh
> git clone https://github.com/gabrielmeloc22/onde-eh-o-show-front.git
> cd onde-eh-o-show-front
> ## Instale as dependências (yarn, npm i, pnpm i)
```

- Crie um arquivo .env.local e adicione suas variáveis ambiente
> SPOTIFY_CLIENT_ID=`Id da sua aplicação do Spotify`<br/>
  SPOTIFY_CLIENT_SECRET=`Secret da sua aplicação do Spotify`<br/>
  SPOTIFY_STATE_SECRET=`openssl rand -base64 32`<br/>
  SPOTIFY_SCOPE=`"user-read-email user-top-read"`<br/>
  SPOTIFY_REDIRECT_URI=`http://localhost:3000/api/auth/spotify/callback`<br/>

- Inicie o projeto: `(yarn, npm, pnpm) dev` ✨

### Back-end
- Clone o repositório back-end e instale as depedências
```sh
> git clone https://github.com/gabrielmeloc22/onde-eh-o-show-back.git
> cd onde-eh-o-show-back
> ## Instale as dependências (yarn, npm i, pnpm i)
```

- Crie um arquivo .env.local e adicione suas variáveis ambiente
> DATABASE_URL=`Url do seu banco de dados postgres`<br/>
  PORT=`Número da porta do servidor`<br/>
  
- Inicie o projeto: `(yarn, npm, pnpm) dev` ✨

## Acessar o projeto em produção
 - Como os servidores são de baixo custo, há um cold start, ou seja, na primeira vez que o servidor backend for acessado, resultará em um timeout. Espere um pouco e tente novamente!
 - E também como o Spotify limita o acesso a contas registradas no app, utilize as seguintes credencias:
 > email: ondeehoshow@gmail.com<br/>
 senha: ondeehoshow
