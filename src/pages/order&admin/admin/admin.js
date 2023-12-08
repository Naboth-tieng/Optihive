import CreateUserForm from "../../login/signup";
import Icon from '../svgs/logo.svg'
import logout from '../svgs/logout.svg'

export default function Admin({back,user} ){
    return(
        <>
        <div style={{display:"flex", height:"100vh"}}>
        <div className="admin-left" style={{width:"20%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <img src={Icon} style={{width:"50%"}} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p className="profile" style={{backgroundColor:"rgba(253, 242, 138, 0.93)", border:'2px solid white',color:"white"}}>{user.username.charAt(0)}</p>
            <p style={{fontSize:"1.125rem",fontWeight:"bolder"}}>{user.username}</p>
            <p style={{fontSize:"0.875rem"}}>{user.userType}</p>
          </div>
          <button className="signout" onClick={back}>
            <img src={logout}/>
          </button>
        </div>
        <div className="admin-right" style={{width:"80%"}}>
        <CreateUserForm/>

        </div>
        </div>
        
        </>
    )
}