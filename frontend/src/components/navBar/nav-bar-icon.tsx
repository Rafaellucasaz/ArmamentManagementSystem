
interface NavBarIconProps {
    ref:string;
    iconPath:string;
}

export default function NavBarIcon({ref,iconPath}:NavBarIconProps) {
    
    return (
        <a href={`/${ref}`} className="nav-item w-1/12 h-3/4 flex items-center  justify-center px-2 rounded-sm">
            <img src={iconPath} alt={ref} className="w-8 h-8"/>
        </a>
    )
}