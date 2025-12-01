import Image from 'next/image';
import React from 'react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
  onMouseEnter?: React.DOMAttributes<HTMLImageElement>['onMouseEnter'];
  onMouseLeave?: React.DOMAttributes<HTMLImageElement>['onMouseLeave'];
}

export const ProductImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  onMouseEnter,
  onMouseLeave
}: Props) => {

  // Si no viene src -> placeholder
  if (!src) {
    src = '/imgs/placeholder.jpg';
  }

  // Si viene mezclado con /products/https... -> limpiar
  if (src.startsWith('/products/https')) {
    src = src.replace('/products/', '');
  }

  // Si es URL absoluta -> usarla tal cual
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );
  }

  // Caso local -> /public/products/{src}
  return (
    <Image
      src={`/products/${src}`}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  );
};
