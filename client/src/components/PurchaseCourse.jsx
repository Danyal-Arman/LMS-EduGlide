import { useCreateOrderMutation } from '@/features/api/paymentApi';
import { Loader2, Loader } from 'lucide-react';
import React from 'react'

const PurchaseCourse = ({handlePayment ,isLoading}) => {


  return (
    <button onClick={handlePayment} className=' flex bg-gradient-to-r w-full justify-center gap-4  text-white rounded-md px-2 py-2  hover:scale-105 transition-transform duration-500 will-change-transform'>{isLoading?  (<><Loader className="animate-spin text-white "/>Please Wait</>) :  ("Purchase Course")   }</button>

  )
}

export default PurchaseCourse
