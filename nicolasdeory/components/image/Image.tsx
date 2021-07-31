/**
 * # `<Image>`
 *
 * This component is a merge between `next/image` and `Chakra-ui`.
 * - last updated with `next/image` 11.0.1
 *   - https://github.com/vercel/next.js/blob/canary/packages/next/client/image.tsx
 *   - https://github.com/vercel/next.js/commits/canary/packages/next/client/image.tsx
 *   - https://github.com/vercel/next.js/compare/v10.2.2...canary
 *
 * Associated `gist`: <https://gist.github.com/TheThirdRace/7f270a786629f119b57d1b2227a4b113>
 *
 * ## Pros
 *
 * - Use NextJs backend solution so you get `static` or `on the fly` image optimization
 * - Offer the same optimizations as `next/image` (lazy loading, priority, async decoding, no CLS, blur placeholder, etc.)
 * - Use Chakra's theme (`variant`) so you have full control of styling
 *   - No more nightmares trying to style `next/image` wrappers
 *   - No more bloating the DOM with multiple wrappers per image
 *   - `<img>` is back to `display: inline-block` by default
 * - All icons are served automatically through the `1x` or `2x` pixel density optimization
 *   - Passing `sizesMax={0}` can force a bigger image to be served in the `1x` and `2x` mode
 * - All images are served automatically through an `srcset` auto-build function
 *   - Load configs through `NextJs` config
 *   - No more fiddling trying to build a `sizes` manually
 *   - Simply pass `sizesMax={ImageMaxWidth}` or don't pass `sizesMax` at all (defaults to highest possible value)
 * - `sizesMax` allows you to limit image width according to your design, not the viewport
 *   - No more loading a 3840px wide image on a 4K screen when your `main` section is 1200px
 * - Use semantic HTML tags unlike `next/image`
 *   - `<img>` is used for the image
 *   - `<picture>` is used for the wrapper/container (optional)
 *   - No big red warning in the console about using `<div>` in inline tags
 * - `height` & `width` are extremely recommended, but not mandatory
 * - Can use a blurry placeholder for better user experience and core vitals
 *   - Automatic when using static images (`import`)
 *   - You can manually pass a data uri for dynamic images
 *   - Low `height` and `width` images like icons won't apply the blurry placeholder as it lower performance
 * - `loader` function allow to build the final `src` url, so you can support many image providers
 * - Possible to use with a **secure** `Content-Security-Policy` header
 * - Extra performance by using `content-visibility: auto` on the `<picture>` wrapper
 *   - Not available by default on `<img>` to avoid scrolling up issues on Chrome
 *   - Could be added manually on `<img>` through styles if wanted
 * - Smaller than `next/image` solution by almost 400 lines of code
 *
 * ## Cons
 *
 * - Doesn't support Chakra's inline styling (by personal choice, could easily be added)
 * - Use native `loading=lazy`, meaning the feature isn't supported for all browsers yet
 * - Automatic blurry placeholder generation only works when your source image is a jpg, png or webp
 *   - Same restrictions as NextJs since the component use their image optimization solution
 *   - Be advised, the "source" image is not the image served to your users, it's the unoptimized image before optimization
 * - Using `<img>` without it's wrapper (`<picture>`) will give a very low CLS instead of none (ex: 0.03)
 * - Serving "responsive" images can increase data consuption, but this should be negligible because:
 *   - Images are optimized to a low size to begin with
 *   - Those most affected are users with big screens, which usually don't mind more data
 *   - Users don't resize their browser window non-stop
 *
 * ## Tips & Tricks
 *
 * ### Optimization
 *
 * - Pass `width` & `height` whenever you can, it's the biggest optimization you're gonna get out of the box
 * - Use `import` method for your images, it improves your Core Web Vitals and the user experience
 *
 * ### `<picture>` wrapper
 *
 * - Will be added automatically under these circumstances
 *   - Pass `width` & `height` props
 *   - Define a style for Image's `layPicture` part in the theme
 * - `<picture>` wrapper is mandatory to reach a cumulative layout shift (CLS) of 0
 * - You won't be penalized by Google ranking as long as you keep CLS < 0.1, which makes the wrapper "optional"
 *
 * ### `sizesMax`
 *
 * - Pass `sizesMax={0}` to force an image to be optimized with `srcset` containing `1x, 2x` variants
 *   - Mostly for icons, but you could use this for normal images too
 * - Don't pass `sizesMax` to force an image to be optimized for the current viewport width
 * - If an image is less than the full screen's width, you can pass it's max size like this `sizesMax={992}`
 */

 import { Box, chakra } from '@chakra-ui/react'
 import Head from 'next/head'
 import { ImageProps as NextImageProps } from 'next/image'
 import { Dispatch, forwardRef, ReactElement, SetStateAction, useImperativeHandle, useState } from 'react'
 import {
     defaultLoader,
     GenerateImageAttributesReturn,
     ImageProps,
     useImageAttributes,
     useImageOnLoad,
     useImageStyle
 } from '../../helper/ImageHelper'
 import { Rename } from '../../type/Typescript'
 
 /** *******************************************************************************************************************
  * Types
  */
 
 type ImageNativeProps = Partial<Pick<HTMLImageElement, 'alt'>> &
     Partial<Rename<Pick<HTMLImageElement, 'height'>, 'height', 'htmlHeight'>> &
     Partial<Rename<Pick<HTMLImageElement, 'width'>, 'width', 'htmlWidth'>> & {
         'data-set-load-state': Dispatch<SetStateAction<boolean>>
     }
 
 type ImagePriorityProps = Pick<NextImageProps, 'priority'> &
     Pick<GenerateImageAttributesReturn, 'sizes' | 'src' | 'srcset'>
 
 // TODO temporary until NextJs adjust the typings correctly for `blurDataURL` in `StaticImageData`
 type StaticImageProps = Pick<StaticImageData, 'height' | 'src' | 'width'> &
     Rename<Pick<StaticImageData, 'placeholder'>, 'placeholder', 'blurDataURL'>
 
 /** *******************************************************************************************************************
  * * Components *
  */
 
 const ImageNative = forwardRef<HTMLImageElement, ImageNativeProps>(
     ({ alt, htmlWidth, htmlHeight, 'data-set-load-state': setLoadState, ...chakraInternals }: ImageNativeProps, ref) => {
         // Handle refs to the same element
         //   1. `imgRef`      => from `useRef`      and is used to link `ref` with `callbackRef` (link between internal and external refs)
         //   2. `ref`         => from `forwardRef`  and is used to give access to the internal ref from the parent
         //   3. `callbackRef` => from `useCallback` and is used to set image loaded state even on static rendered pages
         //
         //   Inspired by
         //     - https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
         //     - https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
         const { callbackRef, imgRef } = useImageOnLoad({ setLoadState })
         useImperativeHandle<HTMLImageElement | null, HTMLImageElement | null>(ref, () => imgRef.current)
 
         return (
             // eslint-disable-next-line @next/next/no-img-element
             <img
                 alt={alt}
                 height={htmlHeight}
                 ref={callbackRef} // ? use callback ref to catch when so it updates
                 width={htmlWidth}
                 // eslint-disable-next-line react/jsx-props-no-spreading
                 {...chakraInternals}
             />
         )
     }
 )
 
 const ImagePriority = ({ priority = false, sizes, src, srcset }: ImagePriorityProps): ReactElement | null => {
     return priority ? (
         // Note how we omit the `href` attribute, as it would only be relevant
         // for browsers that do not support `imagesrcset`, and in those cases
         // it would likely cause the incorrect image to be preloaded.
         //
         // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
         <Head>
             <link
                 as='image'
                 href={srcset ? undefined : src}
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                 // @ts-ignore: imagesrcset is not yet in the link element type
                 imagesrcset={srcset}
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                 // @ts-ignore: imagesizes is not yet in the link element type
                 imagesizes={sizes}
                 key={`__nimg-${src}${srcset}${sizes}`}
                 rel='preload'
             />
         </Head>
     ) : // eslint-disable-next-line unicorn/no-null
     null
 }
 
 export const Image = ({
     alt,
     blurDataURL: paramBlurDataURL,
     height: paramHeight,
     loader = defaultLoader,
     priority = false,
     quality,
     sizesMax,
     src: paramSrc,
     title,
     variant,
     width: paramWidth,
     ...chakraInternals
 }: ImageProps): ReactElement => {
     // Manage values according to image mode: Static or Dynamic
     const { blurDataURL, height, src, width } =
         typeof paramSrc === 'string'
             ? {
                     blurDataURL: paramBlurDataURL,
                     height: paramHeight,
                     src: paramSrc,
                     width: paramWidth
               }
             : (paramSrc as StaticImageProps)
 
     // Keep trace of when the image is loaded
     const [imgLoaded, setImgLoaded] = useState(false)
 
     // Retrieve styling
     const { styles, withWrapper } = useImageStyle({ blurDataURL, height, imgLoaded, src, variant, width })
 
     // Retrieve image attributes
     const {
         src: imgSrc,
         srcset: imgSrcSet,
         sizes: imgSizes
     } = useImageAttributes({
         loader,
         quality,
         sizesMax,
         src,
         width
     })
 
     // Image component
     const img = (
         <chakra.img
             as={ImageNative}
             alt={alt}
             decoding='async'
             htmlHeight={height}
             htmlWidth={width}
             loading='lazy'
             data-set-load-state={setImgLoaded}
             // ? `src` must be the last parameter within those 3
             // ?    Safari has a bug that would download the image in `src` before `sizes` and `srcset`
             // ?    are set and then download a second image when both are set.
             // ?
             // ?    By putting `src` in last position, Safari won't initiate a download until `src` is
             // ?    updated in the DOM correctly
             sizes={imgSizes}
             srcSet={imgSrcSet}
             src={imgSrc}
             // ? --------------------------------------------------------------------------------------
             sx={styles.image}
             title={title}
             // eslint-disable-next-line react/jsx-props-no-spreading
             {...chakraInternals}
         />
     )
 
     // Add a `<picture>` wrapper if required
     const image = withWrapper ? (
         <Box as='picture' sx={styles.picture}>
             {img}
         </Box>
     ) : (
         img
     )
 
     return (
         <>
             {image}
 
             <ImagePriority sizes={imgSizes} src={imgSrc} srcset={imgSrcSet} priority={priority} />
         </>
     )
 }