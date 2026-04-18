export default function FoodCard({ food, addToCart }) {
  return (
    <div className="card">
      <img
        src={food.image}
        alt={food.name}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=Food";
        }}
      />

      <h3>{food.name}</h3>
      <p className="price">{food.price} TL</p>

      <button onClick={() => addToCart(food)}>
        Add to Cart
      </button>
    </div>
  );
}