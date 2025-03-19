import style from './AccordionSidebar.css';
import div from 'next/link';


export default function AccordionSidebar({menuSubItems=["Overview","Apply App","My Residuals","My Merchants","Resources"],subitems}){
    return (
    <div className="accordion" id="accordionSubmenu">
        <div className="accordion-item border-0 ">
                <h2 className="accordion-header">
                    <button className="accordion-button accordion-button-nav collapsed  gy-4 nav-item-accordion-background"     aria-controls="collapseOne">
                         
                    <div>

                    <p className="title-accordion nav-accordion mt-4">Overview</p>
                     
                    </div>
                    </button>
                </h2>
                
               
        </div>
        <div className="accordion-item border-0 ">
            <h2 className="accordion-header">
                <button className="accordion-button accordion-button-nav collapsed nav-item-accordion-background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <div>
                        <p className="title-accordion nav-accordion"> Apply App</p>
                    </div>
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body nav-item-accordion-background">
                    <div href="#">Submenu </div> 
                </div>
            </div>
        </div>
        <div className="accordion-item  border-0 ">
            <h2 className="accordion-header ">
                <button className="accordion-button accordion-button-nav collapsed nav-item-accordion-background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        
                    <div className="title-desctiption">

                    <p className="title-accordion nav-accordion">My Residuals</p>
                    
                    </div>
                </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body nav-item-accordion-background">
                     
                    <div href="#">Submenu</div>  

                     
                </div>
            </div>
        </div>
        <div className="accordion-item  border-0">
            <h2 className="accordion-header">
                <button className="accordion-button accordion-button-nav collapsed nav-item-accordion-background" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                         
                    <div>

                    <p className="title-accordion nav-accordion">Curv POS</p>
                  
                    </div>
                </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div className="accordion-body nav-item-accordion-background">  
                <ul className="border-start border-primary nav-accordion-body list-unstyled font-weight-light">
                    <li >
                        <div href="#" >Resources</div>

                    </li>
                    <li>
                        <div href="#" >API Keys</div>

                    </li>
                </ul>

                 </div>  
            </div>
        </div>
    </div>
    );
}