//Configuration for the parallax effect, detailing settings screen sizes to achieve desired effect.

const ParallaxConfig = {
	// xs not done
	xs: {
		parallax: {
			pages: 4,
		},
		firstPage: {
			offset: 0.7,
			speed: 0,
			factor: 1.4,
		},
		secondPage: {
			offset: 1.6,
			speed: 0,
			factor: 0.9,
		},
		thirdPage: {
			offset: 2.21,
			speed: 0,
			factor: 0.5,
		},
		fourthPage: {
			offset: 2.65,
			speed: 0,
			factor: 1.4,
		},
		footer: {
			offset: 3.658,
			factor: 1,
		},
	},
	//  ------------------- small ------------------//
	s: {
		parallax: {
			pages: 4,
		},
		firstPage: {
			offset: 0.7,
			speed: 0,
			factor: 1.4,
		},
		secondPage: {
			offset: 1.7,
			speed: 0,
			factor: 1,
		},
		thirdPage: {
			offset: 2.3,
			speed: 0,
			factor: 1,
		},
		fourthPage: {
			offset: 2.9,
			speed: 0,
			factor: 1,
		},
		footer: {
			offset: 3.9,
			factor: 1,
		},
		//  ------------------- medium ------------------//
	},
	//  ------------------- medium ------------------//
	m: {
		parallax: {
			pages: 4.5,
		},
		firstPage: {
			offset: 0.7,
			speed: 0,
			factor: 1.4,
		},
		secondPage: {
			offset: 1.6,
			speed: 0,
			factor: 0.9,
		},
		thirdPage: {
			offset: 2.34,
			speed: 0,
			factor: 0.8,
		},
		fourthPage: {
			offset: 2.8,
			speed: 0,
			factor: 1.2,
		},
		footer: {
			offset: 4.0,
			factor: 0.5,
		},
	},
	//  ------------------- large ------------------//
	l: {
		parallax: {
			pages: 5.0,
		},
		firstPage: {
			offset: 0.7,
			speed: 0,
			factor: 1.1,
		},
		secondPage: {
			offset: 1.6,
			speed: 0,
			factor: 1,
		},
		thirdPage: {
			offset: 2.2,
			speed: 0,
			factor: 0.7,
		},
		fourthPage: {
			offset: 3.7,
			speed: 0,
			factor: 1,
		},
		footer: {
			offset: 4.4,
			factor: 0.6,
		},
	},
	//  -----------------extra large---------------//
	xl: {
		parallax: {
			pages: 4.7,
		},
		firstPage: {
			offset: 0.7,
			speed: 0,
			factor: 1.1,
		},
		secondPage: {
			offset: 1.6,
			speed: 0,
			factor: 1,
		},
		thirdPage: {
			offset: 2.526,
			speed: 0,
			factor: 0.5,
		},
		fourthPage: {
			offset: 3.1,
			speed: 0,
			factor: 1.4,
		},
		footer: {
			offset: 4.18,
			factor: 0.52,
		},
		//  ------------------------------------------------------------------------------------------------/
	},
};

export default ParallaxConfig;
