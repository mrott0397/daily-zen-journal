import React, { Component } from "react";
import { Cat } from "react-kawaii";
import styled from "styled-components";
import { styler, tween, merge, action, easing } from "popmotion";

const Container = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);

  #kawaii-cat_tail {
    transform-origin: 20px 0px;
  }

  svg {
    width: 100%;
    height: auto;
  }
`;

class KawaiiAnimation extends Component {
  constructor(props) {
    super(props);

    this.catRef = React.createRef();
  }

  componentDidMount() {
    const mouth = styler(this.catRef.current.querySelector("#Combined-Shape"));
    const tongue = styler(
      this.catRef.current.querySelector("#kawaii-face__tongue")
    );
    const eyeLeft = styler(
      this.catRef.current.querySelector(
        "#kawaii-face__eyes__arc path:first-child"
      )
    );
    const eyeRight = styler(
      this.catRef.current.querySelector(
        "#kawaii-face__eyes__arc path:last-child"
      )
    );

    const tail = styler(this.catRef.current.querySelector("#kawaii-cat_tail"));

    const tailAnimation = tween({
      from: { x: 29.23, y: 153.846, rotate: 0 },
      to: { x: 29.23, y: 153.846, rotate: 20 },
      ease: easing.backInOut,
      duration: 1300,
      yoyo: Infinity
    }).start(tail.set);

    const showEye = tween({
      from: { scaleY: 0.3 },
      to: { scaleY: 1 },
      duration: 400
    });

    const show = tween({
      from: { scaleY: 0.3 },
      to: { scaleY: 1 },
      duration: 200
    });

    const blinkEye = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0.3 },
      duration: 100,
      flip: 1
    });

    const closeMouth = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0.3 },
      duration: 300,
      flip: 1
    });

    const tongueDisappear = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0 },
      duration: 300,
      flip: 1
    });

    const eyeLeftAction = action(({ complete }) => {
      showEye.start({
        update: eyeLeft.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: eyeLeft.set }), 2000);
        }
      });
    });

    const eyeRightAction = action(({ complete }) => {
      showEye.start({
        update: eyeRight.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: eyeRight.set }), 2000);
        }
      });
    });

    const mouthAction = action(({ complete }) => {
      show.start({
        update: mouth.set,
        complete: () => {
          complete();
          setInterval(() => closeMouth.start({ update: mouth.set }), 3500);
        }
      });
    });

    const tongueAction = action(({ complete }) => {
      show.start({
        update: tongue.set,
        complete: () => {
          complete();
          setInterval(
            () => tongueDisappear.start({ update: tongue.set }),
            3500
          );
        }
      });
    });

    merge(eyeLeftAction, eyeRightAction, mouthAction, tongueAction).start();
  }

  render() {
    return (
      <Container ref={this.catRef}>
        <Cat mood="blissful" />
      </Container>
    );
  }
}
export default KawaiiAnimation;
