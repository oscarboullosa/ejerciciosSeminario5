import { request, Request,Response } from "express";
import { insertUser,getUsers,getUser,updateUser,deleteUser,getSubjectsByUserId,getUsersByLastNameAndSemester} from "../services/user";
import { handleHttp } from "../utils/error.handle";

const getPerson=async({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await getUser(idUser);
        const data=response ? response:"NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res,"ERROR_GET_USER");
    }
};

const getPeople=async(req:Request,res:Response)=>{
    try{
        const response=await getUsers();
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_GET_USERS");
    }
};

const updatePerson=async ({params,body}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await updateUser(idUser,body);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_UPDATE_USER");
    }
};

const postPerson=async ({body}:Request,res:Response)=>{
    try{
        const responsePerson=await insertUser(body);
        res.send(responsePerson);
    }catch(e){
        handleHttp(res,"ERROR_POST_USER");
    }
};

const deletePerson=async ({params}:Request,res:Response)=>{
    try{
        const {idUser}=params;
        const response=await deleteUser(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_DELETE_USER");
    }
};

const giveMeSubjects=async({params}:Request,res:Response)=>{
    try{
        
        const {idUser}=params;
        const response=await getSubjectsByUserId(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res,"ERROR_OBTAINING_SUBJECTS");
    }
}

const answerMyQuestion=async ({body}:Request,res:Response)=>{
    try {
        const { lastName,semester } = body;
        const responsy=await getUsersByLastNameAndSemester(lastName,semester);
        res.send(responsy);
    } catch (e) {
        handleHttp(res,"ERROR_ANSWERING");
    }
}



export{getPerson,getPeople,postPerson,updatePerson,deletePerson,giveMeSubjects,answerMyQuestion};