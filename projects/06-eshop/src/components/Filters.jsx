import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'
import './Filters.css'

export function Filters () {
    const { filters, setFilters } = useFilters()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }

    return (
        <section className='filters'>

            <div>
            <label htmlFor={minPriceFilterId}>Precio:
                <input 
                type='range'
                id={minPriceFilterId}
                min='0'
                max='2000'
                onChange={handleChangeMinPrice}
                value={filters.minPrice}
                 />
                 <span>${filters.minPrice}</span>
            </label>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoría
                    <select id={categoryFilterId} onChange={handleChangeCategory}>
                        <option value="all">Todas</option>
                        <option value="smartphones">Smartphones</option>
                        <option value="laptops">Laptops</option>
                    </select>
                </label>
            </div>
        </section>
    )
}