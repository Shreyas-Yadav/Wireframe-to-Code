"use client";

import AppHeader from '@/app/_components/AppHeader';
import Constants from '@/data/Constants';
import axios from 'axios'
import { Loader2, LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import SelectionDetail from '../_components/SelectionDetail';
import CodeEditor from '../_components/CodeEditor';
import { get } from 'http';


export interface RECORD{
  id: number,
  desc: string,
  model: string,
  imageUrl: string,
  creadtedBy: string,
  code:any,
  uid: string
}

function ViewCode() {

    const {uid} = useParams();
    const [loading, setLoading] = useState(false);
    const [codeResp,setCodeResp] = useState('');
    const [record,setRecord] = useState<RECORD>();
    const [isReady,setIsReady] = useState(false);

    useEffect(()=>{
        uid && GetRecordInfo();
    },[uid]);

    const GetRecordInfo= async(regen = false)=>{
        setLoading(true);
        setIsReady(false);
        setCodeResp('');
        const getRecordInfo = await axios.get(`/api/wireframe-to-code?uid=${uid}`);
        const resp = getRecordInfo.data;
        setRecord(getRecordInfo.data);
        console.log('Response is: ',resp);
        
        if(resp?.code == null || regen){
            GenerateCode(resp);
        }
        else{
            setCodeResp(resp?.code?.resp);
            setLoading(false);
            setIsReady(true);
        } 
        if(resp?.error){
            console.log("No record found");
        }
    }

    const GenerateCode = async(record:any)=>{
        setLoading(true);
        const res = await fetch('/api/ai-model/',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              desc: record?.desc + ":" + Constants.PROMPT_OLD + Constants.PROMPT,
              model: record?.model,
              imageUrl: record?.imageUrl
          })
      })

      console.log('Value of res',res);
      

      if (!res.body) return;
      setLoading(false);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = (decoder.decode(value)).replace('```typescript','').replace('```javascript','').replace('```tsx','').replace('```jsx','').replace('```','').replace('javascript','').replace('typescript','').replace('tsx','').replace('jsx','');            
          setCodeResp((prev)=>prev+text);
      }
      setIsReady(true);
      UpdateCodeInDB();
    }

    useEffect(() => {
      if (codeResp != '' && record?.uid && isReady && record?.code == null) {
        UpdateCodeInDB();
      }
  }, [codeResp && record && isReady]);


    const UpdateCodeInDB = async()=>{
      
      const result = await axios.put('/api/wireframe-to-code', {
        uid: record?.uid,
        codeResp: { resp: codeResp }
    });

    console.log(result);
    

    }

        
  return (
    <div>
      <AppHeader hideSidebar={true}/>
      <div className='grid grid-cols-1 md:grid-cols-5 p-5 gap-10'>
        <SelectionDetail record={record}  isReady={isReady} regenrateCode={() => GetRecordInfo(true)}/>
        <div className='col-span-4'>
          {loading ? 
          <div className='font-bold text-2xl text-center p-20 bg-slate-100 flex items-center justify-center h-[80vh] rounded-xl'>Analyzing the wireframe<Loader2 className='animate-spin' size={50}/></div> :
          <CodeEditor codeResp={codeResp} isReady={isReady} />
          }
          
          </div>
      </div>
    </div>
  )
}

export default ViewCode
