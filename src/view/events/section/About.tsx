import * as React from "react";

interface IAboutSectionProps {
  about: string;
  seats: number;
  price: number;
}

const AboutSection: React.FunctionComponent<IAboutSectionProps> = (props) => {
  return (
    <div>
      <div>
        <h2>About the Event</h2>
        <p>{props.about}</p>
      </div>
      <div>
        <div>
          <h4>Seats</h4>
          <p>{props.seats}</p>
        </div>
        <div>
          <h4>Price</h4>
          <p>
            {props.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
