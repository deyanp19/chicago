 
import {useState} from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import style from './Sidebar.css';
import Link from 'next/link'

const leftArrow=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="violet" className="bi bi-caret-left" viewBox="0 0 16 16">
  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z"/>
</svg>
const rightArrow=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="darkBlue" className="bi bi-caret-right" viewBox="0 0 16 16">
  <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
</svg>
    const downloadIcon=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-cloud-arrow-down-fill" viewBox="0 0 16 16">
    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 6.854-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5a.5.5 0 0 1 1 0v3.793l1.146-1.147a.5.5 0 0 1 .708.708z"/>
    </svg>
    const tools=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-tools" viewBox="0 0 16 16">
    <path d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z"/>
  </svg>
  const textIcon=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-file-text-fill" viewBox="0 0 16 16">
  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z"/>
</svg>
  const easel3=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-easel3-fill" viewBox="0 0 16 16">
  <path d="M8.5 12v1.134a1 1 0 1 1-1 0V12h-5A1.5 1.5 0 0 1 1 10.5V3h14v7.5a1.5 1.5 0 0 1-1.5 1.5h-5Zm7-10a.5.5 0 0 0 0-1H.5a.5.5 0 0 0 0 1h15Z"/>
</svg>
const link=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-link-45deg" viewBox="0 0 16 16">
<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
</svg>
const payarcIcon=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-p-square-fill" viewBox="0 0 16 16">
<path d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97H8.27Z"/>
<path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5V4.002Z"/>
</svg>
const grid=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-grid-fill" viewBox="0 0 16 16">
<path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
</svg>

const searchIcon=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-search" viewBox="0 0 16 16">
<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>
const calendar=<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zm-2.6 5.854a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
</svg>
const Sidebar=({name})=>{

    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
  
    return (
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}   shadow-sm p-3 mb-5 bg-body-tertiary rounded`}>
          
          <div className="toggle" onClick={toggleSidebar}>
            <img src="/images/Payarc-logo.png" alt="" className="logo" />
            <span className="icon">{collapsed ? '' : leftArrow  }</span>
          </div>
          <ul className= "nav flex-column " >
            <li className= "nav-item" >
              <Link   href="/dashboard">
                {grid}
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className= "nav-item" >
              <a className={style["nav-link"]} href="#">
                {link}
                {!collapsed && <span>My Payarc</span>}
              </a>
            </li>
            <li className= "nav-item" >
              <a className={style["nav-link"]} href="#">
               {payarcIcon}
                {!collapsed && <span>About Payarc</span>}
              </a>
            </li>
            <li className="nav-item">
              <Link className={style["nav-link"]} href="/training">
                {easel3}
                {!collapsed && <span>Payarc Training</span>}
              </Link>
            </li>
            <li className="nav-item">
              <a className={style["nav-link"]} href="#">
              {calendar}
                {!collapsed && <span>Induustry Training</span>}
              </a>
            </li>
            <li className="nav-item">
              <a className={style["nav-link"]} href="#">
              {downloadIcon}
                {!collapsed && <span>Marketing Materials</span>}
              </a>
            </li> 
            <li className="nav-item">
              <a className={style["nav-link"]} href="#">
                {textIcon}
                {!collapsed && <span>Marketing Request Forms</span>}
              </a>
            </li>
            <li className="nav-item">
              <a className={style["nav-link"]} href="#">
                {tools}
                {!collapsed && <span>Access to tools</span>}
              </a>
            </li>
          </ul>
      <div className="search">

          <span className="input-group-text">{searchIcon}</span>
          {!collapsed && <input type="text" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-button"/>}
          
    
      </div>
      
      <div className="d-flex align-items-center avatar">
        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" >
          <span className="h4 m-0 name">{name.split(' ').map(n=>n.charAt())}</span>
        </div>
        {!collapsed && <span className="ml-2 name nameUnderlined">{name}</span>}
      </div>

</div>

     

       
    )    
}

export default Sidebar;