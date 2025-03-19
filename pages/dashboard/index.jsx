import Accordion from "@/components/accordion/Accordion";
import Card from "@/components/card/Card";
import Clock from "@/components/clock/Clock";
import Jumbotron from "@/components/jumbotron/Jumbotron";
import Witget from "@/components/progressSteps/Witget";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarSubmenu from "@/components/sidebar/SidebarSubmenu";


export default function Dashboard() {
    const text=`We are technology-driven company built for business. We know the challenges of starting and managing a business, so we embarked on a journey to provide smart and simple payment processing tools and products. dolorum voluptatem esse nesciunt ea ullam cupiditate incidunt! Alias ea dolore eius, odio molestias qui sint dolorem!
    
    We are dedicated to empowering businesses to improve thier organization - on e payment at a time. 
    `
    const title="Payarc Overview";
    const image="/images/Payarc-logo-tilted.png";

  const cardData=[
    {title:"Payarc Terminals",text:"Ever wondering about those mysterious NABA fees on your statement?"},{title:"Payarc + Curv",text:"Ever wondering about those mysterious NABA fees on your statement?"},{title:"Payarc Banks",text:"Ever wondering about those mysterious NABA fees on your statement?"}
  ]


    return(
       <div className="container-fluid">

         <div className="row gx-1">
           <div className="col-3">
            <SidebarSubmenu name="Jhon Doe" />
            
           </div>
           <div className="col-9">

              <Clock />
              <Jumbotron title={title} text={text} image={image}/>
              <div className="row d-flex justify-content-between">

              {cardData.map((x,i)=><div className="col-4 mt-5" key={x.title.charAt()+i}> 
              {console.log(x.title.charAt()+i)}
              <Card title={x.title} text={x.text}/></div>)}

              </div>
           </div>
          

         </div>

       
        {/* <Witget /> */}
        </div>
    );
}