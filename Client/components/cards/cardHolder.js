import Card from "./homeCard";

export default function CardHolder() {
  return (
    <>
      <div className={`cardComponentHolder bg-[#f7f7f7] transition-colors dark:bg-[#171717] `}>
        <Card imgSrc="/img/slide4.jpg"   title="Bathtubs and Showers" link="/products" filter="Carl">
        Immerse yourself in luxurious bath and shower experiences with our elegant collection of bathtubs and showers.

        </Card>
        <Card imgSrc="/img/slide5.jpg" title="Faucets and Taps" link="/products" filter="Sink Cock">
        Our faucets and taps are designed to bring the perfect balance of style and functionality to your bathroom space.
        </Card>
        <Card imgSrc="/img/nal.jpeg" title="Sinks and Basins" link="/products" filter="Angle Cock">
        Choose from an array of sinks and basins that not only offer functionality but also act as stunning focal points in your bathroom.
        </Card>
      </div>
    </>
  );
}
