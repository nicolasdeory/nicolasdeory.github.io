//
// helper/Image.ts
//

import { SystemStyleObject, ThemingProps, useMultiStyleConfig } from '@chakra-ui/react'
import { ImageLoaderProps, ImageProps as NextImageProps } from 'next/image'
import { Dispatch, MutableRefObject, SetStateAction, useCallback, useMemo, useRef } from 'react'

/** *******************************************************************************************************************
 * Types
 */

export type ImageProps = Pick<NextImageProps, 'blurDataURL' | 'loader' | 'priority' | 'src'> &
	Partial<Pick<HTMLImageElement, 'alt' | 'height' | 'title' | 'width'>> &
	Pick<ThemingProps, 'variant'> & {
		quality?: number
		sizesMax?: SizesMax
	}

type GenerateCumulativeLayoutShiftFixProps = Pick<ImageProps, 'height' | 'sizesMax' | 'width'>

type GenerateImageAttributesProps = Required<Pick<ImageProps, 'loader'>> &
	Pick<ImageProps, 'quality' | 'sizesMax' | 'width'> &
	Pick<HTMLImageElement, 'src'>

export type GenerateImageAttributesReturn = Pick<HTMLImageElement, 'src'> &
	Partial<Pick<HTMLImageElement, 'sizes' | 'srcset'>>

type IsLayoutProps = Pick<ImageProps, 'sizesMax' | 'width'>

type UseImageOnLoadProps = {
	setLoadState: Dispatch<SetStateAction<boolean>>
}

/**
 * ! Makes sure `contentMaxWidthInPixel` from `page.ts` is included in `SizeMax`
 * ! Makes sure values here are in sync with `next.config.js`
 */
type SizesMax = 0 | 320 | 480 | 640 | 750 | 828 | 992 | 1080 | 1200 | 1440 | 1920 | 2048 | 2560 | 3840

type UseImageOnLoadReturn = {
	callbackRef: (img: HTMLImageElement) => void
	imgRef: MutableRefObject<HTMLImageElement | null>
}

type UseImageStyleProps = Pick<ImageProps, 'blurDataURL' | 'height' | 'sizesMax' | 'variant' | 'width'> &
	Pick<HTMLImageElement, 'src'> & {
		imgLoaded: boolean
	}

type UseImageStyleReturn = {
	styles: {
		image: SystemStyleObject
		picture: SystemStyleObject
	}
	withWrapper: boolean
}

/** *******************************************************************************************************************
 * * Image configurations *
 * https://github.com/vercel/next.js/blob/canary/packages/next/next-server/server/image-config.ts
 */

const defaultBlurDataURL =
	// 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAA3NCSVQICAjb4U/gAAAAIElEQVQYlWNUUlJiwA1Y/v37h0/6////FOgeSMMpshsAm54bX5qzRrgAAAAASUVORK5CYII=',
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNU+g8AAUkBI5mqlHIAAAAASUVORK5CYII='

const defaultQuality = 75

const imageConfigDefault = {
	deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
	imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	path: '/_next/image',
	loader: 'default',
	domains: []
}

const {
	deviceSizes: configDeviceSizes,
	imageSizes: configImageSizes,
	// loader: configLoader,
	path: configPath
	// domains: configDomains
} = (process.env.__NEXT_IMAGE_OPTS as unknown as typeof imageConfigDefault) || imageConfigDefault

const configAllSizes = [...configImageSizes, ...configDeviceSizes].sort((a, b) => a - b)

/** *******************************************************************************************************************
 * * Functions *
 */

