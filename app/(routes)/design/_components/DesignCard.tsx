import { RECORD } from '@/app/view-code/[uid]/page'
import { Button } from '@/components/ui/button'
import Constants from '@/data/Constants'
import { Code } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function DesignCard({item}:any) {

   const modelList = Constants.AiModelList.find((ele)=>ele.name==item?.model) 

  return (
    <div className='p-5 border rounded-lg'>
        <Image className='object-contain w-full h-[200px]' src={item?.imageUrl} alt='Image' width={300} height={200}/>
        <div className='flex flex-col items-stretch gap-2'>
            <h2 className='line-clamp-3 mb-1 truncate'>
                {item?.desc}
            </h2>
            <div className='flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-lg'>
                {modelList && <Image src={modelList?.icon} alt={modelList?.modelName} width={30} height={80}/>}
                <Link href={'/view-code/'+item?.uid}>
                    <Button className='bg-yellow-500'><Code/> View Code</Button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DesignCard