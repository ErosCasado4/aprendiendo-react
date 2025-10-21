
import { useState, useEffect, Children } from 'react'
import { EVENTS } from './consts.js'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './utils.js'

export function Router ({ children,routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1> /* eslint-disable-line no-unused-vars */ })  {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)
 
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const routesFromChildren = Children.map(children, ({ props, type }) =>{
  const { name } = type
  console.log ({ props, type })
  const isRoute = name === 'Route'
  return isRoute ? props : null
})

const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    /* hemos usado path-to-regexp para poder detectar
    rutas dinamicas, ejemplo: /search/:query
    query es una ruta dinamica*/
    
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false

    /*guarda parametros de la url que eran dinamicos
    y hemos extraido con path-to-regexp
    ejemplo, la ruta de arriba, si la url es search/javascript
    matched.params.query === 'javascript'*/
    routeParams = matched.params
    return true

    })?.Component

  return Page ? 
  <Page routeParams={routeParams} /> 
  : <DefaultComponent routeParams={routeParams} />
}