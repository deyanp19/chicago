import Accordion from "@/components/accordion/Accordion";
import Clock from "@/components/clock/Clock";
import Jumbotron from "@/components/jumbotron/Jumbotron";
import Witget from "@/components/progressSteps/Witget";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarSubmenu from "@/components/sidebar/SidebarSubmenu";

export default function Training() {
    const text=" In tierd pricing, each credit card transaction falls into a pricing category: qualified, mid-qualified, and non -qualified. Qaalified reates are the lowest and you might think that most of your credit card transaction s fall into the qualified category. Not so! Downgrades can occur for several reasons, including, but not limited to :"
    const title="Payarc Training";
    const image="/images/Payarc-scroll.png";

    return (
        <div className="container-fluid">
            <div className="row">

                <div className="col-3">

                <SidebarSubmenu name="Jhon Doe" />
                </div>
                <div className="col-9">
                    <Clock />
                    <div className="row">

                    <div className="col-8">
                    <Jumbotron title={title} text={text} image={image}/>
                    <Accordion />
                    </div>
                    <div className="col-4">
                        <Witget />
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}