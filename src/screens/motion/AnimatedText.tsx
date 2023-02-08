import { m } from "framer-motion";

// Word wrapper
const Wrapper = (props: any) => {
  // We'll do this to prevent wrapping of words using CSS
  return <span style={{ whiteSpace: "nowrap" }}>{props.children}</span>;
};

// Map API "type" vaules to JSX tag names

// AnimatedCharacters
// Handles the deconstruction of each word and character to setup for the
// individual character animations
type Props = {
  text: string;
};
const AnimatedCharacters = ({ text }: Props) => {
  // Framer Motion variant object, for controlling animation
  const item = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  //  Split each word of props.text into an array
  const splitWords = text.split(" ");

  // Create storage array
  const words: any[] = [];

  // Push each word into words array
  // @ts-ignore
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }

  // Add a space ("\u00A0") to the end of each word
  words.map((word) => {
    return word.push("\u00A0");
  });

  return (
    <>
      {words.map((word, index) => {
        return (
          // Wrap each word in the Wrapper component
          <Wrapper key={index}>
            {words[index].flat().map((element: string, index: number) => {
              return (
                <span
                  style={{
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                  key={index}
                >
                  <m.span style={{ display: "inline-block" }} variants={item}>
                    {element}
                  </m.span>
                </span>
              );
            })}
          </Wrapper>
        );
      })}
      {/* {} */}
    </>
  );
};

export default AnimatedCharacters;
