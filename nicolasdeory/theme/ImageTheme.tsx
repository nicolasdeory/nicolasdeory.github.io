//
// theme/Image.ts
//

import { ComponentMultiStyleConfig } from '@chakra-ui/react'

export const Image: ComponentMultiStyleConfig = {
	parts: ['layPicture', 'layImage', 'preImage'],
	baseStyle: {
		layPicture: {},
		layImage: {
			// layout
			display: 'inline-block'
		},
		preImage: {
			// box model
			height: 'auto',
			maxWidth: 'inherit',
			width: 'auto'
			// misc
			// ! not activated because it cause jumpiness while scrolling up in Chrome
			// contentVisibility: 'auto'
			// containIntrinsicSize: 'width height' // obviously need to be adjusted
		}
	},
	variants: {
		fixed100: {
			// example of variant that activates `<picture>` wrapper through theme
			layPicture: {
				width: '100px',
				height: '100px'
			},
			layImage: {},
			preImage: {}
		},
		blur: {
			layPicture: {},
			layImage: {},
			preImage: {
				// ? Passing the data uri in a css variable wasn't working in Edge/Chrome
				// ?   Instead, I inverted the flow so the theme is passing the values
				'--blurFilter': 'blur(1.25rem)',
				'--blurBackgroundSize': 'cover'
			}
		},
		cumulativeLayoutShift: {
			layPicture: {
				// layout
				display: 'block', // necessary for firefox
				position: 'relative',
				// box model
				boxSizing: 'border-box',
				// misc
				contentVisibility: 'auto',
				overflow: 'hidden'
			},
			layImage: {
				// layout
				display: 'block', // necessary for firefox
				inset: 0,
				position: 'absolute'
			},
			preImage: {
				// box model
				maxHeight: '100%',
				maxWidth: '100%',
				minHeight: '100%',
				minWidth: '100%'
			}
		}
	},
	defaultProps: {}
}