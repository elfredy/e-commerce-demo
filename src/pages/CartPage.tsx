import { useCartStor } from "../store/cartStore";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCartStor();

  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.quanitity || 1;
    return acc + item.price * quantity;
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Sepetim</h1>
      {cart.length === 0 ? (
        <p>Sepetiniz boş.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>
                  {item.quanitity} x ${item.price.toFixed(2)} = $
                  {(item.quanitity! * item.price).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Kaldır
              </button>
            </div>
          ))}
          <div className="text-right mt-6">
            <p className="text-xl font-bold">
              Toplam: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <button
            onClick={clearCart}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Sepeti Temizle
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
