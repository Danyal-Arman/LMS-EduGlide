import { useSearchCourseQuery } from "@/features/api/courseApi";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Hero = () => {
    const [query, setQuery] = useState("")
       const {data, isLoading} = useSearchCourseQuery(query)
    const navigate = useNavigate()


    const searchCourseHandler = async (e) => {
        e.preventDefault()
        if (query.length !== 0) {
            navigate(`/search-page?query=${query}`)
        }
    }
    const firstText = "Learn Today, "
    const secondText = "Lead Tomorrow"
    const fullText = firstText + secondText;

    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
  
   
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 40); // speed of typing (ms per character)

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const beforeSpan = displayedText.slice(0, firstText.length)
  const afterSpan = displayedText.slice(firstText.length)

  
    if(isLoading) return <div></div>

    return (
        <div>
            <section className='bg-green-200 p-10 flex dark:bg-gray-800 transform transition-tranform duration-1000'>
                <div className='flex flex-col w-[50vw] transform transition-colors duration-1000'>
                    <div className='space-y-2 '>
                        <h1 className='font-semibold  text-3xl flex flex-col whitespace-normal break-words'>{beforeSpan} <span className='text-green-600 dark:text-green-500 flex text-4xl font-bold whitespace-normal break-all'>{afterSpan}</span></h1>
                        <p className='font-semibold tracking-tight '>Discover, Learn and Upskills with our wide range of courses.</p>
                    </div>
                    {/* search bar */}
                    <form onSubmit={searchCourseHandler} className="mt-16 relative">
                        <input value={query} onChange={(e) => setQuery(e.target.value)} className='p-2 rounded-xl w-[50vw]  focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-gray-700' type="text" placeholder='Course name ' />
                        <button type="submit" className='bg-green-500  text-white h-full pr-4 pl-4 rounded-r-xl  absolute right-[0px] hover:bg-green-600 transition-colors duration-300'>Search</button>
                    </form>

                </div>
            </section>


        </div>
    )
}

export default Hero
// https://cdn.fs.teachablecdn.com/4BBHjeQnGoCUnfGKAAQL