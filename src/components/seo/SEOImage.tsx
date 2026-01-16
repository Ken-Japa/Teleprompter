import React from 'react';

/**
 * SEOImage Component
 * 
 * A premium, SEO-optimized image component for PromptNinja.
 * Designed to handle images in the 'public/seo/' directory with 
 * built-in support for lazy loading, captions, and automatic 
 * .webp extension handling.
 */

interface SEOImageProps {
    /** 
     * The slug folder name in public/seo/ 
     * Example: 'melhor-teleprompter-app'
     */
    slug: string;

    /** 
     * The image filename 
     * Example: 'interface-demonstration.png'
     */
    src: string;

    /** 
     * Alternative text (Essential for SEO)
     */
    alt: string;

    /** 
     * Visible caption displayed below the image 
     */
    caption?: string;

    /** 
     * Detailed description for search engines and accessibility 
     */
    description?: string;

    /** 
     * If true, the image will load with priority (LCP optimization)
     */
    priority?: boolean;

    /** 
     * Optional custom classes for the container 
     */
    className?: string;

    /** 
     * Image width for layout stability (CLS)
     */
    width?: number;

    /** 
     * Image height for layout stability (CLS)
     */
    height?: number;

    /** 
     * Automatically converts .png/.jpg extensions to .webp in the path.
     * Set to false if you are still using original png files.
     * @default true
     */
    preferWebp?: boolean;
}

export const SEOImage: React.FC<SEOImageProps> = ({
    slug,
    src,
    alt,
    caption,
    description,
    width,
    height,
    priority = false,
    className = '',
    preferWebp = true,
}) => {
    // Process the filename to prefer .webp as planned by the user
    let finalFileName = src;
    if (preferWebp) {
        if (src.endsWith('.png')) {
            finalFileName = src.replace('.png', '.webp');
        } else if (src.endsWith('.jpg')) {
            finalFileName = src.replace('.jpg', '.webp');
        } else if (src.endsWith('.jpeg')) {
            finalFileName = src.replace('.jpeg', '.webp');
        }
    }

    const imagePath = `/seo/${slug}/${finalFileName}`;

    return (
        <figure
            className={`flex flex-col items-center my-10 group ${className}`}
            data-seo-image={slug}
        >
            {/* Image Container with Modern Aesthetics */}
            <div className="relative w-full overflow-hidden rounded-2xl glass card-depth hover-lift group-hover:card-depth-hover transition-smooth border border-white/5 bg-slate-900/50">
                <img
                    src={imagePath}
                    alt={alt}
                    width={width}
                    height={height}
                    title={caption || alt} // Good for hover tooltip and SEO
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                />

                {/* Subtle Interactive Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Visual Accent for Premium Feel */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-right from-transparent via-indigo-500/50 to-transparent" />
            </div>

            {/* Structured Caption & Description */}
            {(caption || description) && (
                <figcaption className="mt-5 px-4 text-center max-w-3xl">
                    {caption && (
                        <span className="block text-slate-100 font-semibold text-lg md:text-xl mb-2 leading-tight tracking-tight">
                            {caption}
                        </span>
                    )}
                    {description && (
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light italic opacity-80 group-hover:opacity-100 transition-opacity">
                            {description}
                        </p>
                    )}
                </figcaption>
            )}

            {/* Accessibility: hidden but present for indexing if not used as visible caption */}
            {!caption && description && (
                <div className="sr-only" aria-hidden="false">
                    {description}
                </div>
            )}
        </figure>
    );
};
