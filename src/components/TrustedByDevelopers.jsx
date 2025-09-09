import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
	{
		name: 'Sarah Chen',
		title: 'Lead Engineer, TechCorp',
		quote:
			'"DevFlow reduced our API development time by 70%. The automatic scaling handled our traffic spikes flawlessly during our product launch."',
		avatar: 'https://i.pravatar.cc/150?u=sarahchen',
	},
	{
		name: 'Carlos Rodriguez',
		title: 'CTO, StartupX',
		quote:
			'"With DevFlow, we built and deployed our entire API infrastructure in a single day. The built-in auth and database integrations saved us months of work."',
		avatar: 'https://i.pravatar.cc/150?u=carlosrodriguez',
	},
	{
		name: 'Priya Patel',
		title: 'Indie Developer',
		quote:
			'"As a solo developer, DevFlow’s free tier gave me everything I needed to launch my side project. The community has been incredibly helpful whenever I got stuck."',
		avatar: 'https://i.pravatar.cc/150?u=priyapatel',
	},
	{
		name: 'Alex Johnson',
		title: 'DevOps Specialist, Cloud Innovations',
		quote:
			"\"The CI/CD integration is seamless. We've automated our entire deployment pipeline with DevFlow, and it's been a game-changer for our team's productivity.\"",
		avatar: 'https://i.pravatar.cc/150?u=alexjohnson',
	},
	{
		name: 'Maria Garcia',
		title: 'Backend Developer, FinTech Solutions',
		quote:
			'"I was impressed by the detailed documentation and the quick support response. DevFlow made it easy to build a secure and scalable financial API."',
		avatar: 'https://i.pravatar.cc/150?u=mariagarcia',
	},
	{
		name: 'David Kim',
		title: 'Full-stack Developer, eComm Hub',
		quote:
			'"As a full-stack dev, I appreciate how DevFlow simplifies backend development. I can focus on building great user experiences without worrying about server management."',
		avatar: 'https://i.pravatar.cc/150?u=davidkim',
	},
];

const TrustedByDevelopers = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
						Trusted by developers worldwide
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
						Teams and individual developers use DevFlow to speed up their
						development cycle and scale reliably.
					</p>
				</div>
				<div className="mt-10">
					<Slider {...settings}>
						{testimonials.map((testimonial, index) => (
							<div key={index} className="p-4">
								<div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md">
									<div className="mb-4 flex items-center">
										<div className="flex-shrink-0">
											<img
												className="h-12 w-12 rounded-full object-cover"
												src={testimonial.avatar}
												alt={`Avatar of ${testimonial.name}`}
											/>
										</div>
										<div className="ml-4">
											<h3 className="text-lg font-semibold text-gray-900">
												{testimonial.name}
											</h3>
											<p className="text-sm text-gray-500">
												{testimonial.title}
											</p>
										</div>
									</div>
									<p className="flex-grow text-gray-600">{testimonial.quote}</p>
								</div>
							</div>
						))}
					</Slider>
				</div>
				<div className="mt-16 text-center">
					<p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
						Trusted by companies of all sizes
					</p>
					<div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-6">
						{[...Array(6)].map((_, index) => (
							<div key={index} className="flex justify-center">
								<div className="flex h-12 w-24 items-center justify-center rounded-md bg-gray-200 text-xs text-gray-400">
									LOGO
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TrustedByDevelopers;
