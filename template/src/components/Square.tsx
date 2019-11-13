import React from "react";

interface Props {
  /**
   * Square background
   */
  background: string;
  /**
   * Square click handler
   */
  onClick?: Handler;
}

export default class Square extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    onClick: () => void 0
  };

  public render(): JSX.Element {
    return (
      <div
        style={{ width: 100, height: 100, background: this.props.background, marginLeft: 40 }}
        onClick={this.props.onClick}
        role="button"
      />
    );
  }
}
