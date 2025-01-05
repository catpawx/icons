/// <reference types="react" />
  import { ComponentType, SVGAttributes } from 'react';

  interface Props extends SVGAttributes<SVGElement> {
    color?: string;
    size?: string | number;
  }

  type Icon = ComponentType<Props>;
  export const FolderBlueMultiTone: Icon;
export const FolderOrangeMultiTone: Icon;
export const OverViewTwoTone: Icon;
export const EyeOutlined: Icon;
