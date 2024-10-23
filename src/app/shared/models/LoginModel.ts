//why class here cause i gonna bind it with a form ! not just use it like previous interfaces
//TODO : see why the class need to be delcared with a ! or a constructor ? in previous version of angular it wasn t this exigent
export class LoginModel {
  UserName!: string;
  UserPassword!: string;
}
