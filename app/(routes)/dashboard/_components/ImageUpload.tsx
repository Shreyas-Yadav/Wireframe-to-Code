"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Sparkle, X } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { storage } from "@/configs/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function ImageUpload() {
  const AiModelList = [
    {
      name: "gemini",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    },
    {
      name: "llama",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg",
    },

  ];

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>();
  const [model,setModel] = useState<string>();
  const [desc,setDesc] = useState<string>();

  const OnImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    const files = event.target.files;
    if (files) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  };

  const OnConvertToCodeButtonClick = async () => {


    if(!file || !model || !desc){
        alert('Please fill all the fields');
        return;
    }

    const fileName = Date.now() + ".png";
    const imageRef = ref(storage,"wireframe_images/" + fileName);
    await uploadBytes(imageRef,file)
    .then(resp => console.log('Image Uploaded'));
    
    const imageUrl = await getDownloadURL(imageRef);
    console.log(imageUrl);
    
    
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col justify-center items-center">
            <CloudUpload className="h-10 w-10 mx-auto" />
            <h2 className="text-lg font-semibold mt-2">Upload Image</h2>
            <p className="text-sm text-gray-400 mt-2">Add your image here</p>
            <div className="p-5 mt-7 w-full flex justify-center border border-dashed rounded-md">
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-primary text-white rounded-md px-5">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              type="file"
              multiple={false}
              className="hidden"
              id="imageSelect"
              onChange={OnImageSelect}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed ">
            <X
              className="h-5 w-5 float-right cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            />
            <Image
              src={previewUrl}
              alt="preview Image"
              width={550}
              height={550}
              className="w-full h-[300px] object-center"
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg m-1">Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelList.map((model, index) => (
                <SelectItem className="mt-2" key={index} value={model.name}>
                    <div className="flex items-center gap-2">
                        <Image
                            src={model.icon}
                            alt={model.name}
                            width={30}
                            height={30}
                        />
                    <h2>{model.name}</h2>
                    </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <h2 className="font-bold text-lg mt-3">Enter Desc</h2>
          <Textarea
            className="mt-3 h-[200px]"
            placeholder="Write about your webpage"
            onChange={(e) => setDesc(e?.target.value)}
          />
        </div>
      </div>
      <div className="mt-5 flex justify-center">
        <Button onClick={OnConvertToCodeButtonClick}>
          {" "}
          <Sparkle></Sparkle> Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
