import { Link } from '../Link.jsx'

const i18n = {
  es: {
    button: 'Ir a la Home',
    title: 'Sobre mi',
    description: '¡Hola! Mi nombre es Eros Casado y estoy creando un clon de React Router.'
  },
  en: {
    button: 'Go to home page',
    title: 'About me',
    description: 'Hi! My name is Eros Casado and I am creating a clone of React Router'
  }
}

const useI18n = (lang) => {
  return i18n[lang] || i18n.en
}


export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')
  return (
    <>
    <h1>{i18n.title}</h1>
    <img src="https://media.licdn.com/dms/image/v2/D4D22AQFuI32ptR6tcA/feedshare-shrink_2048_1536/B4DZkzAJLNJAAw-/0/1757497300451?e=1761782400&v=beta&t=b5ZYOJtLBcDCQ14peAzL-ZsIOJZ7SyNizYOxhU8AOiQ" alt="Foto de Eros" />
    <p>{i18n.description}</p>
    <Link to = '/' >{i18n.button}</Link>
    </>
  )
}