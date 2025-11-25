import {prisma} from "../../lib/prisma";


export async function POST(request:Request){

    const {domainName} = await request.json();
    
    if(!domainName){

        return  Response.json({error:"Domain name is required"}, {status:400});
    }

    try{

     const {id} = await prisma.visit_data.create({data:{domainName:domainName}});

     return new Response(JSON.stringify({"id":id}));

    }catch(error){
        
        return  Response.json({error:"Domain Name allredy in taken"},{status:500});
    }
    

}