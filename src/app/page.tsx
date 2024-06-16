
import Link from 'next/link';
import Details from './components/details';

export default function Dashboard() {
  return (
    <div>
      <h1>DASHBOARD</h1>
  
      <p>favorite addresses</p>
      <Link href="/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv" style={{ textDecoration: 'underline', color: 'orange' }}>
      1wiz...gpv    mempool api sample
</Link>
<p></p>
<Link href="/1HELPAKUTA4n4YdpYQSEK2Rhot6ZnL5P8Y" style={{ textDecoration: 'underline', color: 'orange' }}>
      1HELP...P8y    example of nmemonic 
</Link>
     <p></p>

    </div>
  )

}
