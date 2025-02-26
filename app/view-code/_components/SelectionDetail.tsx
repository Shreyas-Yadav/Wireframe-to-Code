
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import React, { use, useEffect } from 'react'

function SelectionDetail({record,regenrateCode,isReady}:any) {
  return(
    <div className='p-2 bg-gray-200 rounded-lg'>
      <h2 className='font-bold my-2'>Wireframe</h2>
      {record?.imageUrl && <Image src={record?.imageUrl} className='rounded-lg object-fill p-2' alt='Wireframe' width={700} height={500} />}

      <h2 className='font-bold my-2 mt-4'>AI Model</h2>
      <Input className='bg-white' disabled={true} defaultValue={record?.model}/>

      <h2 className='font-bold my-2 mt-4'>Description</h2>
      <Textarea className='bg-white h-[100px]' disabled={true} defaultValue={record?.desc}/>

      <Button className='mt-7 flex justify-center items-center w-50' disabled={!isReady} onClick={regenrateCode}>Regenarte Code</Button>
    </div>
  )
}

export default SelectionDetail;
