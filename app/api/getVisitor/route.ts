import {prisma} from "../../lib/prisma";
import {NextRequest} from "next/server"


export async function GET(request: NextRequest){

 try{
   const { searchParams } = new URL(request.url);
  const domainName = searchParams.get("domainName");
    // const {domainName} = await request.json();
 
    if(!domainName){
        
        return Response.json("Domain name is required",{status:400});
    }


    try{

        const totalVisitors = await prisma.visit_data.findUnique({
            where:{domainName:domainName},
            select:{totalVisitors:true}
        })

        return Response.json({ok:true, totalVisitors:totalVisitors?.totalVisitors || 0});

    }catch(error){

        return Response.json({ok:false, error:"Domain name not found"}, {status:404});

    }


 } catch(error){

    return Response.json({ok:false, error:"Something went wrong"}, {status:500});
 }

}