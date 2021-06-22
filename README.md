# I Got A Question [APP]

Esse aplicativo é uma plataforma de perguntas e respostas!

<details>
<summary>Aula 1</summary>

## Conceitos react:

- Componentes
- Propriedades
- Estado

<details>
<summary>Explicação</summary>
<p>

### Componentes

### Propriedades

### Estado

</p>
</details>

## Variavéis de Ambiente

Utilizar variaveis do process env no projeto para segurança quando subir arquivo em repositório público.

> todas as variavéis ficam localizados no arquivo local (.env.local) e tem o padrão de letra maiuscula, importante no react necessita do prefiro REACT*APP*[KEY]

## Conceitos do firebase

Realtime Database - Banco de dados com atualização em tempo real.

### npx create-react-app // yarn create-react-app

[Comando utilizado para preparar ambiente e pacotes para um aplicativo react](https://create-react-app.dev/)

</details>

<details>
<summary>Aula 2</summary>

> [Figma do App](https://www.figma.com/file/SSKzcn2Q1Yjlir17zyJjcp/Letmeask-Copy?node-id=0%3A1)

Sempre que possível utilize svg para não haver distorção nas imagens.

## Webpack

O webpack é um module blunder (), ele possui um padrão determinado para entender cada tipo de arquivo e executar a função adequada referente á ela.

Padrão utilizado para importação de imagens:

```js
import illustrationImg from '../assets/images/illustration.svg';
<img src={illustrationImg} alt='Ilustração de perguntas e respostas' />;
```

Quando se trata de estilos, basta importa-lo em qualquer página ou componente para usar-las.

```js
import './styles/global.css';
```

Para se utilizar as classes utiliza-se className e não class, pois class é uma palavra reservada para criar classes no Javascript

```js
<div className='classe'>Utilizando classes no React</div>
```

Para importação de fontes, basta importa-las no arquivo index.html --> `public/index.html`

## Rotas

Uma SPA possui rotas com determinados atalhos para diferentes funcionalidades da aplicação, a biblioteca utilizada na aplicação é o `react-router-dom`

> Importante: Como a biblioteca não é desenvolvida com typescript é necessário instalar como lib de desenvolvimento, o pacote types@react-router-dom

## Hooks
Toda nomeclatura que começa com ```use...``` é um hook no react, ele necessita estar declarado dentro do componente, pois faz uso de informações do contexto do componente.

</details>
