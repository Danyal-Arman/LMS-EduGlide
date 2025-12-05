import { useNavigate } from 'react-router-dom'

const Lecture = ({ lecture, index, courseId }) => {
    const navigate  = useNavigate()
    const lectureId = lecture._id
    
    return (
        <div className='w-full bg-gray-100 flex justify-between rounded-lg  dark:bg-gray-800 items-center'>
            <h1 className=' p-2 rounded-lg dark:text-gray-300 font-semibold '><span className='font-semibold'>Lecture- {index + 1}</span>: {lecture?.lectureTitle}</h1>
            
            <lord-icon
                onClick={() => navigate(`/admin/course/lecture/${courseId}/${lectureId}`)}
                src="https://cdn.lordicon.com/fikcyfpp.json"
                trigger="hover"
                stroke="bold"
                style={{ width: '40px', height: '38px'  }}
            ></lord-icon>
        </div>
    )
}

export default Lecture
