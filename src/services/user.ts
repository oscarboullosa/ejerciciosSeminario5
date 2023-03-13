//In charge to connect with the dB
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import SubjectModel from "../models/subject";
import { Types } from "mongoose";

const insertUser = async(item: User) => {
    const responseInsert = await UserModel.create(item);
    return responseInsert;
};

const getUsers = async() => {
    const responseItem = await UserModel.find({});
    return responseItem;
};

const getUser = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const updateUser = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const deleteUser = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}
const getSubjectsByUserId = async (idUser: string) => {
    // Busca el usuario con el ID especificado
    const user = await UserModel.findById(idUser);
  
    // Si el usuario no existe, retorna un error
    if (!user) {
      throw new Error("User not found");
    }
  
    // Busca todas las asignaturas que tengan el ID del usuario en su array de usuarios matriculados
    const subjects = await SubjectModel.find({ users: idUser });
  
    return subjects;
  };


  const getUsersByLastNameAndSemester = async (lastName: string, semester: number): Promise<User[]> => {
    const subjects = await SubjectModel.find({ semester });
  
    const users = await Promise.all(subjects.map(async (subject) => {
      const usersInSubject = await UserModel.find({ _id: { $in: subject.users } });
      return usersInSubject.filter((user) => user.surname === lastName);
    }));
  
    return users.reduce((acc, usersInSubject) => acc.concat(usersInSubject), []);//Por si se diese el caso de que se apellidan igual dos personas y estan en el mismo semestre o alguna cosa asi mas o menos rara
//     En resumen esto sería un poco el:
//     SELECT * FROM tabla_de_personas
// WHERE apellido = 'Garcia' AND semestre = 8; en SQL
  };
  
export {insertUser, getUser, getUsers, updateUser, deleteUser,getSubjectsByUserId,getUsersByLastNameAndSemester};
