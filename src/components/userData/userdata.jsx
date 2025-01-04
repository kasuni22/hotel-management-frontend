import axios from "axios";

function UserTag(props){

    const token = localStorage.getItem("token")

    if(token !=null){

        console.log(token)
        axios.get(import.meta.env.VITE_BACKEND_URL+"/api/users/",{
            headers :{
                Authorization :"Bearer "+token,
                "Content-Type" : "application/json"
            }
        }).then((res)=>{
            console.log(res)
        })
    }
    
    return(
        <div className="absolute right-0 flex items-center cursor-pointer mr-2">
            <img 
            className='rounded-full w-[75px] h-[75px] '
            src={props.imageLink}
            />
            <span className='text-white ml-[5px] text-xl '>
                {props.name}</span>
        </div>
    );
}

export default UserTag;