export const defaultLoader = ({ src, width, quality = defaultQuality }: ImageLoaderProps): string => {
	return `${configPath}?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

const isLayoutFixed = ({ sizesMax, width = configDeviceSizes[configDeviceSizes.length - 1] }: IsLayoutProps): boolean =>
	sizesMax === 0 || width < configDeviceSizes[0] || configImageSizes.includes(width)

const generateCumulativeLayoutShiftFix = ({ height, sizesMax, width }: GenerateCumulativeLayoutShiftFixProps) => {
	let clsFix = {}
	if (height && width) {
		clsFix = {
			aspectRatio: `${width}/${height}`,
			...(isLayoutFixed({ sizesMax, width })
				? {
						height: `${height}px`,
						width: `${width}px`
				  }
				: {
						paddingTop: `calc(${height} / ${width} * 100%)`
				  })
		}
	}
	return clsFix
}

export const useImageAttributes = ({
	loader,
	quality,
	sizesMax,
	src,
	width = configDeviceSizes[configDeviceSizes.length - 1]
}: GenerateImageAttributesProps): GenerateImageAttributesReturn => {
	return useMemo(() => {
		let imgAttributes: GenerateImageAttributesReturn

		if (src && src.startsWith('data:')) {
			// https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
			imgAttributes = { src, srcset: undefined, sizes: undefined }
		} else if (isLayoutFixed({ sizesMax, width })) {
			const widths = [
				...new Set(
					/**
					 * This means that most OLED screens that say they are 3x resolution, are actually 3x in the green color,
					 * but only 1.5x in the red and blue colors.
					 *
					 * Showing a 3x resolution image in the app vs a 2x resolution image will be visually the same, though the
					 * 3x image takes significantly more data. Even true 3x resolution screens are wasteful as the human eye
					 * cannot see that level of detail without something like a magnifying glass.
					 *
					 * https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
					 */
					[width, width * 2].map(
						(w) => configAllSizes.find((s) => s >= w) || configAllSizes[configAllSizes.length - 1]
					)
				)
			]
			imgAttributes = {
				sizes: undefined,
				src: loader({ src, quality, width: widths[1] }),
				srcset: widths.map((w, i) => `${loader({ src, quality, width: w })} ${i + 1}x`).join(', ')
			}
		} else {
			const maxSizes = sizesMax || configDeviceSizes[configDeviceSizes.length - 1]
			const widths = [...configDeviceSizes.filter((w) => w < maxSizes), maxSizes]

			imgAttributes = {
				sizes: widths
					.map((w, i) => {
						return i < widths.length - 1 ? ` (max-width: ${w}px) ${w}px` : ` ${w}px`
					})
					.join(','),
				src: loader({ src, quality, width: widths[widths.length - 1] }),
				srcset: widths.map((w) => `${loader({ src, quality, width: w })} ${w}w`).join(', ')
			}
		}

		return imgAttributes
	}, [loader, quality, sizesMax, src, width])
}

export const useImageOnLoad = ({ setLoadState }: UseImageOnLoadProps): UseImageOnLoadReturn => {
	// Handle refs to the same element
	//   1. `imgRef`      => from `useRef`      and is used to link `ref` with `callbackRef` (link between internal and external refs)
	//   2. `ref`         => from `forwardRef`  and is used to give access to the internal ref from the parent
	//   3. `callbackRef` => from `useCallback` and is used to set image loaded state even on static rendered pages
	//
	//   Inspired by
	//     - https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
	//     - https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
	const imgRef = useRef<HTMLImageElement | null>(null)
	const callbackRef = useCallback(
		// ? Because the page could be static rendered, the image could already be loaded before React registers the image's `onload` event, meaning it would never fire
		// ?   That's why we use a `ref` handler instead, see https://stackoverflow.com/q/39777833/266535
		(img: HTMLImageElement) => {
			// Check if a node is actually passed. Otherwise node would be null.
			if (img) {
				// You can now do what you need to, addEventListeners, measure, etc.
				const handleLoad = () => {
					if (!img.src.startsWith('data:')) {
						const p = 'decode' in img ? img.decode() : Promise.resolve()
						p.catch(() => {})
							.then(() => setLoadState(true))
							.catch(() => {})
					}
				}
				if (img.complete) {
					// ? If the real image fails to load, this will still remove the blurred image
					handleLoad()
				} else {
					// eslint-disable-next-line no-param-reassign, unicorn/prefer-add-event-listener
					img.onload = handleLoad
				}
			}

			imgRef.current = img // Save a reference to the node
		},
		[setLoadState]
	)
	return {
		callbackRef,
		imgRef
	}
}

export const useImageStyle = ({
	blurDataURL = defaultBlurDataURL,
	height,
	imgLoaded,
	sizesMax,
	src,
	variant,
	width
}: UseImageStyleProps): UseImageStyleReturn => {
	//
	// Retrieve styles from theme
	const {
		layPicture: layPictureCls,
		layImage: layImageCls,
		preImage: preImageCls
	} = useMultiStyleConfig('Image', {
		variant: 'cumulativeLayoutShift'
	})
	const { preImage: preImageBlur } = useMultiStyleConfig('Image', {
		variant: 'blur'
	})
	const { layPicture, layImage, preImage } = useMultiStyleConfig('Image', { variant })

	// Do we need a wrapper?
	const withWrapperFromProps = !!(width && height)
	const withWrapperFromTheme = !!(layPicture && layPicture.constructor === Object && Object.keys(layPicture).length)

	// Do we need a blur placeholder?
	const withBlurPlaceholder = !!(
		!imgLoaded &&
		blurDataURL &&
		(!height || height > 40) &&
		(!width || width > 40) &&
		!src.startsWith('data:')
	)

	return {
		styles: {
			image: {
				// Styles for `<img>` when used with `<picture>` wrapper
				//   if wrapper is activated by theme then `variant` can override styles from wrapper
				//   if wrapper is activated by props then styles from wrapper will override `variant`
				...(withWrapperFromTheme ? { ...layImageCls, ...preImageCls } : {}),
				...layImage,
				...preImage,
				...(withWrapperFromProps ? { ...layImageCls, ...preImageCls } : {}),
				// ? Passing the data uri in a css variable wasn't working in Edge/Chrome
				// ?   Instead, I inverted the flow so the theme is passing the values
				...(withBlurPlaceholder
					? {
							...preImageBlur,
							filter: 'var(--blurFilter)',
							backgroundSize: 'var(--blurBackgroundSize)',
							backgroundImage: `url("${blurDataURL}")`
					  }
					: {})
			},
			picture: {
				...generateCumulativeLayoutShiftFix({ height, sizesMax, width }),
				// Styles for `<picture>` wrapper
				//   if wrapper is activated by theme then `variant` can override styles from wrapper
				//   if wrapper is activated by props then styles from wrapper will override `variant`
				...(withWrapperFromTheme ? layPictureCls : {}),
				...layPicture,
				...(withWrapperFromProps ? layPictureCls : {})
			}
		},
		withWrapper: withWrapperFromProps || withWrapperFromTheme
	}
}