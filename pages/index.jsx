import Jumbotron from '@/components/jumbotron/Jumbotron';
import AccordionSidebar from '@/components/sidebar/AccordionSidebar';
// import Witget from '@/components/progressSteps/Witget';
import SidebarSubmenu from '@/components/sidebar/SidebarSubmenu';
import Home from '../src/components/blog/shared-theme/page';
import Blog from './blog/Blog';


export default function Index() {
    console.log(Home)
	return (
		<div >
			 {/* <SidebarSubmenu name="J D"/> */}
			 {/* <AccordionSidebar/> */}
			 <Blog />
			  
		</div>
	);

}