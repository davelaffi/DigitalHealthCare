
export abstract class User {
    
    public email: string;
    public CF: string;
    public uid: string;
    public photoURL: string;
    public emailVerified: boolean;
    public userType : string; //Andre per farlo andare nel tuo metti che se userType == "user" allora true else false

    constructor(){
        this.email = "";
        this.CF = "";
        this.uid = "";
        this.photoURL = "";
        this.emailVerified = false;
        this.userType = "";
    }
}