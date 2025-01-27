/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react'
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { animations } from '@formkit/drag-and-drop';
import { IGIFData, IGiphyResponse } from './interfaces/IGiphy';
import './App.css'

const API_URL: string = import.meta.env.VITE_GIPHY_API_URL
const API_KEY: string = import.meta.env.VITE_GIPHY_API_KEY
const API_KEY_2: string = import.meta.env.VITE_GIPHY_API_KEY
const INITIAL_QUERY: string = import.meta.env.VITE_GIPHY_INITIAL_QUERY

function App() {

  const [query, setQuery] = useState<string>("")
  //const [limit, setLimit] = useState<number>(25)
  const [array, setArray] = useState<IGIFData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getGIF = async(initialQuery?:string) => {
    try {
      
      async function fetchGIF(apiKey:string) {
        const response = await fetch(`${API_URL}/gifs/search?api_key=${apiKey}&q=${query || initialQuery}&limit=${50}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
        const { data } : IGiphyResponse = await response.json()
        setArray(data)
        _setValues(data)
      }
      try {
        setLoading(true)
        await fetchGIF(API_KEY)

      } catch (error) {
        console.error(error)
        await fetchGIF(API_KEY_2)
      }
    } catch (error) {
      console.error(error)
    } finally{
      setLoading(false)
    }
  }
  
  const [parent, arrayGif, _setValues] = useDragAndDrop<HTMLUListElement, IGIFData>(
    array,
    {
      draggable: (el) => {
        return el.id !== "no-drag";
      },
      plugins: [ animations()]
    }
  );

  useEffect(() => {
    getGIF(INITIAL_QUERY)
  }, [])

  return (
    <div className="main-container container-fluid h-auto align-content-md-start text-center gap-2">
      <div className='header-container m-auto p-2 mt-md-3 rounded-2'>
        <div className='w-auto container col text-start'>
          <h1 className='text-white title'>GIF DRAG AND DROP</h1>
          <p className='blockquote text-white h2 '>Search and move GIF</p>
        </div>
        <div className='container-fluid col text-end justify-content-start justify-content-md-end align-items-center row row-cols-2 row'>
        <div className="col-8">
          <input
            type="text"
            className="input-query rounded-2"
            value={query}
            placeholder="Search images..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className="col-4">
          <button
            className="button-search w-100 rounded-2"
            onClick={() => {
              if (!query.trim()) return;
              getGIF();
            }}
          >
            SEARCH
          </button>
        </div>
          {/* <div className="input-group mb-3">
            <span className="input-group-text" id="inputGroup-sizing-default">Limit</span>
            <select className="form-select" value={limit} onChange={(e) => { setLimit( Number(e.target.value)) }}>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div> */}
        </div>
      </div>
      <ul className={"draggable-container m-auto mt-4 rounded-2 align-items-start " + (loading && "placeholder-wave")} ref={parent}>
        {arrayGif.map((gif) => (
          <li key={gif.id} data-label={gif.id} className="list-unstyled p-4 rounded-2 shadow-lg draggable">
            <img src={gif?.images?.original?.webp ?? ""} className='draggable-image shadow-lg' loading='lazy'/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App