"use client"

import { useAuthContext } from '@/app/provider';
import axios from 'axios';
import React, {useState, useEffect } from 'react'
import DesignCard from './_components/DesignCard';


function Design() {
    const {user} = useAuthContext();
    const [wireframeList,setWireframeList] = useState([]);


    useEffect(()=>{
        user && getAllUserWireFrames();
    },[user]);

    const getAllUserWireFrames = async ()=>{
        const res = await axios.get('/api/wireframe-to-code?email='+user?.email);
        console.log(res);
        setWireframeList(res.data);
    }

  return (
    <div>
        <h2 className='font-bold text-2xl'>Wireframe and code</h2>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-10'>
            {wireframeList?.map((item,index)=>
                <DesignCard key={index} item={item}/>
            )}
        </div>
    </div>
  )
}

export default Design