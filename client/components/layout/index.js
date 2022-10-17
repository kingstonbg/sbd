import Navbar from '../navbar/index';
import Footer from '../footer/index';
import Countdown from '../countdown';

export default function Layout({ children }) {
	return (
		<>
			<Navbar />
			<Countdown />
			<div className="sm:container mx-auto my-5 min-h-screen">
				<main>{children}</main>
			</div>
			<Footer />
		</>
	);
}
