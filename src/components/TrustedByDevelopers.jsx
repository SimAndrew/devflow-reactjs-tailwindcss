import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
	return (
		<section className="bg-gray-50 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900">
						Trusted by developers worldwide
					</h2>
				</div>
				<div className="mt-10">
					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						pagination={{
							clickable: true,
						}}
						breakpoints={{
							768: {
								slidesPerView: 2,
								spaceBetween: 40,
							},
							1024: {
								slidesPerView: 3,
								spaceBetween: 50,
							},
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						{testimonials.map((testimonial, index) => (
							<SwiperSlide key={index}>
								<div className="h-full rounded-lg bg-white p-6 shadow-md">
									<div className="mb-4 flex items-center">
										<div className="flex-shrink-0">
											<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
												{/* Placeholder for avatar image */}
											</div>
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
									<p className="text-gray-600">{testimonial.quote}</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className="mt-16 text-center">
					<p className="text-sm font-semibold tracking-wider text-gray-500">
						TRUSTED BY COMPANIES OF ALL SIZES
					</p>
					<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
						{[...Array(6)].map((_, index) => (
							<div key={index} className="h-12 w-24 rounded-md bg-gray-200">
								{/* Placeholder for company logo */}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default TrustedByDevelopers;
