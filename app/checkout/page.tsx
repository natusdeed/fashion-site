import CheckoutButton from '@/components/CheckoutButton';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-black">My Fashion Store 👗</h1>
      <div className="p-6 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl mb-4 text-gray-800">Super Cool T-Shirt</h2>
        <p className="text-gray-600 mb-6">$20.00</p>
        
        {/* Here is our magic button! */}
        <CheckoutButton />
        
      </div>
    </div>
  );
}