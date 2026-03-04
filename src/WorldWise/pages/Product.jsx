function Product() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10rem",
        width: "70%",
        height: "100%",
        margin: "auto",
      }}
    >
      <img src="/img-1.jpg" style={{ height: "40rem", width: "40rem" }} />
      <div
        className="product__description"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <h1 style={{ fontSize: "4.8rem" }}>About WorldWide</h1>
        <p style={{ fontSize: "2rem" }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
          facilis, blanditiis deserunt natus error assumenda id neque porro
          aspernatur laudantium soluta corporis sunt nisi veritatis quo ad ea
          libero iusto.
        </p>
        <p style={{ fontSize: "2rem" }}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quisquam
          voluptatum minus dolore dolorum nihil itaque ipsa sit optio
          consequuntur.
        </p>
      </div>
    </div>
  );
}

export default Product;
