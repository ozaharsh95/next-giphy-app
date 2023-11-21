
"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { Oval } from 'react-loader-spinner'


const GiphySearch = () => {
  const [query, setQuery] = useState("")
  const [gifs, setGifs] = useState([])
  const [offset, setOffset] = useState(0)
  const limit = 4
  const [loading,setLoading] = useState(false);

  const GIPHY_API_KEY = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"
  const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search"

  const searchGifs = async url => {
    setLoading(true);
    
    try {
      var response;
      
        response = await axios.get(url, {
          params: {
            api_key: GIPHY_API_KEY,
            q: query,
            offset
          }
        })
  
      
      console.log(response.data)
      var newGifs;
    
        newGifs = response.data.data.map(gif => ({
          id: gif.id,
          url: gif.images.fixed_height.url,
          title: gif.title
        }))
     
      if (offset === 0) {
        setGifs(newGifs)
      } else {
        setGifs(prevGifs => [...prevGifs, ...newGifs])
      }
    } catch (error) {
      console.error("Opps, Somthing went wrong!", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (query !== "") {
      searchGifs(GIPHY_API_URL)
    }
  }, [query, offset])

  
  const handleSearch = () => {
    
    setOffset(0)
    searchGifs(GIPHY_API_URL)
   
  }

  const handleNext = () => {
    setOffset(offset + limit)
  }

  const handlePrevious = () => {
    if (offset >= limit) {
      setOffset(offset - limit)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    redirect("/signin")
  }

  
 
  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>

      <div className="min-h-screen flex  flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl w-full space-y-8 p-8 bg-gray-100 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search for GIFs"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="block w-full rounded-lg border-gray-300 bg-gray-100 py-2 px-4 text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-black text-white rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Find
          
              </button>
             
            </div>
            
          </div>
          {
            loading ? (
              <Oval
              ariaLabel="loading-indicator"
              height={200}
              width={200}
              strokeWidth={5}
              strokeWidthSecondary={2}
              color="lightblue"
              secondaryColor="white"
            />
            ) : (' ')
          }
          <div className="flex flex-wrap justify-center rounded-lg overflow-hidden">
          
            {gifs.slice(offset, offset + limit).map(gif => (
              <>
              <div className="flex-row justify-center items-center bg-sky-200 p-2 m-10">

              <img
                key={gif.id}
                src={gif.url}
                alt={gif.title}
                className="w-50 p-2 rounded-lg" />
                <h3 className="text-black text-center">{gif.title}</h3>
                </div>
                </>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
            >
              ⏮️ Previous
            </button>
            <button
              onClick={handleNext}
              disabled={offset + limit >= gifs.length}
              className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-sm disabled:opacity-40 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Next ⏭️
            </button>
          </div>
        </div>

        
       
      </div>
    </>
  )
}

export default GiphySearch
