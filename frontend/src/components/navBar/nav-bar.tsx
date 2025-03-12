
import NavBarIcon from "./nav-bar-icon"

export default function Navbar(){

    return (
        <div className="nav w-1/2 h-[10%] flex flex-row gap-4 justify-around  items-center left-1/4 top-4 rounded-md  fixed">
            <NavBarIcon  ref="movimentacoes" iconPath="/navbar/transfer-svgrepo-com.svg"/>
            <NavBarIcon  ref="guardas" iconPath="/navbar/security-guard-svgrepo-com.svg"/>
            <NavBarIcon  ref="unidades" iconPath="/navbar/security-shield-svgrepo-com.svg"/>
            <NavBarIcon  ref="armas" iconPath="/navbar/automatic-gun-svgrepo-com.svg"/>
            <NavBarIcon  ref="equipes" iconPath="/navbar/team-svgrepo-com.svg"/>
            <NavBarIcon  ref="usuario" iconPath="/navbar/user-icon-svgrepo-com.svg"/>
            <NavBarIcon  ref="logout" iconPath="/navbar/log-out-outlined-svgrepo-com.svg"/>
        </div>
    )
}