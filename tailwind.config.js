/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				white: '#FFFFFF',
				black: '#001E2B',
				'faded-black': 'rgba(0, 30, 43, 0.75)',
				'faded-white': 'rgba(0,0,0,0.6)',
				gray: {
					dark4: '#112733',
					dark3: '#1C2D38',
					dark2: '#3D4F58',
					dark1: '#5C6C75',
					base: '#889397',
					light1: '#C1C7C6',
					light2: '#E8EDEB',
					light3: '#F9FBFA'
				},
				green: {
					dark3: '#023430',
					dark2: '#00684A',
					dark1: '#00A35C',
					base: '#00ED64',
					light1: '#71F6BA',
					light2: '#C0FAE6',
					light3: '#E3FCF7'
				},
				purple: {
					dark3: '#2D0B59',
					dark2: '#5E0C9E',
					base: '#B45AF2',
					light2: '#F1D4FD',
					light3: '#F9EBFF'
				},
				blue: {
					dark3: '#0C2657',
					dark2: '#083C90',
					dark1: '#1254B7',
					base: '#016BF8',
					light1: '#0498EC',
					light2: '#C3E7FE',
					light3: '#E1F7FF'
				},
				yellow: {
					dark3: '#4C2100',
					dark2: '#944F01',
					base: '#FFC010',
					light2: '#FFEC9E',
					light3: '#FEF7DB'
				},
				red: {
					dark3: '#5B0000',
					dark2: '#970606',
					base: '#DB3030',
					light1: '#FF6960',
					light2: '#FFCDC7',
					light3: '#FFEAE5'
				}
			},
			borderWidth: {
				1: '1px',
				3: '3px'
			}
		}, // extend the font family with MongoDB Value Serif
		fontFamily: {
			mongodb: ['MongoDB Value Serif', 'serif'],
			badge: ['Euclid Circular A']
		}
	},
	plugins: []
};
