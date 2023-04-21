import { default as NextImage } from "next/image";

type Props = {
  width: number;
  height: number;
  alt: string;
  src: string;
  [key: string]: any;
};

const Image = (props: Props) => (
  <NextImage
    {...props}
    src={
      process.env.DEPLOY === "deploy" ? `/usdc-bridge${props.src}` : props.src
    }
  />
);

export default Image;
