# 🎶 Onde é o Show 
<p align="left">
<img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge"/>
<p>

Onde é o Show é um agregador de serviços de venda de ingresso que mostra onde os<br/>
seus artistas favoritos vão estar se apresentando no Brasil!

### TODO

- [ ] Integração com o backend (Ainda em desenvolvimento)
- [ ] Seleção de artistas e live-search com a Api do Spotify
- [X] ~~Verificação em rotas que precisam de autenticação~~ 


## 🛠️ Abrir e rodar o projeto
- Instale as dependências: `yarn`
- Adicione suas variáveis ambiente no arquivo `.env.local` 

> SPOTIFY_CLIENT_ID=`Id da sua aplicação do Spotify`<br/>
  SPOTIFY_CLIENT_SECRET=`Secret da sua aplicação do Spotify`<br/>
  SPOTIFY_STATE_SECRET=`openssl rand -base64 32`<br/>
  SPOTIFY_SCOPE=`"user-read-email user-top-read"`<br/>
  SPOTIFY_REDIRECT_URI=`http://localhost:3000/api/auth/spotify/callback`<br/>

- Inicie o projeto: `yarn dev` ✨
