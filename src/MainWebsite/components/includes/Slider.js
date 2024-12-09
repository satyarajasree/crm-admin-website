import Carousel from "react-bootstrap/Carousel";
import home_img from "../Images/IMG_5189.jpg"
import second_img from "../Images/IMG_5185.jpg"
import third_img from "../Images/organic_img.png"
import fourth_img from "../Images/layout.jpeg"
import "./Slider.css";

function Slider() {
  return (
    <Carousel className="carousel">
      <Carousel.Item interval={1500}>
        <img src={fourth_img} className="d-block w-100 carousel-img" alt="image1" ></img>
        <Carousel.Caption className="text-div">
          <h3 className="caroselText">Welcome to Rajasree Townships!</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img src={second_img} className="d-block w-100 carousel-img" alt="image1"></img>
        <Carousel.Caption className="text-div">
          <h3 className="caroselText">Open Plots for your Dream Home</h3>
          <p className="p-text">
            At Rajasree Township, we specialize in offering premium land for
            resort development in some of the most picturesque and sought-after
            locations. Whether you’re looking to create a luxury resort, a
            serene mountain retreat, or an eco-friendly getaway, we provide
            carefully selected properties that are ideal for building high-end
            resorts. With a focus on prime locations and exceptional natural
            beauty, Rajasree Township helps turn your resort vision into
            reality.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img src={third_img} className="d-block w-100 carousel-img" alt="image1"></img>
        <Carousel.Caption className="text-div">
          <h3 className="caroselText">Organic Farm Lands</h3>
          <p className="p-text">
            By purchasing organic farming land, you're investing not just in
            property, but in a healthier, more sustainable future. The global
            demand for organic food is growing exponentially, making organic
            farming a profitable and rewarding venture. Organic farming methods
            can also offer a more resilient, sustainable solution to traditional
            agriculture.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img src={home_img} className="d-block w-100 carousel-img" alt="image1"></img>

        <Carousel.Caption className="text-div">
          <h3 className="caroselText">Resorts</h3>
          <p className="p-text">
            At Rajasree Townships we bring you closer to nature with stunning
            open plots and luxurious villas nestled in the heart of the
            mountains. Whether you’re seeking a serene escape, a sustainable
            living space, or an investment in natural beauty, we offer carefully
            selected properties that combine breathtaking landscapes with modern
            living
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
