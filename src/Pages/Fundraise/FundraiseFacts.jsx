import React from "react";
import "./FundraiseFacts.css";

const faqs = [
	{
		question: "What is Impactify?",
		answer:
			"Impactify is a civic engagement platform that helps people discover events, campaigns, and donation opportunities that move the needle on issues they care about. It brings actions into one place so you can spend less time searching and more time making change.",
	},
	{
		question: "How are campaigns and events chosen?",
		answer:
			"Campaigns and events are curated around themes like climate, democracy, and humanitarian relief. The focus is on legitimacy, alignment with Impactify’s mission, and opportunities where individual action can make a meaningful difference.",
	},
	{
		question: "What happens when I donate?",
		answer:
			"When you give, your contribution is directed to the organizers or partner organizations behind the campaign. Impactify’s role is to connect you to vetted opportunities and provide a clear, easy-to-use experience for supporting them.",
	},
	{
		question: "Do I need an account to participate?",
		answer:
			"You can browse and discover public events without an account. Creating an account unlocks more features over time, such as saving events, receiving tailored updates, and tracking the actions you’ve taken.",
	},
	{
		question: "How does Impactify handle my data?",
		answer:
			"Only the minimum information needed to run the platform and keep your experience secure is collected. Personal data is never sold, and privacy and consent are treated as core design requirements, not afterthoughts.",
	},
	{
		question: "Why was Impactify created?",
		answer:
			"Impactify was built as a solo project with a bigger purpose: to lower the friction between caring about an issue and doing something tangible about it. It’s designed for people who want their time, skills, and resources to add up to more than a single moment.",
	},
];

const FundraiseFacts = () => {
	return (
		<div className="facts-background">
			<div className="facts-overlay">
				<section
					className="facts-header"
					aria-labelledby="faq-heading"
				>
					<h1 id="faq-heading" className="facts-title">
						Questions, answered with purpose
					</h1>
					<p className="facts-subtitle">
						This FAQ isn&apos;t about vanity stats. It&apos;s about why Impactify exists, how it
						works, and how your actions connect to something bigger.
					</p>
				</section>

				<section
					className="faq-section"
					aria-label="Frequently asked questions about Impactify"
				>
					<div className="faq-grid">
						{faqs.map((item) => (
							<details key={item.question} className="faq-item">
								<summary className="faq-question">
									<span>{item.question}</span>
									<span className="faq-chevron" aria-hidden="true">
										+
									</span>
								</summary>
								<p className="faq-answer">{item.answer}</p>
							</details>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};

export default FundraiseFacts;