"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';
import { Loader2Icon, Sparkle } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function AddNewCourseDialog({ children }) {

const [loading,setLoading]=useState(false);
const [formData,setFormData] = useState({
    name:'',
    description:'',
    includeVideo:false,
    noOfChapter:1,
    category:'',
    level:''
});
const router = useRouter();


const onGenerate = async () => {
  
  try {
    console.log(formData);
    const courseId = uuidv4();
    setLoading(true);

    const result = await axios.post('/api/generate-course-layout', {
      ...formData,
      courseId: courseId,
    });

     console.log('API Response:', result.data);
     router.push('/workspace/edit-course/' + result.data?.courseId);
     
  } catch (error) {
    
    console.error('Error generating course layout:', error);
    
  } finally {

    setLoading(false);
  }
};

const onHandleInputChange=(field,value)=>{
    setFormData(prev=>({
        ...prev,
        [field]:value
    }));
    console.log(formData)
}

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-4 mt-3">
              <div>
                <label>Course Name</label>
                <Input placeholder="Course Name" onChange={(event)=>onHandleInputChange('name',event?.target.value)}/>
              </div>
              <div>
                <label>Course Description (Optional)</label>
                <Textarea placeholder="Course Description"
                onChange={(event)=>onHandleInputChange('description',event?.target.value)}
                 />
              </div>
              <div>
                <label>No. of Chapters</label>
                <Input placeholder="No. of Chapters" type="number" 
                onChange={(event)=>onHandleInputChange('noOfChapters',event?.target.value)}
                />
              </div>
              <div className="flex gap-3 items-center">
                <label>Include Video</label>
                <Switch 
                onCheckedChange={()=>onHandleInputChange('includeVideo',!formData?.includeVideo)} />
              </div>
              <div>
                <label>Difficulty Level</label>
                <Select onValueChange={(value)=>onHandleInputChange('level',value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label>Category</label>
                <Input placeholder="Category(Separated by Comma)"
                onChange={(event)=>onHandleInputChange('category',event?.target.value)}
                />
              </div>
              
              <div className="mt-5">
               <Button className="w-full bg-cyan-800" onClick={onGenerate} disabled={loading}>
                {loading ? <Loader2Icon className="animate-spin" /> :
                <Sparkle />} Generate Course
               </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;


// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import axios from "axios";
// import { Loader2Icon, Sparkle } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

// export default function AddNewCourseDialog({ children }) {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     includeVideo: false,
//     noOfChapters: 1, // ✅ fixed key name
//     category: "",
//     level: "",
//   });

//   const router = useRouter();

//   const onGenerate = async () => {
//     try {
//       console.log("Form Data:", formData);
//       const courseId = uuidv4();
//       setLoading(true);

//       const result = await axios.post("/api/generate-course-layout", {
//         ...formData,
//         courseId,
//       });

//       console.log("API Response:", result.data);
//       router.push(`/workspace/edit-course/${result.data?.courseId}`);
//     } catch (error) {
//       console.error("Error generating course layout:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onHandleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>{children}</DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Create New Course Using AI</DialogTitle>
//           <DialogDescription asChild>
//             <div className="flex flex-col gap-4 mt-3">
//               {/* Course Name */}
//               <div>
//                 <label>Course Name</label>
//                 <Input
//                   placeholder="Enter course name"
//                   onChange={(e) => onHandleInputChange("name", e.target.value)}
//                 />
//               </div>

//               {/* Description */}
//               <div>
//                 <label>Course Description (Optional)</label>
//                 <Textarea
//                   placeholder="Enter course description"
//                   onChange={(e) =>
//                     onHandleInputChange("description", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Chapters */}
//               <div>
//                 <label>No. of Chapters</label>
//                 <Input
//                   placeholder="Number of chapters"
//                   type="number"
//                   min={1}
//                   onChange={(e) =>
//                     onHandleInputChange("noOfChapters", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Include Video */}
//               <div className="flex gap-3 items-center">
//                 <label>Include Video</label>
//                 <Switch
//                   checked={formData.includeVideo}
//                   onCheckedChange={() =>
//                     onHandleInputChange("includeVideo", !formData.includeVideo)
//                   }
//                 />
//               </div>

//               {/* Difficulty Level */}
//               <div>
//                 <label>Difficulty Level</label>
//                 <Select
//                   onValueChange={(value) => onHandleInputChange("level", value)}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select difficulty level" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="beginner">Beginner</SelectItem>
//                     <SelectItem value="moderate">Moderate</SelectItem>
//                     <SelectItem value="advance">Advance</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Category */}
//               <div>
//                 <label>Category</label>
//                 <Input
//                   placeholder="e.g. Web Development, AI, Java"
//                   onChange={(e) =>
//                     onHandleInputChange("category", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Generate Button */}
//               <div className="mt-5">
//                 <Button
//                   className="w-full bg-cyan-800 text-white"
//                   onClick={onGenerate}
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <Loader2Icon className="animate-spin" />
//                   ) : (
//                     <Sparkle className="mr-2" />
//                   )}
//                   {loading ? "Generating..." : "Generate Course"}
//                 </Button>
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//       </DialogContent>
//     </Dialog>
//   );
// }
