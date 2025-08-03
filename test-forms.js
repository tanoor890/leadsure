import fetch from 'node-fetch';

async function testFormSubmissions() {
  console.log('🧪 Testing form submissions...\n');

  // Test Order Form
  console.log('📝 Testing Order Form...');
  try {
    const orderResponse = await fetch('http://localhost:5173/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'John Doe',
        email: 'john@example.com',
        whatsappNumber: '+1234567890',
        apolloFilterLink: 'https://app.apollo.io/test-order',
        numberOfLeads: 2000,
        paymentMethod: 'binance',
        totalPrice: 10
      })
    });

    if (orderResponse.ok) {
      const orderData = await orderResponse.json();
      console.log('✅ Order form submission successful:', orderData.id);
    } else {
      console.log('❌ Order form submission failed:', orderResponse.status);
    }
  } catch (error) {
    console.log('❌ Order form submission error:', error.message);
  }

  // Test Trial Form
  console.log('\n🎁 Testing Trial Form...');
  try {
    const trialResponse = await fetch('http://localhost:5173/api/trials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        whatsappNumber: '+1234567891',
        apolloFilterLink: 'https://app.apollo.io/test-trial',
        businessType: 'Digital Agency'
      })
    });

    if (trialResponse.ok) {
      const trialData = await trialResponse.json();
      console.log('✅ Trial form submission successful:', trialData.id);
    } else {
      console.log('❌ Trial form submission failed:', trialResponse.status);
    }
  } catch (error) {
    console.log('❌ Trial form submission error:', error.message);
  }

  // Check final status
  console.log('\n📊 Final Status:');
  try {
    const healthResponse = await fetch('http://localhost:5173/api/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
}

testFormSubmissions(); 