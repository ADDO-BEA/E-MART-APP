import { FaFacebook,FaTwitterSquare,FaInstagramSquare,FaLinkedin} from "react-icons/fa";
import Link from'next/link';

export default function SubscribePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center font-bold text-2xl mb-5">Subscribe</h1>
      <form style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
            Enter your email to subscribe:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="example@email.com"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: '#0070f3',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Subscribe
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h2 className="text-center text-2xl font-bold mb-5">Find Us on Social Media</h2>
        <div className='flex justify-center space-x-5'>
        <Link
             href="https://www.facebook.com">
              <FaFacebook size={25} />
            </Link>

            <Link 
             href="https://www.twiter.com"
             >
              <FaTwitterSquare size={25} />

            </Link>

            <Link href='https://www.instagram.com'>
            <FaInstagramSquare size={25} />
            </Link>
            <Link href='https://www.linkedin.com'>
            <FaLinkedin size={25}/>
            </Link>
        </div>
      </div>
    </div>
  );
}
