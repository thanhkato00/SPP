import Carousel from "react-bootstrap/Carousel";

function Curesl() {
  const containerStyle = {
    margin: "2rem auto",
    padding: "1.5rem",

    backgroundImage:
      "url(https://as2.ftcdn.net/v2/jpg/01/74/04/87/1000_F_174048760_ato1qTnJZMyWn1WkPmNVcyWQUZz8WoNw.jpg)",
    backgroundRepeat: "repeat",
  };
  const imgS=["./image/anh1.png", "./image/anh2.jpg"," ./image/anh3.jpeg", "./image/anh4", "./image/anh5"]

  return (
    <div style={containerStyle}>
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block mx-auto w-80"
            src="./image/anh1.png"
            alt="First slide"
            width="575px"
            height="339px"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block mx-auto w-80"
            src="https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg"
            alt="First slide"
            width="575px"
            height="339px"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block mx-auto w-80"
            src="https://m.media-amazon.com/images/I/71E75yRwCDL._AC_UY575_.jpg"
            alt="First slide"
            width="575px"
            height="339px"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Curesl;
