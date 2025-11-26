import {prisma} from "@/app/lib/prisma";


export async function POST(request: Request){

  try{

   const {Key} = await request.json();
    
   if(!Key){ 
    
      return new Response("Key is Required", {status:400});
   }


   try{

       await prisma.visit_data.update({
        
          where:{id:Key},
          data:{totalVisitors:{increment:1}

       }});

       return  Response.json({ok:true})

    }catch(error){
         return Response.json({ok:false, error:"Domain name not found"}, {status:404});

    }

   }catch(error){

      return Response.json({ok:false, error:"Something went wrong"}, {status:500});

   }


}
