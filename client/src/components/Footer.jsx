import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='bg-green-200 dark:bg-gray-950 dark:text-gray-400 '>
            <div className="container sm:flex  justify-between mx-auto pt-6 pb-8 md:pl-10 pl-3 md:pr-10 pr-3 whitespace-normal break-words">

                <div className="flex flex-col gap-5 ">
                    <div className='flex flex-col'>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500/70 bg-clip-text text-transparent ">
                            LearnSphere
                        </span>

                        <span className="text-xs text-gray-500 -mt-1">
                            Learning Management
                        </span>
                    </div>
                    <p className='text-gray-700 dark:text-gray-400'>Practical-based learning 
                        <br /> <span className='text-gray-700 dark:text-gray-400'>to enhance-skills</span></p>
                    <h3 className='font-bold text-xl'>Follow us</h3>
                </div>

                <div className='flex flex-col  gap-4 sm:gap-5 mt-5 sm:mt-1'>
                    <h2 className='font-bold text-xl '>Resources</h2>
                    <div className=''>
                        <ul className='space-y-1'>
                            <li className=''>Home</li>
                            <li className=''>courses</li>
                            <li className=''>DashBoard</li>
                            <li className=''>Terms & conditions</li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col gap-4 sm:gap-5 mt-5 sm:mt-1'>
                    <h2 className='font-bold text-xl'>Contact</h2>
                    <ul className='space-y-4 '>
                        <li className='sm:flex gap-2 '><Phone /> +91 7044238492</li>
                        <li className='sm:flex break-all gap-2'><Mail />danyalarman15@gmail.com</li>
                        <li className='sm:flex gap-2'><MapPin />Saltlake Sector-V, kolkata</li>
                    </ul>
                </div>


            </div>

        </footer>
    )
}

export default Footer



