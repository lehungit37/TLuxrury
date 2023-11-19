import { useEffect, useRef } from 'react';
import { Scrollbars as CustomScrollbars, ScrollbarProps } from 'react-custom-scrollbars-2';

interface IProps extends ScrollbarProps {
  isTable?: boolean;
}

export default function CScrollbars(props: IProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const renderThumbVertical = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    };
    return <div {...props} id="scroll-vertical-cs" style={{ ...style, ...thumbStyle }} />;
  };

  const renderThumbHorizontal = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    };

    return (
      <div
        {...props}
        id="scroll-horizontal-cs"
        ref={boxRef}
        style={{
          ...style,
          ...thumbStyle,
        }}
      />
    );
  };

  useEffect(() => {
    const childH = document.querySelector('#scroll-horizontal-cs');
    const childV = document.querySelector('#scroll-vertical-cs');
    if (childH?.parentElement) {
      childH.parentElement.style.height = '10px';
    }

    if (childV?.parentElement && !props.isTable) {
      childV.parentElement.style.width = '10px';
    }
  }, []);

  return (
    <CustomScrollbars
      {...props}
      renderThumbVertical={renderThumbVertical}
      renderThumbHorizontal={renderThumbHorizontal}
    />
  );
}
